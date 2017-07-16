import React from 'react';
// import Link  from 'gatsby-link';
// import { config } from 'config';
import Navigation from '../components/Navigation.js';
import '../css/reset.css';
import '../css/base.css';
import '../css/typography.css';
import '../css/font.css';

class Template extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.onScroll = this.onScroll.bind(this);
  // }

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
