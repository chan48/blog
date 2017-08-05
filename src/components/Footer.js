// @flow
import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { clearFix } from 'polished'
import styles from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
import SITE_CONFIG from '../../site-config'

const FooterWrap = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid ${styles.colors.border};
  line-height: ${styles.sizes.footerHeight};
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
`

const FooterContent = ContentWrapper.extend`
  font-family: 'Noto Sans Kr';
  font-weight: 100;
  font-size: 0.8rem;
`

const Links = styled.div`
  float: right;
  font-size: 1rem;

  & > * {
    margin-left: 0.5em;
  }
`

const CopyRight = styled.div`float: left;`

const OwnerLink = styled.a`
  color: ${styles.colors.text};
  text-decoration: underline;
`

const FooterLinks = styled.div`
  float: right;
  font-size: 1rem;

  & > * {
    margin-left: 0.5em;
  }

  i {
    color: ${styles.colors.text};
  }
`

function Footer() {
  return (
    <FooterWrap>
      <FooterContent>
        <CopyRight>
          <span>Copyright © 2016. </span>
          <OwnerLink href="https://www.github.com/rhostem">rhostem</OwnerLink>
          <span> All rights reserved</span>
        </CopyRight>
        <FooterLinks>
          <a href={SITE_CONFIG.githubUrl}>
            <i className="fa fa-github" />
          </a>
          <a href={`mailto:${SITE_CONFIG.authorEmail}`}>
            <i className="fa fa-envelope-o" />
          </a>
          <a href={`${SITE_CONFIG.siteRss}`}>
            <i className="fa fa-rss" />
          </a>
        </FooterLinks>
      </FooterContent>
    </FooterWrap>
  )
}

Footer.propTypes = {}

export default Footer
