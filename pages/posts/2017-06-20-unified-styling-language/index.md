---
title: "[번역] 통합 스타일링 언어"
description: ""
date: "2017-06-20"
layout: post
mainImage: "/posts/2017-06-20-unified-styling-language/main_image.png"
tags:
  - CSS
  - JavaScript
  - React
path: "/posts/2017-06-20-unified-styling-language"
---

이 글은 [CSS Modules](https://github.com/css-modules/css-modules/graphs/contributors)의 공동 개발자 Mark Dalgleish의 [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)를 번역한 글입니다.

---

최근 몇년간 리액트([React](https://facebook.github.io/react)) 커뮤니티를 중심으로 한 [CSS-in-JS](https://github.com/MicheleBertoli/css-in-js)의 성장이 있었다. 물론 이와 관련한 논쟁 없이 성장하지는 않았다. 많은 사람들, 특히 CSS에 친숙한 사람들은 불신의 눈길을 보내왔다.

> 자바스크립트 안에다 CSS를 작성하고 싶은 사람이 있기나 하겠어?
>
> CSS를 배울 수만 있다면 이건 정말 끔직한 아이디어야!

당신이 이런 반응을 가지고 있었다면 이 글을 읽어보길 바란다. 우리가 스타일을 자바스크립트 내부에서 작성하는 이유와 그것이 그렇게 끔찍한 아이디어는 아니라는 사실에 대해 살펴보려 한다. 그리고 내가 급속히 성장하고 있는 이 영역에 대해 관심을 가지고 있어야 한다고 생각하는 이유에 대해서도 알아볼 예정이다.

## 오해를 받은 커뮤니티

리액트 커뮤니티와 CSS 커뮤니티는 서로간에 종종 오해를 사곤 한다. 나는 이 점이 무척 흥미로우며 나는 저 두 영역의 중간 지점 어딘가에 위치하는 입장을 가지고 있다.

나는 90년대말에 HTML을 배우기 시작했고 테이블 기반의 레이아웃을 사용하던 암흑기부터 CSS와 함께해왔다. [CSS Zen Garden](http://www.csszengarden.com/)의 영감을 받아 기존의 코드를 [시맨틱 마크업](https://en.wikipedia.org/wiki/Semantic_HTML)과 CSS로 옮기는 일의 선두에 서 있었고 얼마 지나지 않아 [겸손한 자바스크립트](https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript)를 이용해 서버 렌더링된 마크업을 클라이언트 사이드에서 유저 상호작용을 추가하는 '관심사의 분리'에 사로잡히게 되었다. 이와 관련한 작지만 활발한 커뮤니티가 있었고 브라우저 플랫폼이 응당 받아야 했던 가치를 부여하기 노력했던 우리는 첫번째 세대의 프론트엔드 개발자가 되었다

이런 웹 중심의 경력을 가지고 있으므로 지금껏 중시하고 있던 원칙에 반하는 리액트의 [HTML-in-JS](https://facebook.github.io/react/docs/jsx-in-depth.html) 모델에 내가 격렬하게 반대했을 것이라 생각했을지도 모른다. 하지만 실제로는 반대다. 내 경험상 서버 렌더링과 결합한 리액트의 컴포넌트 모델은 빠르게 배포 가능하며 접근성이 뛰어나며 점진적으로 향상된 제품을 유저들에게 제공할 수 있는 확장성을 가진 복잡한 싱글 페이지 앱을 만들 수 있는 길을 마침내 열어 주었다고 본다. 우리는 [SEEK](https://www.seek.com.au/)에서 이 기술을 활용해 가장 중요한 제품을 싱글 페이지 앱으로 만들었으며 핵심 검색 기능은 브라우저의 자바스크립트가 비활성화된 상황에서도 자연스럽게 작동하도록 서버에서 동일한 코드를 실행하게 했다.

그러니 이를 한 커뮤니티에서 다른 커뮤니티로 뻗어 있는 올리브나무 가지라고 생각해보자. 이 움직임이 무엇인지 함께 생각해보자. 완벽하지 않을 수 있고 당신이 만드려고 하는 제품에서는 사용하려는 기술이 아닐 수도 있으며 당신을 확실하게 납득시킬 수 없을지도 모른다. 하지만 최소한 머리를 싸매볼 가치는 있다.


## 왜 CSS-in-JS인가?

![CSS Modules](./css_modules.png)

