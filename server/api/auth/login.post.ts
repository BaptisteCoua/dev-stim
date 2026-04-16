import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, message: "Champs manquants" });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || user.password !== password) {
    throw createError({
      statusCode: 401,
      message: "Email ou mot de passe incorrect",
    });
  }
  await setUserSession(event, { user: { id: user.id, email: user.email } });

  return { ok: true };
});
