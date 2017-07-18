// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const title = styled.h1`

`

class TagsPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">home</Link>
        <h2>tags page</h2>
      </div>
    );
  }
}

export default TagsPage;