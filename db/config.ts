import { column, defineDb, defineTable } from "astro:db";

const State = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    state: column.boolean({ default: false }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { State },
});
