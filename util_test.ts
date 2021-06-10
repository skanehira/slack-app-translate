import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { parseText } from "./util.ts";

{
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
    {
      in: `en ja hello
world`,
      want: {
        source: "en",
        target: "ja",
        text: "hello\nworld",
      },
    },
    {
      in: `en ja 
hello
world
`,
      want: {
        source: "en",
        target: "ja",
        text: "\nhello\nworld\n",
      },
    },
  ];

  tests.forEach((test) => {
    Deno.test(`parse text: ${test.in}`, () => {
      const got = parseText(test.in);
      assertEquals(got, test.want);
    });
  });
}

{
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
    Deno.test(`parse invalid text: ${test.in}`, () => {
      assertThrows(
        () => {
          parseText(test.in);
        },
        Error,
        test.want,
      );
    });
  });
}
