import { appendFile, existsSync, writeFile } from "fs";
import { randomBytes } from "crypto";
import { createInterface } from "readline";

const ENV_PATH = ".env";

main();

async function main() {
  await createEnvFile();
  await setAccessSecret();
  await setDataBaseUrl();
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

async function setDataBaseUrl() {
  if (process.env.DATABASE_URL) return;
  // request to user
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter your database url: ", async (DATABASE_URL) => {
    rl.close();
    appendFile(ENV_PATH, `\nDATABASE_URL="${DATABASE_URL}"\n`, (err) =>
      console.log(err),
    );
  });
}
