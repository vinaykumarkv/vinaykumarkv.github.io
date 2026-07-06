const { cp, rm } = require("fs/promises");
const path = require("path");

(async () => {
  const src = path.resolve(process.cwd(), ".next/output/export");
  const dest = path.resolve(process.cwd(), "out");

  await rm(dest, { recursive: true, force: true });
  await cp(src, dest, { recursive: true });
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
