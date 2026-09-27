import { createSessionCookie, verifyPassword } from "../_shared/auth.js";
import { json } from "../_shared/response.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
      return json(
        { error: "Cloudflare 설정에 ADMIN_PASSWORD 또는 SESSION_SECRET이 없습니다. Settings > Variables and Secrets에서 넣어주세요." },
        { status: 503 }
      );
    }
    if (!verifyPassword(body.password, env)) {
      return json({ error: "비밀번호가 다릅니다." }, { status: 401 });
    }

    return json(
      { ok: true },
      {
        headers: {
          "Set-Cookie": await createSessionCookie(env)
        }
      }
    );
  } catch {
    return json({ error: "로그인할 수 없습니다." }, { status: 400 });
  }
}
