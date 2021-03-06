---
title: "함수형 프로그래밍: partial application과 curry"
description: "함수형 프로그래밍의 기반이 되는 partial application과 curry에 대한 설명"
date: "2017-04-20"
layout: post
mainImage:
tags:
  - Javascript
  - 함수형 프로그래밍
path: "/posts/2017-04-20-curry-and-partial-application"
---

함수형 프로그래밍에 관심을 두게 된 계기는 React-Redux였다. Redux의 reducer를 통해 단순 연산 정도만 가능할 줄 알았던 reduce 함수의 또 다른 매력을 알게 되고, redux-middleware를 통해 재귀 함수의 멋진 구현 사례를 접하고, React 컴포넌트를 작성할 때 higher-order 함수를 이용하면 객체지향의 상속보다는 다소 유연한 코드 공유가 가능하다는 사실을 알게 되면서 조금씩 함수형 프로그래밍에 대한 관심을 두게 되었다. 그리고 ES7이 decorator 문법을 지원하는 것을 보면서 함수형 프로그래밍을 본격적으로 공부해 보자는 마음을 먹게 되었다.

공부에 주로 활용한 서적은 [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)인데 단순 설명이 아닌 근본에 접근하려는 집필 방향과 다양한 예제 코드를 제공한다는 점에서 무척 좋았다. 이 글에서는 책의 3장에서 소개하는 partial application과 curry에 대해 정리해보고자 한다.

## partial application

partial application은 함수 인자의 일부를 미리 전달해 둔 함수를 생성한다. 다시 말하자면 함수와 복수의 인자를 전달받아서 더 적은 수의 인자로 그 함수를 실행할 수 있는 함수를 만든다. 함수의 인자를 고정한다고도 볼 수 있다.

```javascript
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs){
    return fn( ...presetArgs, ...laterArgs );
  };
}
```

위의 코드에서 작성한 partial 함수는 특정 함수와 인자들(presetArgs)을 전달받아서 함수를 리턴한다. 리턴된 함수(partiallyApplied)가 호출될 때 미리 전달받은 인자들(presetArgs)을 더한 후 애초에 호출하려고 했던 함수(fn)를 호출한다. 말보다는 조금 직관적인 예제를 살펴보자.

```javascript
const adder = (a, b) => a + b;
const add10 = partial(adder, 10);

add10(20); // 30
```

partial 함수를 이용해서 첫번째 인자 a에 10이 고정된 새로운 함수를 만들었다. 위의 예제에서 함수가 실행된 `add10(20)` 부분을 풀어서 작성하면 아래와 같다.

```javascript
function partiallyApplied(...laterArgs) {
  return adder(10, ...laterArgs);
}(20);
```

partial에 의해 만들어진 partiallyApplied 함수에 고정되지 않은 나머지 인자를 전달해서 adder 함수를 호출하는 과정을 확인할 수 있다. partial application이 어떤 원리로 동작하는지는 알았고 뭔가 그럴듯해 보이긴 한다. 하지만 아직은 쓸만해 보이지 않으니 더욱 실용적인 예제를 들어보자.

```javascript
function ajax(endPoint = '', search = {}) {
  // ...
  return Promise.resolve(res);
}

const getUser = partial(ajax, '/user');

getUser({ id: 'A1' })
  .then((res) => {
    // ...
  })
```

위의 예제에서는 ajax 함수에 요청 경로를 사전에 할당해 둔 후 search 객체만 전달해서 사용할 수 있는 getUser라는 함수를 만들었다. 이렇게 일부 인자를 고정해서 호출할 필요가 있으면 partial application을 사용하면 중복 코드를 줄이고 적절한 함수명을 통해 가독성을 높일 수 있다.

## curry

curry는 partial application의 특수한 형태다. partial application이 미리 전달받아둘 수 있는 인자의 수에 제한이 없다면 curry는 1개만 가능하다. 그리고 원래의 함수가 요구하는 인자의 수(Function.arity, 또는 [Function.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length))가 모두 전달될 때까지 재귀적으로 curry 함수를 생성한다. 그리고 함수 호출에 필요한 인자가 모두 전달되면 curry 함수를 만들지 않고 원래의 함수를 호출한다.

```javascript
curry(ajax)('/user')({ id: 'A1' })
  .then((res) => {
    // ...
  });
```

위의 예제에서는 ajax 함수를 curry한 후 함수를 2번 더 호출했다. curried 함수를 호출할 때마다 변수에 할당해서 보다 직관적으로 작성하자면  아래와 같다.

```javascript
const curriedGet = curry(ajax);
const curriedGetUser = curriedGet('/user')

curriedGetUser({ id: 'A1' })
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

여기에 제시한 curry의 구현에는 재귀, 클로져와 [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)를 사용했다. curry 함수를 호출하면 nextCurried 함수도 즉시 실행된다. 즉 curry 함수를 호출했을 때 리턴되는 값은 2개의 함수로 둘러싸인 curried 함수다.

curry가 실행되면 prevArgs의 초깃값을 빈 배열로 우선 할당해 둔다. 그리고 curried 함수가 실행될 때 전달받은 인자(nextArg)를 상위 컨텍스트에 위치한 prevArgs 배열에 하나씩 추가하는 방식이다. 그리고 누적된 인자의 수가 curried 함수 생성에 사용된 함수(fn) 인자의 수보다 같거나 많은 때 실제 함수를 실행한다. 그렇지 않으면 nextCurried 함수를 호출해서 다시 curried 함수를 리턴한다.


```javascript
const sum = (a, b, c, d, e) => a + b + c + d + e;
const curriedSum = curry(sum);

sum(1, 2, 3, 4, 5) === curriedSum(1)(2)(3)(4)(5) // true
```

curry를 사용한 간단한 예제다. partial application과는 달리 curried 함수 생성에 인자 없이 함수만 전달하고 원래의 함수 호출 결과를 얻기 위해서는 인자의 수만큼 curried 함수를 호출해야 한다는 사실을 확인할 수 있다.


## curry와 partial application

partial application와 curry의 차이점은 대략 파악이 되었다. 하지만 함수를 재사용하겠다는 목적은 같고 구현과 사용 방식에만 차이가 있는 것 같은데, curry는 어디에 사용하면 좋을까?

partial application은 함수에서 복수의 인자를 한번에 고정시켜두고 싶을 때 사용하면 유용하다. 하지만 함수 조합(function composition)에 적용하려면 이야기가 달라진다. 왜냐하면 partial application이 반환하는 함수는 요구하는 인자의 수가 서로 다를 수 있기 때문이다. 다음과 같이 3개의 함수를 조합한다고 생각해보자.

```javascript
c = f(g(h));
```

함수를 조합하는 경우 모두 1개의 인자를 요구한다. 하지만 만약 조합하려는 함수에 정의된 인자의 수가 1개가 아니라면? curry를 이용해 1개의 인자만 전달받아도 되는 함수로 만든 후 조합하면 될 것이다.

이렇듯 curry는 일관성을 제공하기 때문에 함수 조합 같은 경우에 유용하게 사용될 수 있는데, 이는 마치 Promise에서 resolve, reject 함수를 1개의 인자로만 호출하는 것과 유사하다. resolve 함수가 1개의 값만 전달한다는 것을 알기에 어떤 함수가 Promise를 리턴한다면 사용자는 then 콜백 함수에서 하나의 인자만 전달받는 일관적인 방식으로 함수를 작성할 수 있는 것이다.

---

partial application, curry를 직접 구현해서 사용해도 무방하지만 역시 [Ramda](http://ramdajs.com/), [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)같은 라이브러리를 사용하는 편이 함수형 프로그래밍을 더 즐거워지게 할 수 있다. 특히 Ramda는 lodash만큼 양적으로 다양하지는 않지만, 데이터 조작에 필수적인 함수를 대부분 제공하며 특히 자동으로 curry가 이루어지기에 함수 재사용과 조합을 더 쉽게 할 수 있다.

## 참고

- [Functional-Light JavaScript Chapter 3: Managing Function Inputs](https://github.com/getify/Functional-Light-JS/blob/master/ch3.md)
- [Curry or Partial Application?](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
- [Ramda](http://ramdajs.com/)

