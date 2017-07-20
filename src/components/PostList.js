// @flow
import React, { Component, PropTypes } from 'react';
import { sortBy } from 'lodash';
import Link from 'gatsby-link';
import moment from 'moment';
import access from 'safe-access';
// import { getPagesByTag } from '../utils/getPagesByTag';
// import Tags from './Tags';
import styles from './PostList.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class PostList extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

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
        // const description = postData.description;
        const datePublished = postData.date;
        // const category = postData.category;
        const postBody = postData.body;
        // const tags = postData.tags && postData.tags.toString().split(',');
        const desc = postBody
          .replace(/<(?:.|\n|("))*?>/gm, '')
          .replace(/&quot;/g, '"')
          .slice(0, 350);

        pageLinks.push(
          <Link
            to={page.path}
            className={cx('post')}
            key={index}
          >
              {mainImage &&
                <div
                  data-layout="responsive"
                  className={cx('mainImage')}
                  style={{
                    backgroundImage: `url(${mainImage})`
                  }}
                  // src={mainImage}
                  // alt={`${title}: 메인이미지`}
                />
              }
            <div className={cx('postInfo')}>
              <h2 className={cx('title')}>{title}</h2>
              <time className={cx('time')}
                dateTime={moment(datePublished).format('YYYY.MM.d')}
              >{moment(datePublished).format('YYYY년 MM월 DD일')}</time>
            </div>
          </Link>
        );
      }
    });
              // <div
                // className={cx('preview')}
                // dangerouslySetInnerHTML={{ __html: desc }}
              // />
              // {
              //   tags &&
              //   <div className={cx('tagWrapper')}>
              //     <Tags tags={tags} />
              //   </div>
              // }
              // <div className={cx('postFooter')}>
              // </div>

    return (
      <div className={cx('postList')}>
        {pageLinks}
      </div>
    );
  }
}

export default PostList;
