import { injectGlobal } from 'styled-components'
import { fontFace } from 'polished'
import { rhythm } from '../utils/typography'
import { normalize } from 'polished'

// inject global css
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,400,400i,700,700i');

  @font-face {
    font-family: 'Nanum Square';
    src: url('/fonts/nanum-square/fonts/NanumSquareL.eot'); /* IE9 Compat Modes */
    src: url('/fonts/nanum-square/fonts/NanumSquareL.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/nanum-square/fonts/NanumSquareL.woff') format('woff'), /* Modern Browsers */
         url('/fonts/nanum-square/fonts/NanumSquareL.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/nanum-square/fonts/NanumSquareOTFLight.svg#017f9c78318bcde3d1dc4451e8eaca0a') format('svg'); /* Legacy iOS */

    font-style:   normal;
    font-weight:  300;
  }

  @font-face {
    font-family: 'Nanum Square';
    src: url('/fonts/nanum-square/fonts/NanumSquareR.eot'); /* IE9 Compat Modes */
    src: url('/fonts/nanum-square/fonts/NanumSquareR.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/nanum-square/fonts/NanumSquareR.woff') format('woff'), /* Modern Browsers */
         url('/fonts/nanum-square/fonts/NanumSquareR.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/nanum-square/fonts/NanumSquareOTFR.svg#9e23ceb0c858ca37642ba540402577eb') format('svg'); /* Legacy iOS */

    font-style:   normal;
    font-weight:  400;
  }

  @font-face {
    font-family: 'Nanum Square';
    src: url('/fonts/nanum-square/fonts/NanumSquareB.eot'); /* IE9 Compat Modes */
    src: url('/fonts/nanum-square/fonts/NanumSquareB.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/nanum-square/fonts/NanumSquareB.woff') format('woff'), /* Modern Browsers */
         url('/fonts/nanum-square/fonts/NanumSquareB.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/nanum-square/fonts/NanumSquareOTFB.svg#a41a1fda1fdf3dafd3394867a156b1cf') format('svg'); /* Legacy iOS */

    font-style:   normal;
    font-weight:  700;
  }

  @font-face {
    font-family: 'Nanum Square';
    src: url('/fonts/nanum-square/fonts/NanumSquareEB.eot'); /* IE9 Compat Modes */
    src: url('/fonts/nanum-square/fonts/NanumSquareEB.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/nanum-square/fonts/NanumSquareEB.woff') format('woff'), /* Modern Browsers */
         url('/fonts/nanum-square/fonts/NanumSquareEB.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/nanum-square/fonts/NanumSquareOTFExtraBold.svg#090d6763bc81b49309446d23fbd10e87') format('svg'); /* Legacy iOS */

    font-style:   normal;
    font-weight:  900;
  }

  ${fontFace({
    fontFamily: 'Menlo Regular',
    fontFilePath: '/fonts/menlo-regular',
  })}
  ${fontFace({
    fontFamily: 'Iropke Batang',
    fileFormats: ['eot', 'woff'],
    fontFilePath: '/fonts/IropkeBatangM',
  })}

  .iframe-video-wrapper {
    position: relative;
    display: block;
    padding-bottom: 56.25%;
    margin: 3.2rem 0;
  }

  .iframe-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

/**
 * VS theme by Andrew Lock (https://andrewlock.net)
 * Inspired by Visual Studio syntax coloring
 */
injectGlobal`
/**
 * Github-like theme for Prism.js
 * @author Luke Askew http://github.com/lukeaskew
 */
code,
code[class*='language-'],
pre[class*='language-'] {
  color: #333;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  tab-size: 4;
  hyphens: none;
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  line-height: 1.4;
  direction: ltr;
  cursor: text;
  border: none;
}

pre[class*='language-'] {
  overflow: auto;
  margin: 1em 0;
  padding: 1.2em;
  border-radius: 3px;
  font-size: 85%;
}

pre code {
  background: none;
}

p code,
li code,
table code {
  margin: 0;
  border-radius: 3px;
  padding: 0.2em 0;
  font-size: 85%;
}
p code:before, p code:after,
li code:before,
li code:after,
table code:before,
table code:after {
  letter-spacing: -0.2em;
  content: '\00a0';
}

code,
:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: rgba(0,0,0, 0.04);
}

:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
}

.token.comment, .token.prolog, .token.doctype, .token.cdata {
  color: #969896;
}
.token.punctuation, .token.string, .token.atrule, .token.attr-value {
  color: #183691;
}
.token.property, .token.tag {
  color: #63a35c;
}
.token.boolean, .token.number {
  color: #0086b3;
}
.token.selector, .token.attr-name, .token.attr-value .punctuation:first-child, .token.keyword, .token.regex, .token.important {
  color: #795da3;
}
.token.operator, .token.entity, .token.url, .language-css .token.string {
  color: #a71d5d;
}
.token.entity {
  cursor: help;
}

.namespace {
  opacity: 0.7;
}
`
