import React, { Component } from 'react';
import Link from 'gatsby-link';

class Index extends Component {
  render() {
    return (
      <div>
        <h1>hello</h1>
        <Link to="/tags-page/">tags-page</Link>
      </div>
    );
  }
}

export default Index;