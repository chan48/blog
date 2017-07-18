import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: red;
`;


class Index extends Component {
  render() {
    return (
      <div>
        <Title>hello</Title>
        <Link to="/tags-page/">tags-page</Link>
      </div>
    );
  }
}

export default Index;