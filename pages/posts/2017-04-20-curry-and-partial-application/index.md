---
title: "함수형 프로그래밍: partial application과 curry"
description: "함수형 프로그래밍의 기반이 되는 partial application과 curry에 대한 설명"
date: "2017-04-20"
layout: post
mainImage:
tags:
  - Javascript
  - functional programming
  - Ramda
path: "/posts/2017-04-20-curry-and-partial-application"
---

## 함수형?

함수형 프로그래밍에서 기초가 되는 것이 curry와 partial application이다. 두 개념은 모두 함수의 입력과 관련이 있는데 자바스크립트처럼 함수를 [first-class citizen](https://en.wikipedia.org/wiki/First-class_citizen)으로 취급하는 언어에 익숙하지 않았던 나같은 사람이라면 다소 이해하기가 어려울 수 있다. 함수가 변수에 할당될 수 있다? 함수를 실행하면 함수가 리턴된다?

그런 일이 가능하다고 하니 받아들이긴 하겠는데 대체 어떤 일이 더 가능한 일인지 처음에는 잘 알 수 없었다. 아래 코드처럼 bind 메소드를 이용하면 함수를 생성해서 재사용이 가능하다고 했지만 실전에서 제대로 사용하지는 못했다.

```javascript
const adder = function (num) {
  return this.base + num;
};

const base10 = { base: 10 };
const add10 = adder.bind(base);

add10(20); // 30
```

하지만 Redux의 reducer를 통해 덧셈 정도나 가능할 줄 알았던 reduce 함수의 또 다른 매력을 알게 되고, redux-middleware를 통해 재귀 함수의 멋진 구현 사례를 접하고, React 구현시 higher-order 함수를 이용하면 객체지향의 상속보다는 보다 자유로운 코드의 재사용이 가능하다는 사실을 알게 되면서 조금씩 함수형 프로그래밍에 대한 관심을 가지게 되었다. 그리고 ES7이 decorator 문법을 지원하는 것을 보면서 함수형 프로그래밍을 본격적으로 공부해 보자는 마음을 먹게 되었다.

공부에 주로 활용한 서적은 [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)인데 단순 설명이 아닌 근본에 접근하려는 집필 방향과 다양한 예제 코드를 제공한다는 점에서 무척 좋았다. 이 글에서는 책의 3장에서 소개하는 partial application과 curry에 대해 정리해보고자 한다.


## partial application

partial application은 함수 인자의 일부를 미리 전달해 둔 함수를 생성한다. 다시 말하자면 함수와 복수의 인자를 전달받아서 더 적은 수의 인자로 그 함수를 실행할 수 있는 함수를 만든다. 함수의 인자를 고정시킨다고 봐도 된다.

```javascript
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs){
    return fn( ...presetArgs, ...laterArgs );
  };
}
```

위의 코드에서 작성한 partial 함수는 특정 함수와 인자들(presetArgs)을 전달받아서 함수를 리턴한다. 내부 함수에서는 사전에 사전에 전달받은 함수와 내부 함수가 실행될 때 전달받은 인자들(laterArgs)을 합쳐서 애초에 사용하려고 했던 함수(fn)를 호출한다. 예제를 보면 조금 더 와닿을 것이다.

```javascript
const adder = (a, b) => a + b;
const add10 = partial(adder, 10);
add10(20); // 30
```

partial 함수를 이용해서 첫번째 인자 a에 10이 할당되어 있는 새로운 함수를 만들었다. 위의 예제에서 함수가 실행된 `add10(20)` 부분을 풀어서 작성하면 아래와 같다.

```javascript
function partiallyApplied(...laterArgs) {
  return adder(10, ...laterArgs);
}(20);
```

partial application이 어떤 원리로 동작하지는 알았고 뭔가 그럴듯해 보이긴 한다. 하지만 아직은 쓸만해 보이지 않으니 보다 실용적인 예제를 들어보자.

```javascript
const getUser = partial(axios.get, '/user');
getUser({ id: 'ABCD' })
  .then((res) => {
    // ...
  })
```

위의 예제에서는 [axios](https://github.com/mzabriskie/axios)의 get 메소드에 미리 요청 경로를 할당해 둔 후 인자만 전달해서 사용할 수 있는 getUser라는 함수를 만들었다. 두 예제처럼 일부 인자만 변경해서 호출할 필요가 많은 경우 partial application을 사용해서 함수를 작성하면 무척 유용할 것이다.

위에서 소개한 partial 함수는 인자를 왼쪽부터 적용시키지만 함수형 프로그래밍 라이브러리인 [Ramda](http://ramdajs.com/)의 [partialRight](http://ramdajs.com/docs/#partialRight)를 이용하면 함수 인자를 오른쪽부터 적용할 수도 있다.

```javascript
const getSortedListByName = R.partialRight(axios.get, [{ sort: 'name'}]);
getSortedListByName('/users')
  .then((res) => {
    // ...
  });
```

## curry

curry는 partial application의 특수한 형태다. partial application이 미리 전달받아둘 수 있는 인자의 수에 제한이 없다면 curry는 한번에 1개만 가능하다. 그리고 원래의 함수가 요구하는 인자의 수(Function.arity, 또는 [Function.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length))가 모두 전달될 때까지 재귀적으로 curried 함수를 생성한다. 필요한 인자가 모두 채워지면 그제서야 처음에 제공된 함수를 실행한다.

```javascript
curry(axios.get)('/user')({ id: 'ABCD' })
  .then((res) => {
    // ...
  });
```

위의 예제에서는 axios.get 함수를 curry한 후 함수를 2번 더 호출했다. 보다 직관적이게 curried 함수를 호출할 때마다 변수에 할당해서 표현하자면 아래와 같다.

```javascript
const curriedGet = curry(axios.get);
const curriedGetUser = curriedGet('/user')
curriedGetUser({ id: 'ABCD' })
  .then((res) => {
    // ...
  });
```

curry 함수의 실제 구현을 살펴보자.

```javascript
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs){
    return function curried(nextArg){
      var args = prevArgs.concat( [nextArg] );

      if (args.length >= arity) {
        return fn( ...args );
      }
      else {
        return nextCurried( args );
      }
    };
  })( [] );
}
```

...처음 보면 당연히 눈에 잘 들어오지 않는 편이 자연스럽다. 이 curry의 구현에는 [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)와 재귀를 사용했다. curry 함수를 호출하면 nextCurried 함수도 즉시 실행된다. 즉 curry 함수를 실행하면 리턴되는 값은 curried 함수다. prevArgs의 초기값을 빈 배열로 할당해 둔 후 curried 함수가 실행될 때 prevArgs 배열에 nextArg 배열을 붙여나가는 방식이다. 그리고 지금까지 누적된 인자의 수가 curry에 제공된 함수 인자의 수보다 같거나 많아지만 실제 함수를 실행한다. 그렇지 않으면 nextCurried 함수를 호출해서 다시 curreid 함수를 리턴한다.

```javascript
const sum = (a, b, c, d, e) => a + b + c + d + e;
const curriedSum = curry(sum);

sum(1, 2, 3, 4, 5) === curreidSum(1)(2)(3)(4)(5) // true
```

curry를 사용한 간단한 예제다. partial application과는 달리 처음에 함수만 전달하면 되고, 결과를 얻기 위해서는 인자의 수만큼 함수를 호출해야 한다는 사실을 확인할 수 있다.


## curry와 partial application

partial application와 curry의 차이점은 대략 파악이 되었다. 하지만 함수 인자를 미리 받아둬서 재사용하겠다는 목적은 같고 구현과 사용 방식에 차이가 있는 것 같은데, 저 둘을 어떻게 쓰면 좋은 걸까?

partial application은 함수에서 복수의 인자를 한번에 고정시켜두고 싶을 때 사용하면 유용하다. 하지만 함수 조합(function composition)에 적용하려면 이야기가 달라진다. 왜냐하면 partial application이 반환하는 함수는 요구하는 인자의 수가 서로 다를 수 있기 때문이다. 다음과 같이 함수를 조합한다고 생각해보자.

```javascript
c(x) = f(g(h(x)));
```

함수를 조합하는 경우 모두 1개의 인자를 요구한다. 하지만 만약 조합하려는 함수에 정의된 인자의 수가 1개가 아니라면? curry를 이용해 1개의 인자만 전달받아도 되는 함수로 만든 후 조합하면 될 것이다.

이렇듯 curry는 일관성을 제공하기 때문에 유용하게 사용될 수 있는데, 이는 마치 Promise에서 resolve, reject를 1개의 인자로 호출하는 것과 유사하다. resolve 함수가 1개의 값만 전달한다는 것을 알기에 어떤 함수가 Promise를 리턴한다면 사용자는 then 콜백 함수에서 일관적인 방식으로 값을 처리할 수 있는 것이다.

---

partial application, curry를 직접 구현해서 사용해도 무방하지만 역시 [Ramda](http://ramdajs.com/), [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)같은 라이브러리를 사용하는 편이 함수형 프로그래밍을 더 즐거워지게 할 수 있다. 특히 Ramda는 lodash만큼 양적으로 다양하지는 않지만 데이터 조작에 필수적인 함수를 대부분 제공하며 특히 자동으로 curry가 이루어지기에 함수 재사용과 조합을 더 쉽게 할 수 있다.

## 참고

- [Functional-Light JavaScript Chapter 3: Managing Function Inputs](https://github.com/getify/Functional-Light-JS/blob/master/ch3.md)
- [Curry or Partial Application?](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
- [Ramda](http://ramdajs.com/)

