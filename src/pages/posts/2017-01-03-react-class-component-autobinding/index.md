---
title: "데코레이터를 이용한 React 컴포넌트 메소드 자동 바인딩"
description: "데코레이터를 이용한 React 컴포넌트 메소드 자동 바인딩"
date: "2017-01-03"
layout: post
mainImage: ""
tags:
  - JavaScript
  - React
  - ES6
  - ES7
  - Front-end
path: "/posts/2017-01-03-react-class-component-autobinding"
---

## React 컴포넌트 메소드에 자동으로 바인딩되는 `this`

React 컴포넌트도 하나의 객체이므로 자바스크립트 문법을 따른다. 하지만 다른 점이 있는데, React는 `React.createClass`를 이용해 컴포넌트를 생성하면 모든 메소드에 컴포넌트 객체를 자동으로 바인딩한다는 점이다.

자동 바인딩을 통해 React 컴포넌트의 메소드는 어떤 위치에서 호출되어도 `this`를 통해 컴포넌트에 접근할 수 있게 된다.

```js
var Button = React.createClass({
  _onClick() {
    console.log(this);
  },
  render: function() {
    return <div onClick={this._onClick} />
  }
});
```

위의 예제에서 `div` 컴포넌트를 클릭하면 `Button` 컴포넌트의 메소드로서 `_onClick`이 실행되는 것이 아니라 **onClick 속성에 할당된 함수로서 호출**된다. 코드로 풀어내면 아래와 같다.

```js
onClick = this._onClick;
onClick(); // div 클릭시 호출
```

`this._onClick`을 할당받은 `onClick` 함수는 **Button 컴포넌트의 메소드가 아니다**. 따라서 실행된 함수 내부에서의 `this`는 자연히 컴포넌트를 가리키지 않아야 정상이다.(이 경우 `this`에 접근하면 `null`이 반환된다)

하지만 `React.createClass`는 자동 바인딩을 통해 저 경우에도 this를 통해 컴포넌트에 접근할 수 있게 해 준다. 이는 작업시 편의성을 제공하기 위한 일종의 트릭이라고 할 수 있다.

## ES6 클래스 형식의 컴포넌트 선언에서는 사라진 자동 바인딩

그런데 React 버전 0.13부터 지원하는 ES6 클래스 형식의 컴포넌트 선언에서는 자동 바인딩을 지원하지 않는다. 공식 홈페이지의 [포스트](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding)에 의하면 자바스크립트 표준과 다르게 동작하는 것이 혼란을 줄 수 있기 때문에 제거하기로 했다고 한다. 그리고 `React.createClass`를 이용하면 여전히 자동 바인딩이 지원된다.

클래스 형식의 컴포넌트를 선언할 경우 메소드에 컴포넌트 인스턴스를 전달하기 위한 방법은 여러가지가 있다. `constructor` 내부에서 직접 바인딩하는 방법, 호출되는 장소에서 인라인으로 직접 바인딩해주는 방법, `arrow function`을 사용하는 방법 등이 있다.

```js
class SelfBinding extends component {
  constructor(props) {
    super(props);
    this.say = this.say.bind(this);
    this.name = 'React component'
  }

  say() {
    alert('hello' + this.name);
  }

  hi() {
    alert('hi' + this.name);
  }

  render() {
    return (
      <div>
        <button onClick={this.say}>press</button>
        <button onClick={() =>  this.hi()}>press</button>
        <button onClick={this.hi.bind(this)}>press</button>
      <div>
    );
  }
}
```

## 데코레이터(`decorator`)를 이용한 자동 바인딩

데코레이터는 차기 자바스크립트 표준(ES2016/ES7)에 추가될 문법으로 [higher-order](https://en.wikipedia.org/wiki/Higher-order_function) 함수 호출을 위한 간편한 문법을 제공한다. higher-order 함수는 다른 함수를 래핑해서 새로운 함수를 생산한다. 함수를 변경하지 않고 기능을 확장할 수 있다는 장점이 있다.

데코레이터 라이브러리인 [`core-decorators.js`](https://github.com/jayphelps/core-decorators.js)의 `autobind` 메소드를 이용하면 자동 바인딩을 간편하게 적용할 수 있다.

특정 메소드에만 적용할 수도 있고 컴포넌트에 적용하면 모든 메소드가 바인딩된다.

```javascript
...
import { autobind } from 'core-decorators';

@autobind
class DecoratedComponent extends Component {
  ...
}
```

### 데코레이터를 사용하기 위한 필요조건

- `babel` 버전이 6일 경우 [`babel-plugin-transform-decorators-legacy`](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) 플러그인을 설치해야 한다.
- react-hot-loader를 사용하고 있을 경우 [`2.0.0-alpha`](https://github.com/gaearon/react-hot-loader/pull/182)이상의 버전이 필요하다.



## 참조
- [Classes - Prototype methods (MDN references)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#Prototype_methods)
- [React v0.13.0 Beta 1 # autobinding](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding)
- [React and ES6 - Part 3, Binding to methods of React class (ES7 included)](http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html)
- [React.createClass](https://facebook.github.io/react/docs/react-api.html#createclass)
- [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.4s8bu1oeo)
