import { db, State } from "astro:db";

export default async function () {
  await db.insert(State).values([{ id: 0, state: false }]);
}
