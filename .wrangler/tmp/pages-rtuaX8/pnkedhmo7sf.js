// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/",
    "/_astro/*",
    "/.assetsignore",
    "/favicon.ico",
    "/favicon.svg",
    "/api/*",
    "/blog/*",
    "/contact",
    "/tools/*"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/moohwaan/WiseAdvisor/.wrangler/tmp/pages-rtuaX8/bundledWorker-0.3244554661176694.mjs";
import { isRoutingRuleMatch } from "/Users/moohwaan/WiseAdvisor/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/moohwaan/WiseAdvisor/.wrangler/tmp/pages-rtuaX8/bundledWorker-0.3244554661176694.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=pnkedhmo7sf.js.map
