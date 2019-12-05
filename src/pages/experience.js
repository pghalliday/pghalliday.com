import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class ExperienceIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const entries = data.entries.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {entries.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const endDate = node.frontmatter.end_date || `Present`
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 2),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {node.frontmatter.company}
                </h4>
                <small>{node.frontmatter.start_date}</small>
                <small>{` to `}</small>
                <small>{endDate}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default ExperienceIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    entries: allMarkdownRemark(
      sort: { fields: [fields___sortDate], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "experience" } } }
      limit: 1000
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            end_date(formatString: "MMMM, YYYY")
            start_date(formatString: "MMMM, YYYY")
            title
            company
            description
          }
        }
      }
    }
  }
`
