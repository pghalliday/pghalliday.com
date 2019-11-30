const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { forEach } = require(`lodash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        blogPosts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { sourceInstanceName: { eq: "blog" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        experienceEntries: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { sourceInstanceName: { eq: "experience" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        portfolioItems: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        services: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { sourceInstanceName: { eq: "services" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const sections = {
    blogPosts: {
      template: path.resolve(`./src/templates/blog-post.js`),
    },
    experienceEntries: {
      template: path.resolve(`./src/templates/experience-entry.js`),
    },
    portfolioItems: {
      template: path.resolve(`./src/templates/portfolio-item.js`),
    },
    services: {
      template: path.resolve(`./src/templates/service.js`),
    },
  }

  forEach(sections, (params, name) => {
    const pages = result.data[name].edges
    pages.forEach((page, index) => {
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node

      createPage({
        path: page.node.fields.slug,
        component: params.template,
        context: {
          slug: page.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent)
    const sourceInstanceName = parent.sourceInstanceName
    const relativePath = createFilePath({ node, getNode })
    createNodeField({
      name: `sourceInstanceName`,
      node,
      value: sourceInstanceName,
    })
    createNodeField({
      name: `slug`,
      node,
      value: `/${sourceInstanceName}${relativePath}`,
    })
  }
}
