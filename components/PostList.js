import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import access from 'safe-access';
import { getPagesByTag } from '../utils/getPagesByTag';
import Tags from './Tags';
import styles from './PostList.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class PostList extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    console.log(`getPagesByTag(this.props.route.pages)`, getPagesByTag(this.props.route.pages));
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
        const tags = postData.tags && postData.tags.toString().split(',');
        const desc = postBody
          .replace(/<(?:.|\n|("))*?>/gm, '')
          .replace(/&quot;/g, '"')
          .slice(0, 350);

        pageLinks.push(
          <div
            key={index}
            className={cx('post')}
          >
            <Link to={page.path}>
              {mainImage &&
                <img
                  data-layout="responsive"
                  className={cx('mainImage')}
                  src={mainImage}
                  alt={`${title}: 메인이미지`}
                />
              }
              <h2 className={cx('title')}>{title}</h2>
              <div className={cx('preview')}>{desc}</div>
            </Link>
            {!tags &&
              <div className={cx('tagWrapper')}>
                <Tags tags={tags} />
              </div>
            }
            <div className={cx('postFooter')}>
              <time
                dateTime={moment(datePublished).format('YYYY.MM.d')}
              >{moment(datePublished).format('YYYY년 MM월 DD일')}</time>
              <Link to={page.path}>
                <div className={cx('readMore')}>더 보기</div>
              </Link>
            </div>
          </div>
        );
      }
    });
              // <p dangerouslySetInnerHTML={{ __html: postBody }} />
                // {tags.map((tag) => <span className={cx('tag')}>{tag.trim()}</span>)}

    return (
      <div className={cx('postList')}>
        {pageLinks}
      </div>
    );
  }
}

export default PostList;
