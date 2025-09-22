export const mainSite = new sst.aws.Nextjs("MainSite", {
    path: "./packages/web-main",
    domain: $app.stage === "production"
        ? { name: "scottzockoll.com" }
        : { name: `${$app.stage}.scottzockoll.com` } });

export const aGoofeMurmurSite = new sst.aws.Nextjs("AGoofeMurmur", {
    path: "./packages/web-agoofemurmur",

    domain: $app.stage === "production"
        ? { name: "goofe.scottzockoll.com" }
        : { name: `${$app.stage}.scottzockoll.com` } });