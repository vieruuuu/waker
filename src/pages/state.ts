import { db, State } from "astro:db";

export async function GET() {
  const [state] = await db.select().from(State).limit(1);
  const currentState = !!state?.state;

  return new Response(currentState.toString());
}
