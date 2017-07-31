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
  float: right;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

const Menu = styled.li`
  line-height: ${styles.sizes.topNavHeight};
  font-size: 1rem;
  font-weight: 100;
  margin-bottom: 0;
  color: #fff;
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
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
            <Link to={'/tags'}>
              <Menu>TAG</Menu>
            </Link>
          </MenuWrap>
        </ContentWrapper>
      </TopNav>
    )
  }
}

NavBar.propTypes = {}

export default NavBar
