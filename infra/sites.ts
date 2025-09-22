export const mainSite = new sst.aws.Nextjs("MainSite", {
    path: "./packages/web-main",
    domain: {
        name: "scottzockoll.com"
    }
});

// export const blogSite = new sst.aws.Nextjs("BlogSite", {
//     path: "./packages/web-blog",
//     domain: {
//         name: "blog.scottzockoll.com"
//     }
// });