import React from 'react';
import Helmet from 'react-helmet';

const BUILD_TIME = new Date().getTime();

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: React.PropTypes.string,
  },
  render() {
    const { body /* route */ } = this.props;
    const { title } = Helmet.rewind();
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          dangerouslySetInnerHTML={{
            __html: require('!raw!./public/styles.css'),
          }}
        />
      );
    }
    return (
      <html lang="ko">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="google-site-verification" content="HZS4pN5-8-N7GBYIuK0Il6fy2644h8iqxwkeTBbSFcA" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=5.0" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          {title.toComponent()}
          {css}
        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{
              __html: this.props.body,
            }}
          />
          <script src={`/bundle.js?t=${BUILD_TIME}`} />
        </body>
      </html>
    );
  },
});
