import { readFileSync } from "node:fs";
import { parseBusinessValues } from "../src/data/business-values.ts";

const raw = JSON.parse(readFileSync("src/content/business.json", "utf8"));
parseBusinessValues(raw);
