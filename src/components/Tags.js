import React, { PropTypes } from 'react';
import styles from './Tags.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Tags({ tags }) {
  return (
    <div className={cx('wrapper')}>
      {tags.map((tag, i) => <span key={i} className={cx('tag')}>{tag.trim()}</span>)}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};

export default Tags;
