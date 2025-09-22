export const mainSite = new sst.aws.Nextjs("MainSite", {
    path: "./packages/web-main",
    domain: {
        name: "scottzockoll.com"
    }
});

export const aGoofeMurmurSite = new sst.aws.Nextjs("AGoofeMurmur", {
    path: "./packages/web-agoofemurmur",
    domain: {
        name: "goofe.scottzockoll.com"
    }
});