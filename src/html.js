import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { TypographyStyle } from 'react-typography';
import typography from './utils/typography';
import { normalize } from 'polished';

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
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=3.0" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          {/* <link
            rel="preload"
            href={`/static/spectral-latin-400.bc2de9de.woff2`}
            as="font"
            crossOrigin
          />
          <link
            rel="preload"
            href={`/static/spectral-latin-800.53eca5bf.woff2`}
            as="font"
            crossOrigin
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-400italic.b0c97eb5.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-700.601f0e2d.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-700italic.64a7de98.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/space-mono-latin-400.a8338881.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/space-mono-latin-700.eadcd2d5.woff2`}
          /> */}
          {title.toComponent()}
          {this.props.headComponents}
          <style>${normalize().toString()}</style>
          <TypographyStyle typography={typography} />
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
