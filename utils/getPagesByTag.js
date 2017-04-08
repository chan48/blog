import R from 'ramda';
/**
 * gatsby에서 제공하는 pages 배열의 구조는 아래와 같다.

  const pages = [ // this.props.route.pages
    {
      data: {
        tags: 'a,b,c'
        ...
      },
      ...
    }
  ];
 */

const isNotNil = R.compose(R.not, R.isNil);
const splitByComma = (str = '') => str.split(',');
const isIncludingTag = (tag, target = '') => target.includes(tag);

export const getTagStringFromPage = R.partial(R.path, [['data', 'tags']]);

export const getTagsFromPages = (pages) => {
  const tagStrList = R.pipe(
    R.map(getTagStringFromPage),
    R.filter(isNotNil)
  )(pages);

  return R.pipe(
    R.map(splitByComma),
    R.flatten,
    R.map(R.trim),
    R.uniq, // 중복 결과 제거
  )(tagStrList);
};

export const getPagesByTag = (pages = [], tag = '') => {
  return pages.filter(page => isIncludingTag(tag, getTagStringFromPage(page)));
};

export const getPagesByTagCollection = (pages) => {
  const tags = getTagsFromPages(pages);
  const pagesByTag = tags.map(tag => Object.assign({}, {
    tag,
    pages: getPagesByTag(pages, tag),
  }));

  return pagesByTag;
};
