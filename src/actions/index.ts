import { defineAction } from "astro:actions";
import { db, eq, State } from "astro:db";
import { z } from "astro:schema";

const login = defineAction({
  input: z.string(),
  async handler(input, context) {
    context.cookies.set("password", input, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: import.meta.env.PROD,
    });
  },
});

const logout = defineAction({
  input: z.void(),
  async handler(_, context) {
    context.cookies.delete("password", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: import.meta.env.PROD,
    });
  },
});

const setState = defineAction({
  input: z.boolean(),
  async handler(state, context) {
    const password = context.cookies.get("password")?.value;

    if (password !== "CHANGE_ME") {
      return;
    }

    const [currentState] = await db.select().from(State).limit(1);

    const id: number | undefined = currentState?.id;

    if (typeof id === "number") {
      await db.update(State).set({ state });
    } else {
      await db.insert(State).values({ state });
    }
  },
});

export const server = { login, logout, setState };
