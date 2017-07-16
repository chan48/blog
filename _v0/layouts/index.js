import React from 'react';
// import Link  from 'gatsby-link';
// import { config } from 'config';
// import Navigation from '../components/Navigation.js';
// import '../css/reset.css';
// import '../css/base.css';
// import '../css/typography.css';
// import '../css/font.css';

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div>hello</div>
        {/* <Navigation /> */}
        { this.props.children() }
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
};

export default DefaultLayout;
