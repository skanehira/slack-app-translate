import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { parseText } from "./util.ts";

Deno.test("parse text", () => {
  const tests = [
    {
      in: `en ja "hello world"`,
      want: {
        source: "en",
        target: "ja",
        text: `"hello world"`,
      },
    },
    {
      in: "en ja a b",
      want: {
        source: "en",
        target: "ja",
        text: "a b",
      },
    },
    {
      in: "en ja a",
      want: {
        source: "en",
        target: "ja",
        text: "a",
      },
    },
    {
      in: "en   ja          a",
      want: {
        source: "en",
        target: "ja",
        text: "a",
      },
    },
  ];

  tests.forEach((test) => {
    const got = parseText(test.in);
    assertEquals(got, test.want);
  });
});

Deno.test("parse invalid text", () => {
  const tests = [
    {
      in: `en ja"hello world"`,
      want: `invalid language: ja"hello`,
    },
    {
      in: "en jaa b",
      want: `invalid language: jaa`,
    },
    {
      in: "x ja b",
      want: `invalid language: x`,
    },
    {
      in: "a ja",
      want: `invalid text: a ja`,
    },
    {
      in: "ja en",
      want: `invalid text: ja en`,
    },
    {
      in: "ja",
      want: `invalid text: ja`,
    },
  ];

  tests.forEach((test) => {
    assertThrows(
      () => {
        parseText(test.in);
      },
      Error,
      test.want,
    );
  });
});
