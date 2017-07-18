import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Html extends Component {
  render() {
    const { body } = this.props;
    const { title } = Helmet.rewind();
    let css;

    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          dangerouslySetInnerHTML={{
            __html: require('!raw!../public/styles.css'),
          }}
        />
      );
    }

    return (
      <html lang="ko">
        <head>
          {this.props.headComponents}
          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=3.0" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          {title.toComponent()}
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
};

module.exports = Html;
