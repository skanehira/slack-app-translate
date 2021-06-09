import { validLanguages } from "./languages.ts";

interface Context {
  source: string;
  target: string;
  text: string;
}

export function parseText(text: string): Context {
  const splited = text.split(" ");
  if (splited.length <= 2) {
    throw new Error(`invalid text: ${text}`);
  }
  const parts = splited.filter((v) => v !== "");
  const [source, target] = parts;

  if (!validLanguages.has(source)) {
    throw new Error(`invalid language: ${source}`);
  }
  if (!validLanguages.has(target)) {
    throw new Error(`invalid language: ${target}`);
  }

  // trim languages
  // eg. en ja text => text
  const contents = parts.slice(2).join(" ");

  const ctx = {
    source: source,
    target: target,
    text: contents,
  };
  return ctx;
}
