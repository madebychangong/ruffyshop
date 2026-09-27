import { verifySession } from "../_shared/auth.js";
import { json } from "../_shared/response.js";

const PRICE_KEY = "wooki:price-text:v1";

export async function onRequestGet({ env }) {
  const kv = getKV(env);
  if (!kv) return json({ text: "" });
  return json(readRecord((await kv.get(PRICE_KEY)) || ""));
}

export async function onRequestPut({ request, env }) {
  if (!(await verifySession(request, env))) {
    return json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const kv = getKV(env);
  if (!kv) {
    return json({ error: "저장할 수 없습니다." }, { status: 503 });
  }

  const current = readRecord((await kv.get(PRICE_KEY)) || "");
  const body = await request.json();
  const text = String(body.text ?? current.text ?? "").slice(0, 100_000);
  const settings = sanitizeSettings({
    ...(current.settings || {}),
    ...(body.settings || {})
  });
  const record = { text, settings, updatedAt: new Date().toISOString() };
  await kv.put(PRICE_KEY, JSON.stringify(record));
  return json({ ok: true, text, settings });
}

function getKV(env) {
  return env.WOOKI_KV;
}

function readRecord(value) {
  if (!value) return { text: "", settings: {} };

  try {
    const data = JSON.parse(value);
    if (data && typeof data === "object") {
      return {
        text: String(data.text || ""),
        settings: sanitizeSettings(data.settings || {})
      };
    }
  } catch {}

  return { text: String(value), settings: {} };
}

function sanitizeSettings(settings) {
  const source = settings && typeof settings === "object" ? settings : {};
  return {
    kakaoOneUrl: String(source.kakaoOneUrl || "").slice(0, 500)
  };
}
