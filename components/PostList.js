import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import access from 'safe-access';
import styles from './PostList.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class PostList extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const pageLinks = [];

    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
    ).reverse();

    sortedPages.forEach((page, index) => {
      if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
        const title = access(page, 'data.title') || page.path;
        const description = access(page, 'data.description');
        const datePublished = access(page, 'data.date');
        const category = access(page, 'data.category');

        pageLinks.push(
          <div className='blogPost' key={index} >
            <time dateTime={moment(datePublished).format('YYYY.MM.d ')}>
              {moment(datePublished).format('YYYY.MM.DD')}
            </time>
            <span style={{ padding: '5px'} }></span>
            <span className='blog-category'>{ category }</span>
            <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
            <p dangerouslySetInnerHTML={ {    __html: description} } />
            <Link className='readmore' to={ prefixLink(page.path) }> Read
            </Link>
          </div>
        )
      }
    })

    return (
      <div>
        {pageLinks}
      </div>
    );
  }
}

export default PostList;