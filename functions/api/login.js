import { createSessionCookie, verifyPassword } from "../_shared/auth.js";
import { json } from "../_shared/response.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    // 설정이 없든 비밀번호가 틀리든 손님에게는 똑같이 보입니다(내부 사정 노출 방지).
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET || !verifyPassword(body.password, env)) {
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
