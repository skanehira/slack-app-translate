import { serve } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { parseText } from "./util.ts";

const endpoint =
  "https://script.google.com/macros/s/AKfycbywwDmlmQrNPYoxL90NCZYjoEzuzRcnRuUmFCPzEqG7VdWBAhU/exec";

serve({
  "/": async (request) => {
    const form = await request.formData();
    const text = form.get("text") as string;
    if (!text) {
      const resp = {
        "response_type": "in_channel",
        "text": "text is empty",
      };
      return new Response(JSON.stringify(resp));
    }
    const ctx = parseText(text);
    const resp = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(ctx),
    });

    const body = {
      "response_type": "in_channel",
      "attachments": [
        {
          "color": "#36a64f",
          "pretext": ctx.text,
          "text": await resp.text(),
        },
      ],
    };
    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
