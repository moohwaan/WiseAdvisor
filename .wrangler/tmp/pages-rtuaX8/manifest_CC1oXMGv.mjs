globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as decodeKey } from './chunks/astro/server_BDVh_CNw.mjs';
import './chunks/astro-designed-error-pages_Batk3dsn.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_ClnpwfT4.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/moohwaan/WiseAdvisor/","cacheDir":"file:///Users/moohwaan/WiseAdvisor/node_modules/.astro/","outDir":"file:///Users/moohwaan/WiseAdvisor/dist/","srcDir":"file:///Users/moohwaan/WiseAdvisor/src/","publicDir":"file:///Users/moohwaan/WiseAdvisor/public/","buildClientDir":"file:///Users/moohwaan/WiseAdvisor/dist/","buildServerDir":"file:///Users/moohwaan/WiseAdvisor/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"api/leads","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/leads","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/leads\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"leads","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/leads.ts","pathname":"/api/leads","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/bmi-calculator/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/bmi-calculator","isIndex":false,"type":"page","pattern":"^\\/tools\\/bmi-calculator\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"bmi-calculator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/bmi-calculator.astro","pathname":"/tools/bmi-calculator","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/moohwaan/WiseAdvisor/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/moohwaan/WiseAdvisor/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/moohwaan/WiseAdvisor/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/moohwaan/WiseAdvisor/src/pages/tools/bmi-calculator.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/leads@_@ts":"pages/api/leads.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/tools/bmi-calculator@_@astro":"pages/tools/bmi-calculator.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CC1oXMGv.mjs","/Users/moohwaan/WiseAdvisor/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/moohwaan/WiseAdvisor/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"chunks/stegaEncodeSourceMap_DKADhzSk.mjs","/Users/moohwaan/WiseAdvisor/src/components/react/LeadForm.tsx":"_astro/LeadForm.Bonh85kx.js","/Users/moohwaan/WiseAdvisor/src/components/react/BMICalculator.tsx":"_astro/BMICalculator.BzWVZQSD.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.BsEOY7sx.css","/favicon.ico","/favicon.svg","/_astro/BMICalculator.BzWVZQSD.js","/_astro/LeadForm.Bonh85kx.js","/_astro/client.Dc9Vh3na.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_astro/_slug_.BsEOY7sx.css","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/contact.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/chunks/Layout_DNnwL4VR.mjs","/_worker.js/chunks/_@astro-renderers_CJuVsx7W.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_lWHsaJZU.mjs","/_worker.js/chunks/astro-designed-error-pages_Batk3dsn.mjs","/_worker.js/chunks/astro_auiv5BRq.mjs","/_worker.js/chunks/browser_CFJiM1-Z.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/index_DT_ty-mV.mjs","/_worker.js/chunks/jsx-runtime_DoH26EBh.mjs","/_worker.js/chunks/noop-middleware_ClnpwfT4.mjs","/_worker.js/chunks/sanity_L4Nvfxcm.mjs","/_worker.js/chunks/stegaEncodeSourceMap_DKADhzSk.mjs","/_worker.js/pages/api/leads.astro.mjs","/_worker.js/pages/blog/_slug_.astro.mjs","/_worker.js/pages/tools/bmi-calculator.astro.mjs","/_worker.js/chunks/astro/server_BDVh_CNw.mjs","/api/leads","/blog/index.html","/contact/index.html","/tools/bmi-calculator/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"Arj5F6+SRgaiCLpo6LZlHVEvq+IgfeAfFGCMDpvsnao=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
