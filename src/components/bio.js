/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa"

const SocialLink = ({ Icon, href }) => (
  <a 
    href={href}
    css={css`
      box-shadow: none;
    `}
  >
    <Icon />
  </a>
)

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          location
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const { author, location, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author}</strong> who lives and works in {location} building useful things.
        <br />
        <SocialLink Icon={FaTwitter} href={`https://twitter.com/${social.twitter}`} />
        {` `}
        <SocialLink Icon={FaGithub} href={`https://github.com/${social.github}`} />
        {` `}
        <SocialLink Icon={FaLinkedin} href={`https://linkedin.com/in/${social.linkedin}`} />
      </p>
    </div>
  )
}

export default Bio
