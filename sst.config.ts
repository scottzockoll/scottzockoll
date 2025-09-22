/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "scottzockoll",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    await import("./infra/api");
    const sites = await import("./infra/sites");

    return {
      MyBucket: storage.bucket.name,
      MainSite: sites.mainSite.url,
    };
  },
});
