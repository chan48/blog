import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import Navigation from '../components/Navigation.js';
import '../static/css/reset.css';
import '../static/css/base.css';
import '../static/css/typography.css';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.onScroll);
  // }

  // onScroll(e) {
  //   clearTimeout(this.scrollTimeout);
  //   this.scrollTimeout = setTimeout(() => {
  //     console.log(e);
  //   }, 300);
  //   console.log(e.target);
  // }


  render() {
    const { location, children } = this.props;

    return (
      <div className="wrapper">
        <Navigation />
        { children }
      </div>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
};

export default Template;
