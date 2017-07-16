---
title: "[번역] 몇가지 HTML 팁"
description: "hacks.mozilla.org에 게시된 A few HTML tips를 번역한 글"
date: "2017-05-29"
layout: post
mainImage:
tags:
  - HTML
  - SVG
path: "/posts/2017-05-29-few-html-tips"
---

이글은 [hacks.mozilla.org](https://hacks.mozilla.org)에 게시된 [A few HTML tips](https://hacks.mozilla.org/2016/08/a-few-html-tips/)를 번역한 글입니다.

---

얼마전 나는 [CSS 작성에 도움이 될 팁](https://hacks.mozilla.org/2016/05/css-coding-techniques/)에 대해 글을 썼다. 이번에는 HTML 작성 능력을 업그레이드할 시간이다. 이 글에서 나는 HTML 코딩에 대해 몇가지 팁과 조언을 공유하려 한다. 단락, 제목, 폼을 적절히 구성하는 방법 등의 몇가지 가이드는 초심자에게 적합하겠지만 SVG 스프라이트를 아이콘으로 사용하는 방법과 몇가지 고급 주제에 대해서도 얘기할 것이다.

## 텍스트(Text)

### 단락(Paragraphs)

대부분의 글을 단락으로 구성되어 있고 HTML는 이를 위한 `<p>` 요소가 있다. 텍스트를 **단락처럼 구분하기 위해 \<br\> 태그를 사용하지 말아야 한다.** 그 태그의 목적은 거기에 있지 않다.


#### 안좋은 방법:

```html
Cupcake ipsum dolor sit. Amet chupa chups chupa chups sesame snaps. Ice cream pie jelly
beans muffin donut marzipan oat cake.

<br>

Gummi bears tart cotton candy icing. Muffin bear claw carrot cake jelly jujubes pudding
chocolate cake cheesecake toffee.
```


#### 추천하는 방법:

```html
<p>Cupcake ipsum dolor sit. Amet chupa chups chupa chups sesame snaps. Ice cream
pie jelly beans muffin donut marzipan oat cake.</p>

<p>Gummi bears tart cotton candy icing. Muffin bear claw carrot cake jelly jujubes
pudding chocolate cake cheesecake toffee.</p>
```

줄바꿈 태그의 제대로 된 역할은 노래나 시의 절을 변경하는 데 있다.

```html
<p>So close, no matter how far<br>
Couldn’t be much more from the hearth<br>
Forever trusting who we are<br>
And nothing else matters</p>
```


### 제목(headings)

`<h1>`부터 `<h6>`까지의 제목 태그는 각각 1(가장 중요함)부터 6(덜 중요함)까지의 암시적인 순위를 가지고 있다.

[의미를 바르게 사용하기](https://www.w3.org/TR/html5/sections.html#headings-and-sections)위해서는 **제목 태그의 순위를 1부터 6까지 순서대로 사용**해야 한다. 단지 브라우저가 렌더링해주는 텍스트의 사이즈를 기준으로 제목 태그를 지정해서는 안된다. 원하는 스타일을 위해서는 CSS를 사용할 수 있으니(사실 반드시 사용해야 한다!) 순서에 맞게 올바른 제목 태그를 사용하길 바란다.


#### 안좋은 방법:

```html
<article>
    <h1>Monkey Island</h1>
    <h4>Look behind you! A three-headed monkey!</h4>
    <!-- ... -->
</article>
```

#### 추천하는 방법:


```html
<article>
    <h1>Monkey Island</h1>
    <h2>Look behind you! A three-headed monkey!</h2>
    <!-- ... -->
</article>
```

또 고려해야 할 사항은 **제목에 뒤따르는 부제목을 어떻게 작성**하느냐다. [W3C의 추천](https://www.w3.org/TR/html5/common-idioms.html#common-idioms)에 의하면 낮은 순위의 제목 태그를 사용하기보다 일반 텍스트를 사용하길 권장하고 있다.

#### 안좋은 방법:

```html
<header>
    <h1>Star Wars VII</h1>
    <h2>The Force Awakens</h2>
</header>
```

#### 추천하는 방법:

```html
<header>
    <h1>Star Wars VII</h1>
    <p>The Force Awakens</p>
</header>
```

## 폼(Forms)

### 플레이스홀더(Placeholders)

`<input>`의 플레이스홀더 속성은 사용자가 입력해야 할 예제 값을 표시해주며 입력이 시작되면 자동으로 사라진다. 플레이스홀더는 **유효한 값의 형식**을 표시하기 위한 양식이다.

그런데 현실에서는 많은 플레이스홀더들이 입력 필드가 가져야 할 유효한 값을 알려주는 대신 그 필드가 *무엇*인지를 알려주는 `<label>`처럼 사용되고 있다. 그런 방식은 [접근성](https://developer.mozilla.org/en-US/docs/Web/Accessibility)이 떨어지기에 지양해야 한다.

#### 안좋은 방법:

```html
<input type="email" placeholder="Your e-mail" name="mail">
```

#### 추천하는 방법:

```html
<label>
    Your e-mail:
    <input type="email" placeholder="darth.vader@empire.gov" name="mail">
</label>
```

### 모바일 기기의 키보드

스마트폰이나 태블릿같은 모바일 기기로 접근하는 사람들을 위해 **입력 힌트를 제공**하는 일은 매우 중요하다. 이는 우리가 `<input>` 태그에 [올바른 타입](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes)을 지정함으로써 쉽게 제공할 수 있다.

예를 들어 `type="number"`는 스마트폰이 일반적인 문자열 키보드 대신 숫자 키패드를 표시하도록 한다. `type="email"`, `type="tel"` 역시 각각 메일, 전화번호 입력에 알맞은 인터페이스를 제공할 수 있도록 도와준다.


#### 안좋은 방법:

```html
<label>Phone number: <input type="text" name="mobile"></label>
```

#### 추천하는 방법:

```html
<label>Phone number: <input type="tel" name="mobile"></label>
```

아래의 이미지를 비교해보자. 왼쪽이 `type="text"`, 오른쪽이 `type="number"`인 경우 보여지는 키보드의 모습이다.

!['text', 'number' 형식에 따른 스마트폰 키보드](https://hacks.mozilla.org/files/2016/08/keyboard_compare-500x443.png)


## 이미지

SVG 파일은 아래처럼 `<img>` 태그에 사용할 수 있을 뿐만 아니라

```html
<img src="acolyte_cartoon.svg" alt="acolyte">
```

웹 폰트를 사용하는 대신 **SVG 스프라이트로 벡터 아이콘을 구현**하는 일에도 사용할 수 있다. 웹 폰트는 해킹이며 완벽한 결과를 얻지 못할 수도 있다. 그 이유는 브라우저가 웹 폰트를 이미지가 아닌 텍스트로 처리하기 때문이다. 그리고 컨텐츠/광고 차단 프로그램이 웹 폰트를 다운받지 못하게 하는 등의 잠재적인 문제도 존재한다. 이에 대해 더 알아보고 싶다면 웹 폰트보다 SVG를 아이콘으로 사용하는게 왜 더 좋은지에 대해 말해주는 [Sarah Semark의 프레젠테이션](http://wordpress.tv/2016/05/28/sarah-semark-stop-using-icon-fonts-love-svg/)를 시청해보길 바란다.

SVG 스프라이트의 아이디어는 [CSS 스프라이트](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS)의 그것과 매우 유사하다. SVG의 경우에 모든 자산(assets)은 `<symbol>` 태그에 래핑되어 있다.

```html
<svg>
    <symbol id="social-twitter" viewBox="...">
        <!-- 실제 이미지 데이터는 여기에 들어감 -->
    </symbol>
</svg>
```

그리고 아이콘은 HTML 안에서 `<svg>` 태그와 symbol ID를 명시하는 방식으로 사용할 수 있다.

```html
<svg class="social-icon">
    <use xlink:href="icons.svg#social-twitter" />
</svg>
```

SVG 스프라이트를 만드는 일이 다소 반복적인 작업으로 보이는가? 그래서 여러 SVG 파일들을 모아서 하나의 SVG 스프라이트로 만드는 작업을 처리해주는 [gulp-svgstore](https://github.com/w0rm/gulp-svgstore)같은 자동화 툴이 존재한다.

그리고 기억하길 바란다. 우리는 사진을 불러오기 위해 `<img>` 대신 `<svg>` 태그를 사용했으므로 CSS를 이용해서 스타일을 적용할 수 있다. 웹 폰트로 가능했던 모든 멋진 일들이 이 SVG 아이콘을 통해서도 가능하다는 얘기다!

```css
.social-icon {
    fill: #000;
    transition: all 0.2s;
}

.social-icon:hover {
    fill: #00f;
}
```

비록 CSS에 제한이 있기는 하다. SVG를 이런 방식으로 사용하면서 `<use>` 태그를 이용해 `<symbol>`에 접근하면 이미지가 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)에 들어가버려서 적용할 수 있는 CSS에 제한이 생기게 된다. 이 경우 스타일링하고 싶은 요소를 골라낼 수 없고 몇몇 속성(ex. fill)은 해당 속성이 정의되어 있지 않은 요소에만 적용될 것이다. 하지만, 이건 웹 폰트에서도 불가능하니까 그렇게 큰 단점이라고 볼 수는 없지 않을까?

<p data-height="265" data-theme-id="0" data-slug-hash="OXBQZq" data-default-tab="html,result" data-user="ladybenko" data-embed-version="2" data-pen-title="SVG acolyte demo" class="codepen">See the Pen <a href="https://codepen.io/ladybenko/pen/OXBQZq/">SVG acolyte demo</a> by ladybenko (<a href="https://codepen.io/ladybenko">@ladybenko</a>) on <a href="https://codepen.io">CodePen</a>.</p>


이번 글에서 제시한 몇가지 팁들이 도움이 되었길 바란다.


<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


