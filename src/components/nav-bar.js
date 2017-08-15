// @flow
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { clearFix } from 'polished'
import styles from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
import { rhythm } from '../utils/typography'

const TopNav = styled.nav`
  ${clearFix()} position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #4568dc, #b06ab3);
  border-bottom: 1px solid ${styles.colors.border};
`

const SiteTitle = styled.div`
  float: left;
  margin: 0;
  color: #fff;
  font-weight: 100;
  font-size: 1.2rem;
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
  line-height: ${styles.sizes.topNavHeight};
  letter-spacing: -1px;
`

const MenuWrap = styled.ul`
  ${clearFix()} float: right;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

const Menu = styled(Link)`
  float: left;
  line-height: ${styles.sizes.topNavHeight};
  margin-bottom: 0;
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
  font-size: 1rem;
  font-weight: 100;
  color: #fff;

  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`

class NavBar extends React.Component {
  render() {
    return (
      <TopNav>
        <ContentWrapper>
          <Link to={'/'}>
            <SiteTitle>rhostem.github.io</SiteTitle>
          </Link>
          <MenuWrap>
            <Menu to={'/tags'}>TAG</Menu>
            <Menu to={'/archive'}>ARCHIVE</Menu>
          </MenuWrap>
        </ContentWrapper>
      </TopNav>
    )
  }
}

NavBar.propTypes = {}

export default NavBar
