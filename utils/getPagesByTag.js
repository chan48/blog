import R from 'ramda';

export default function getPagesByTag (pages) {
  // const pages = [ // this.props.route.pages
  //   {
  //     data: { tags: 'a,b,c' },
  //   },
  //   {
  //     data: { tags: 'a,c' },
  //   },
  // ];
  const isNotNil = R.compose(R.not, R.isNil);
  const getTagStringFromPage = R.partial(R.path, [['data', 'tags']]);

  const tagStrList = R.pipe(
    R.map(getTagStringFromPage),
    R.filter(isNotNil)
  )(pages);

  const splitByComma = (str = '') => str.split(',');

  const uniqTags = R.pipe(
    R.map(splitByComma),
    R.flatten,
    R.map(R.trim),
    R.uniq
  )(tagStrList);

  // 태그별 페이지 가져오기
  const isIncludingTag = (tag, target = '') => target.includes(tag);
  const pagesByTag = uniqTags.map(tag => Object.assign({}, {
    tag,
    pages: pages.filter(page => isIncludingTag(tag, getTagStringFromPage(page))),
  }));

  // console.log(`pagesByTag`, pagesByTag);
  return pagesByTag;
}
