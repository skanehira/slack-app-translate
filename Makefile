.PONY: run
run:
	@deployctl run --libs=ns,fetchevent  --addr=":9999" mod.ts

coverage:
	@deno test --allow-all --unstable --no-check --coverage=cov
	@deno coverage cov
	@rm -rf cov
