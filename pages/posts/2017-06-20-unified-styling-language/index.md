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

만약 당신이 내가 최근 리액트와 함께 작업한 [CSS Modules](https://github.com/css-modules/css-modules)에 친숙하다면 CSS-in-JS를 지지하는 사실에 놀랄지도 모르겠다.

![CSS Modules](./css_modules.png)

CSS Modules는 CSS-in-JS를 사용하지 않고 로컬 영역의 스타일시트를 작성하고 싶은 개발자들에게 주로 선택된다. 사실 나는 개인 작업에서 CSS-in-JS를 사용하지도 않는다.

그럼에도 불구하고 나는 CSS-in-JS 커뮤니티에 깊은 관심을 꾸준히 기울이고 있으며 그들이 끊임없이 만들어내는 혁신을 계속 지켜보고 있다. 뿐만 아니라 *나는 더 많은 CSS 커뮤니티들이 흥미를 가져야 한다고 생각한다.*

왜 그래야 하는가?

사람들이 스타일을 자바스크립트 안에서 작성하기를 원하는 이유를 명확히 이해하기 위해서는 이 접근법을 사용했을 깨 얻을 수 있는 실질적인 이익에 대해 접근해야 할 것이다.

나는 그 장점을 다섯가지 영역으로 구분했다:

1. 범위가 지정된(scoped) 스타일
2. 중요한(critical) CSS
3. 더 똑똑한 최적화
4. 패키지 관리
5. 브라우저가 아닌 환경의 스타일링

이들을 자세히 살펴보고 CSS-in-JS가 각각의 영역에서 무엇을 제공하는지 자세히 살펴보도록 하자.


## 1.

### 범위가 지정된(scoped) 스타일

CSS를 효율적으로 구조화하는 일이 무척 어렵다는 일은 공공연한 사실이다. 오랫동안 유지된 프로젝트에 참여했을 때 CSS가 가장 파악하기 어려운 부분이라는 건 흔한 사실이다.

이 문제를 해결하기 위해 CSS 커뮤니티는 많은 투자를 했다. Nicole Sullivan의 [OOCSS](https://github.com/stubbornella/oocss/wiki)나 Jonathan Snook [SMACSS](https://smacss.com/)와 같은 방법론을 이용해 스타일의 유지보수를 보다 용이하게 만드려는 시도를 해 왔다. 하지만 현재 시점에서 인기도에 의하면 확실한 승자는 Yandex의 Block Element Modifier라고도 불리는 [BEM](http://getbem.com/)이다.

궁극적으로 BEM은 (CSS에만 적용되었을 경우) 스타일의 클래스를 `.Block__element--modifier` 패턴으로 제한함으로서 최적화를 이루려고 하는 이름 만들기 규칙(naming convention)이다. BEM 스타일의 코드베이스에서 개발자는 항상 BEM의 규칙을 따르려고 해야 한다. 엄격하게 규칙을 따랐을 경우 BEM은 아주 잘 작동한다. 하지만 왜 범위 지정이라는 근본적인 일이 단지 *규칙* 하나에 의존해야 하는가?

그들이 확실히 말하든 아니든 대부분의 CSS-in-JS 라이브러리들은 BEM 기반의 사고방식을 따르면서 각각의 UI에 스타일을 지정하려고 한다. 하지만 근본적으로 다른 방식으로 구현하고 있다.

실제로 어떻게 구현하고 있을까? Sunil Paid의 [glamor](https://github.com/threepointone/glamor)를 사용할 경우 코드는 아래와 같이 작성한다.

```javascript
import { css } from 'glamor'

const title = css({
  fontSize: '1.8em',
  fontFamily: 'Comic Sans MS',
  color: 'blue'
})

console.log(title)
// → 'css-1pyvz'
```

이 코드에서 *CSS 클래스는 어디에도 존재하지 않는다*는 사실을 확인할 수 있다. 이 시스템에서 직접 선언된 클래스 레퍼런스는 더 이상 존재하지 않는 대신 라이브러리가 자동으로 만들어준다. 글로벌 영역에서 클래스명이 충돌할 일이 없다는 건 우리가 직접 클래스에 BEM과 같은 규칙을 바탕으로 접두어를 붙일 필요가 없어진다는 말과 같다.

이 클래스 선택자의 범위 지정은 관련 코드의 범위 지정 규칙과 일치한다. 이 선택자들을 앱의 다른 영역에서 사용하고 싶다면 자바스크립트 모듈로 변환해서 필요한 곳에서 불러오면(import) 된다. *어떤 코드에서도 주어진 스타일을 쉽게 추적할 수 있게 만드는 일*은 코드베이스를 지속적으로 유지보수성이 있도록 한다는 측면에서 무척 강력하다.

***단순한 규칙을 사용하는 것에서 기본적으로 스타일의 범위가 지정되도록 강제하는 방향으로 나아감으로써 스타일 코드의 기본 퀄리티를 향상시켰다. 이로서 BEM은 선택하는 규칙이 아닌(not opt-in) 시스템에 포함된(baked-in) 규칙이 되었다.***

---

더 진행하기 전에 명확하게 하고 넘어가야할 매우 중요한 포인트가 있다.

***인라인(inline) 스타일이 아닌 CSS 직접 생산한다는 점이다.***

초기에 대부분의 CSS-in-JS 라이브러리들은 각각의 요소에 스타일을 직접 붙이는 방식을 사용했다. 하지만 이 방식의 큰 결점은 그 '스타일' 속성이 CSS가 할 수 있는 모든 것을 할 수 없다는 점이다. 새로운 라이브러리들은 그렇게 하는 대신 런타임에서 전역에 스타일을 추가하고 제거하는 *동적인 스타일시트*에 집중하고 있다.

한 예로서 CSS를 생성하는 초기의 CSS-in-JS 라이브러리 중 하나인 Oleg Slobodskoi의 [JSS](https://github.com/cssinjs/jss)를 살펴보자.

![JSS](./jss.png)

JSS를 사용할 경우 동일한 CSS 규칙으로 매핑되는 hover나 미디어쿼리같은 표준 CSS 규칙을 사용할 수 있다.

```javascript
const styles = {
  button: {
    padding: '10px',
    '&:hover': {
      background: 'blue'
    }
  },
  '@media (min-width: 1024px)': {
    button: {
      padding: '20px'
    }
  }
}
```

이 스타일을 도큐먼트에 추가하면 자동으로 생성된 스타일들이 제공된다.

```javascript
const { classes } = jss.createStyleSheet(styles).attach()
```

생성된 클래스들은 자바스크립트 안에서 마크업을 작성할 때 직접 작성된 클래스 대신 사용될 수 있다. 이 패턴은 제대로 된 프레임워크나 innerHTML같은 간단한 방법에 상관없이 제대로 작동한다.

```javascript
document.body.innerHTML = `
  <h1 class="${classes.heading}">Hello World!</h1>
`
```

스타일을 이런 식으로 관리하는 것은 그 자체로서 약간의 이점이 있는데, 그것은 컴포넌트 라이브러리들과 잘 결합된다는 점이다. 그 결과로서 대부분의 인기있는 라이브러리와 결합한 형태를 쉽게 발견할 수 있다. 예를 들면 JSS는 [react-jss](https://github.com/cssinjs/react-jss)의 도움의 받아 전역 스타일을 관리하면서 필요한 부분을 조금씩 컴포넌트로 주입하는 방식으로 리액트 컴포넌트와 쉽게 결합될 수 있다.

```javascript
import injectSheet from 'react-jss'

const Button = ({ classes, children }) => (
  <button className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </button>
)

export default injectSheet(styles)(Button)
```

컴포넌트에 관련된 스타일에 집중함으로써 스타일이 코드 레벨에서 더 밀접하게 통합되며 우리는 효과적으로 BEM을 논리적인 결론으로 받아들인다. 그런데 스타일과 컴포넌트가 너무 강하게 연결되어 있기 때문에 CSS-in-JS 커뮤니티의 많은 사람들은 스타일 추출, 네이밍, 컴포넌트의 재사용이 가지는 중요성을 놓치고 있다고 느낀다.

이 문제를 완전히 새로운 방식으로 접근한 방법은 Glen Maddern과 Max Stoiber의 [styled-components](https://github.com/styled-components/styled-components)의 등장과 함께 나타났다.

![Styled Component](./styled_components.png)

스타일시트를 생성하는 대신 컴포넌트에 직접 바인딩함으로써 컴포넌트를 생성하도록 강제한다.

```javascript
import styled from 'styled-components'

const Title = styled.h1`
  font-family: Comic Sans MS;
  color: blue;
`
```

이 스타일을 적용할 때 기존의 요소에 클래스를 붙이지 않는다. 생성된 컴포넌트를 단순히 렌더링한다.

```html
<Title>Hello World!</Title>
```

styled-components가 tagged template literals를 이용해 전통적인 CSS 문법을 사용하는 대신 다른 라이브러리들은 데이터 구조를 사용한다. 주목할만한 대안은 PayPal의 Kent C. Dodds가 만든 [Glamorous](https://github.com/paypal/glamorous)다.

![Glamorous](./glamorous.png)

Glamorous는 styled-components처럼 컴포넌트 우선 API를 제공한다. 하지만 *문자열*대신 *객체*를 사용해서 라이브러리가 CSS 파서를 사용할 필요가 없도록 했으며 그 결과 라이브러리의 사이즈와 성능 지표를 향상시켰다.

```javascript
import glamorous from 'glamorous'

const Title = glamorous.h1({
  fontFamily: 'Comic Sans MS',
  color: 'blue'
})
```

어떤 문법을 사용하든 이 두 방식으로 만들어진 스타일은 단순히 범위가 지정되어 있지(scoped) 않다. *그들은 컴포넌트와 결코 분리될 수 없다*. 리액트같은 라이브러리를 사용할 때 컴포넌트는 기본적인 구성 요소며 이제 우리의 스타일은 그 구조의 핵심 요소를 구성한다. *만약 앱의 모든 것을 컴포넌트로 표현한다면, 스타일이라고 그러지 않을 이유가 있는가?*

---

BEM에 아주 능숙한 베테랑이라면 이 모든 것들은 우리의 시스템에 도입된 변화의 중요성을 고려했을 때 상대적으로 미약한 변화라고 느겨질 수 있다. 사실 CSS Modules는 이를 지금 누리고 있는 CSS 개발 도구 에코시스템을 유지하면서도 얻을 수 있게 해준다. 이것이 많은 프로젝트들이 친숙한 표준 CSS를 버리지 않고도 문제를 효과적으로 해결할 수 있는 확장성있는 CSS를 작성할 수 있도록 도와주는 CSS Modules를 계속 사용하고 있는 이유이기도 하다.

하지만, 이제는 지금까지의 기본적인 개념들을 기반으로 더 흥미로운 일을 시도할 때가 되었다.


## 2.

### 중요한(ciritical) CSS

현재 페이지를 렌더링하는데만 필요한 중요한 스타일을 도큐먼트 헤드에 추가해서 최초 로딩 시간을 향상시키는 방법은 비교적 최근의 모범 사례다. 이는 브라우저가 단 하나의 픽셀도 화면에 렌더링하기 전에 가능한 모든 시각적인 스타일을 불러오도록 강제하는 일반적인 스타일 로딩 방식과는 뚜렷하게 대조적이다.

중요한 CSS를 추출하고 인라인에 적용하는 Addy Osmani의 [ciritical](https://github.com/addyosmani/critical)이라는 도구가 있긴 하다. 하지만 중요한 CSS를 주요하고 자동화하기 어렵다는 사실을 근본적으로 바꾸지는 않는다. 이는 까다롭고 순수하게 선택적인 성능 최적화 과정이기 때문에 대부분의 프로젝트들이 이 과정을 생략한다.

CSS-in-JS는 완전히 다르다.

서버 렌더링된 앱을 개발할 때 중요한 CSS를 추출하는 일은 단순히 최적화 과정이 아니다. CSS-in-JS는 중요한 CSS가 우선해서 작동하도록 본질적으로 *요구한다*

예를 들어 Khan Academy의 [Aphrodite](https://github.com/Khan/aphrodite)를 사용하면 클래스를 요소에 적용할 때 인라인에서 사용되는 `css` 함수가 각각의 렌더링 과정에서 어떤 스타일이 사용되었는지 계속 추적한다.

```jsx
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  title: { ... }
})

const Heading = ({ children }) => (
  <h1 className={css(styles.heading)}>{ children }</h1>
)
```

모든 스타일이 자바스크립트에서 선언되어 있지만 현재 페이지에 필요한 모든 스타일을 정적인 문자열로 구성된 CSS로 쉽게 추출할 수 있고 서버 사이드 렌더링시 도큐먼트의 head에 삽입할 수 있다.

```jsx
import { StyleSheetServer } from 'aphrodite';

const { html, css } = StyleSheetServer.renderStatic(() => {
  return ReactDOMServer.renderToString(<App/>);
});
```

이제 중요한 CSS 블럭을 아래와 같은 방식으로 렌더링할 수 있다.

```javascript
const criticalCSS = `
  <style data-aphrodite>
    ${css.content}
  </style>
`;
```

리액트의 서버 렌더링 모델을 살펴보았다면 이는 무척 익숙한 패턴일 것이다. 리액트에서 컴포넌트는 마크업을 자바스크립트 안에서 선언하지만 서버에서 표준 HTML문자열로 렌더링될 수 있다.

***만약 점진적 향상(progressive enhancement)을 염두에 두고 앱을 개발한다면 완전히 자바스크립트로 작성되었음에도 불구하고 클라이언트 사이드에서 자바스크립트는 전혀 필요없을 수도 있다.***

어느 쪽이든 클라이언트 사이드 자바스크립트는 당신의 싱글 페이지 앱(SPA, single-page app)을 시작하기 위해서는 코드를 번들링해서 어떤 시점에서 갑자기 로드되어 시점부터 브라우저에서 렌더링할 필요가 있다.

서버상에서는 HTML과 CSS의 렌더링은 동시에 이루어지기 때문에 Aphrodite같은 라이브러리는 앞서 살펴보았듯이 한번의 호출을 통해 중요한 CSS와 서버 렌더링된 HTML을 능률적으로 생성할 수 있도록 도와준다. 이는 우리가 비슷한 방법으로 리액트 컴포넌트를 정적인 HTML로 렌더링할 수 있게 해준다.

```jsx
const appHtml = `
  <div id="root">
    ${html}
  </div>
`
```

CSS-in-JS를 서버에서 사용함으로써 싱글 페이지 앱이 자바스크립트 없이 작동하도록 할 뿐만 아니라 *더 빠르게 렌더링해줄 수 있다*.

***셀렉터의 범위 지정과 마찬가지로 중요한 CSS를 렌더링하는 모범 사례는 이제 선택 가능한 것이 아닌 시스템에 포함되었다.***


## 3.

### 더 똑똑한 최적화

