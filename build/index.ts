import { existsSync, writeFile } from "fs";

const ENV_PATH = ".env";

main();

async function main() {
  await createEnvFile();
}

async function createEnvFile() {
  if (existsSync(ENV_PATH)) return;
  writeFile(ENV_PATH, "", (err) => console.log(err));
}

