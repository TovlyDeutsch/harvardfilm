import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-scroll";
import "./home.css";
import MenuTemplate from "./MenuTemplate";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../SiteConfig";
import Drawer from "../layouts/Drawer/Drawer";
import Navigation from "../components/Navigation/Navigation";
import About from "../components/About/About";
import WhatWeDo from "../components/WhatWeDo/WhatWeDo";
import Sponsors from "../components/Sponsors/Sponsors";
import SiteWrapper from "../layouts/SiteWrapper/SiteWrapper";
import Footer from "../components/Footer/Footer";
import AuthorModel from "../models/author-model";
import MainHeader from "../layouts/MainHeader/MainHeader";
import MainNav from "../layouts/MainNav/MainNav";
import BlogLogo from "../components/BlogLogo/BlogLogo";
import MenuButton from "../components/MenuButton/MenuButton";
import CenterImage from "../components/CenterImage/CenterImage";
import PageDescription from "../components/PageDescription/PageDescription";
import SocialMediaIcons from "../components/SocialMediaIcons/SocialMediaIcons";
import CastGrid from "../components/CastGrid/CastGrid";

class IndexTemplate extends MenuTemplate {
  render() {
    const { nodes } = this.props.pathContext;
    console.log("nodes", nodes);
    const authorsEdges = this.props.data.authors.edges;
    const authorPics = {};
    const thumbnails = {};
    this.props.data.authorPics.edges.forEach(
      edge =>
        (authorPics[edge.node.name] = edge.node.childImageSharp.resize.src)
    );
    if (this.props.data.filmPics) {
      this.props.data.filmPics.edges.forEach(
        edge =>
          (thumbnails[edge.node.name] = edge.node.childImageSharp.resize.src)
      );
    }
    console.log(authorPics);
    const credits = authorsEdges.map(authorEdge => {
      const authorData = AuthorModel.getAuthor(
        authorsEdges,
        authorEdge.node.id
      );
      return {
        authorData: authorData,
        postData: { role: authorData.roles },
        imageUrl: authorPics[authorEdge.node.id]
      };
    });

    return (
      <Drawer className="home-template" isOpen={this.state.menuOpen}>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={nodes} />

        {/* The blog navigation links */}
        <Navigation config={config} onClose={this.handleOnClose} />

        <SiteWrapper>
          {/* All the main content gets inserted here */}
          <div className="home-template">
            {/* The big featured header */}
            <MainHeader cover={config.siteCover} color="#8a292e">
              <MainNav overlay={config.siteCover}>
                <BlogLogo logo={config.siteLogo} title={config.siteTitle} />
                <MenuButton
                  navigation={config.siteNavigation}
                  onClick={this.handleOnClick}
                />
              </MainNav>
              <div className="vertical" style={{ display: "block" }}>
                <div className="main-header-content inner">
                  <CenterImage src="img/hufa-logo.svg" />
                  <PageDescription text={config.siteDescription} />
                  <SocialMediaIcons
                    urls={config.siteSocialUrls}
                    color="currentColor"
                  />
                </div>
              </div>
              <Link
                className="scroll-down icon-arrow-left"
                to="content"
                data-offset="-45"
                spy
                smooth
                duration={500}
              >
                <span className="hidden">Scroll Down</span>
              </Link>
            </MainHeader>
            <h1 className="announcements" style={{ textAlign: "center" }}>
              Announcements
            </h1>
            <p
              className="announcements-description"
              style={{ textAlign: "center" }}
            >
              Our first introductory meeting is this Sunday 9/9 at 3:30 in Sever
              102! If you can't attend, sign up for our email list here:
              https://lists.hcs.harvard.edu/mailman/listinfo/hufa-list. Keep an
              eye out for a questionnaire about your interest in the club.
            </p>
            <About />
            <hr />
            <WhatWeDo />
            <hr />
            <Sponsors />
            <hr />
            <h2 className="home-header our-films">Our Films</h2>
            <PostListing
              thumbnails={thumbnails}
              postEdges={nodes}
              postAuthors={authorsEdges}
              limit={3}
            />
            {credits.length > 0 && <hr />}
            {credits.length > 0 && (
              <h2 className="home-header our-films">Members</h2>
            )}
            {credits.length > 0 && <CastGrid cast={credits} headerless />}
          </div>

          {/* The tiny footer at the very bottom */}
          <Footer copyright={config.copyright} />
        </SiteWrapper>
      </Drawer>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    # posts data comes from the context
    # authors
    authors: allAuthorsJson {
      edges {
        node {
          id
          name
          roles
          image
          url
          bio
          fields {
            path
          }
        }
      }
    }
    authorPics: allFile(
      filter: { absolutePath: { regex: "/(profile-pics)/" } }
    ) {
      edges {
        node {
          name
          publicURL
          childImageSharp {
            resize(width: 432, height: 540) {
              src
            }
          }
        }
      }
    }
    filmPics: allFile(filter: { absolutePath: { regex: "/(thumbnails)/" } }) {
      edges {
        node {
          name
          publicURL
          childImageSharp {
            resize(width: 900, height: 250, cropFocus: ENTROPY) {
              src
            }
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
