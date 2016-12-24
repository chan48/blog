import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import access from 'safe-access';
import styles from './PostList.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function createMarkup(html) { return { html }; }

class PostList extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
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
      if (access(page, 'file.ext') === 'md'
        && access(page, 'data.layout') === 'post') {
        const postData = page.data;
        const title = postData.title || page.path;
        const mainImage = postData.mainImage;
        const description = postData.description;
        const datePublished = postData.date;
        const category = postData.category;
        const postBody = postData.body;


        let desc = createMarkup(postBody).html;
        desc = desc.replace(/<(?:.|\n|("))*?>/gm, '').replace(/&quot;/g, '"').slice(0, 350);

        pageLinks.push(
          <Link
            to={prefixLink(page.path)}
            className={cx('post')}
          >
            <div key={index}>
              <time
                dateTime={moment(datePublished).format('YYYY.MM.d')}
              >{moment(datePublished).format('YYYY.MM.DD')}</time>
              <h2 className={cx('title')}>{title}</h2>
              {mainImage &&
                <div
                  className={cx('mainImage')}
                  style={{
                    backgroundImage: `url(${mainImage})`,
                  }}
                />
              }
              <div className={cx('preview')}>{desc}</div>
              <div className={cx('readMore')}>더 보기 ...</div>
            </div>
          </Link>
        );
      }
    });
              // <p dangerouslySetInnerHTML={{ __html: postBody }} />

    return (
      <div className={cx('postList')}>
        {pageLinks}
      </div>
    );
  }
}

export default PostList;
