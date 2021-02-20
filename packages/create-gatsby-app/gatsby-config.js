module.exports = {
    siteMetadata: {
        title: "My Gatsby Site",
    },
    plugins: [
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/pages`,
            },
        },
        "gatsby-plugin-emotion",
    ]
    // plugins: [
    //     "gatsby-plugin-emotion",
    //   "gatsby-plugin-sharp",
    //   "gatsby-plugin-react-helmet",
    //   "gatsby-plugin-offline",
    //   {
    //     resolve: "gatsby-plugin-manifest",
    //     options: {
    //       icon: "src/images/icon.png",
    //     },
    //   },
    //   "gatsby-transformer-sharp",
    //   {
    //     resolve: "gatsby-source-filesystem",
    //     options: {
    //       name: "images",
    //       path: "./src/images/",
    //     },
    //     __key: "images",
    //   },
    // ],
};
