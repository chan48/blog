module.exports = {
  siteMetadata: {
    title: 'rhostem.github.io',
    author: 'rhostem(syoung.j@gmail.com)',
    description: '프론트엔드 개발 기술 블로그입니다. 정적 사이트 생성기(static site generator) gatsby를 기반으로 만들어졌습니다.',
    githubUrl: 'https://github.com/rhostem/blog',
    url: 'https://rhostem.github.io',
    emailUrl: 'syoung.j@gmail.com',
    rssUrl: '#',
    twitterUrl: '#',
  },
  pathPrefix: '/',
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
              maxWidth: 740,
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
  ],
}
