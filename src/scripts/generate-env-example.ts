import fs from "fs";
import dontenv from "dotenv";

const env = dontenv.parse(fs.readFileSync(".env"));

const example = Object.keys(env)
  .map((key) => `${key}`)
  .join("\n");

fs.writeFileSync(".env.example", example);
