const SITE_CONFIG = require('./site-config');

const getPathPrefix = (path) => {
  return path === '/' ? '' : path;
}

module.exports = {
  pathPrefix: SITE_CONFIG.pathPrefix,
  siteMetadata: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    author: SITE_CONFIG.author,
    githubUrl: 'https://github.com/rhostem/blog',
    url: `${SITE_CONFIG.siteUrl}${getPathPrefix(SITE_CONFIG.pathPrefix)}`,
    emailUrl: 'syoung.j@gmail.com',
    siteUrl: `${SITE_CONFIG.siteUrl}${getPathPrefix(SITE_CONFIG.pathPrefix)}`, // sitemap plugin
    googleAnalyticsID: SITE_CONFIG.googleAnalyticsID,
    rssMetadata: {
      site_url: `${SITE_CONFIG.siteUrl}${getPathPrefix(SITE_CONFIG.pathPrefix)}`,
      feed_url: `${SITE_CONFIG.siteUrl}${getPathPrefix(SITE_CONFIG.pathPrefix)}${SITE_CONFIG.siteRss}`,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      image_url: `${SITE_CONFIG.siteUrl}${getPathPrefix(SITE_CONFIG.pathPrefix)}/logos/logo-512.png`,
      author: SITE_CONFIG.author,
      copyright: SITE_CONFIG.copyright
    },
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-glamor`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: SITE_CONFIG.googleAnalyticsID
      }
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_CONFIG.title,
        short_name: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        start_url: SITE_CONFIG.pathPrefix,
        background_color: "#f7f7f7",
        theme_color: "#4568dc",
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/logo-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
        ]
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#4568dc`,
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "rhostem.github.io";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }));
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter {
                      title
                      date
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: SITE_CONFIG.siteRss
          }
        ]
      }
    }
  ],
}
