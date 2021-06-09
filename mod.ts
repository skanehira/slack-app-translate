import { serve } from "https://deno.land/x/sift@0.1.6/mod.ts";

serve({
  "/": (req) => {
    console.log(req);
    return new Response("ウホ", {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
  404: () =>
    new Response("ウホウホ", {
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
});
