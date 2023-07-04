import { appendFile, existsSync, writeFile } from "fs";
import { randomBytes } from "crypto";

const ENV_PATH = ".env";

main();

async function main() {
  await createEnvFile();
  await setAccessSecret();
}

async function createEnvFile() {
  if (existsSync(ENV_PATH)) return;
  writeFile(ENV_PATH, "", (err) => console.log(err));
}

async function setAccessSecret() {
  if (process.env.ACCESS_SECRET) return;
  const ACCESS_SECRET = randomBytes(64).toString("hex");
  appendFile(ENV_PATH, `\nACCESS_SECRET="${ACCESS_SECRET}"\n`, (err) =>
    console.log(err),
  );
}

