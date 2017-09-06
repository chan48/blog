const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const webpackLodashPlugin = require(`lodash-webpack-plugin`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/post-page.js`)
    const tagPagesTemplate = path.resolve(`src/templates/tag-page.js`)

    graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000,
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                title
                date
                mainImage
                description
              }
            }
          }
        }
        site {
          siteMetadata {
            title
            url
            author
          }
        }
      }
    `
      ).then(result => {
      if (result.errors) {
        console.log(result.errors)
      }

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug, // required
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.fields.slug,
            highlight: edge.node.frontmatter.highlight,
            shadow: edge.node.frontmatter.shadow,
          },
        })
      })

      // Create tag pages.
      let tags = []
      result.data.allMarkdownRemark.edges.forEach(edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      tags = _.uniq(tags)
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: tagPagesTemplate,
          context: {
            tag,
          },
        })
      })

      resolve()
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const isPostsFolder = parsedFilePath.dir.indexOf('pages/posts') > -1;

    const slug = isPostsFolder ?
      `/${parsedFilePath.dir.split(`src/pages/posts/`)[1]}/`
      :
      `/${parsedFilePath.dir.split(`src/pages/`)[1]}/`

    createNodeField({
      node,
      name: `slug`,
      value: `${isPostsFolder ? '/posts' : '' }${slug}`
    })

  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)

    // 마크다운인데 slug(경로)가 지정되지 않은 node가 있다면
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.fields.slug,
    })

    // 포스트 frontmatter에 tags 배열이 있으면 slug 필드를 추가한다.
    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }
}

// Sass and Lodash.
exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case `build-javascript`:
      config.plugin(`Lodash`, webpackLodashPlugin, null)
      break
  }

  return config;
}