import * as crypto from "crypto";

export function genUnPw() {
  return [genString(), genString()];
}

export function genString() {
  return crypto.randomBytes(20).toString("hex");
}

export function genUuid() {
  return crypto.randomUUID();
}
