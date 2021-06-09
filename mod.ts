import { serve } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { parseText } from "./util.ts";

const endpoint =
  "https://script.google.com/macros/s/AKfycbywwDmlmQrNPYoxL90NCZYjoEzuzRcnRuUmFCPzEqG7VdWBAhU/exec";

interface Body {
  // deno-lint-ignore camelcase
  response_type: string;
  attachments: [{
    color?: string;
    pretext?: string;
    text?: string;
    footer?: string;
  }];
}

serve({
  "/": async (request) => {
    const body = {
      "response_type": "in_channel",
    } as Body;

    const form = await request.formData();
    const text = form.get("text") as string;
    if (!text) {
      body.attachments = [
        {
          color: "#D84646",
          text: "text is empty",
        },
      ];
      return new Response(JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    try {
      const ctx = parseText(text);
      const resp = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(ctx),
      });

      body.attachments = [
        {
          color: "#36a64f",
          pretext: ctx.text,
          text: await resp.text(),
          footer: "https://cloud.google.com/translate/docs/languages",
        },
      ];
    } catch (e) {
      body.attachments = [
        {
          color: "#D84646",
          text: e.toString(),
        },
      ];
    }

    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
