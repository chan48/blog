import { expect } from 'chai';
import {
  getTagsFromPages,
  getTagStringFromPage,
  getPagesByTag,
} from './getPagesByTag.js';

const pages = [ // this.props.route.pages
  {
    data: {
      tags: 'a,c',
    },
  },
  {
    data: {
      tags: 'a,d',
    },
  },
  {
    data: {
      tags: 'b',
    },
  },
];


describe('getTagStringFromPage 메소드 테스트', () => {
  it('page 객체에 객체에서 tags키의 값을 리턴한다.', () => {
    expect(getTagStringFromPage(pages[0])).to.equal(pages[0].data.tags);
  });
});


describe('getTagsFromPages 메소드 테스트', () => {
  it('pages 배열에서 태그 스트링을 파싱해서 중복을 제거한 태그 배열을 리턴한다.', () => {
    const tags = getTagsFromPages(pages);
    expect(tags).to.be.a('array');
    expect(tags).to.have.length.of(4);
    expect(tags).to.include('a');
    expect(tags).to.include('b');
    expect(tags).to.include('c');
    expect(tags).to.include('d');
  });
});

describe('getPagesByTag 메소드 테스트', () => {
  it('태그가 포함한 객체로 구성된 배열이 리턴되어야 한다', () => {
    let tag = 'a';
    expect(getPagesByTag(pages, tag)).to.be.a('array');
    expect(getPagesByTag(pages, tag)).to.have.length.of(2);

    tag = 'b';
    expect(getPagesByTag(pages, tag)).to.have.length.of(1);
  });
});

