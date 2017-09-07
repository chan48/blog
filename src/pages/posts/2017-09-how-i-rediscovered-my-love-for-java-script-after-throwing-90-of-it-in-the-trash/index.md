---
title: "내가 어떻게 자바스크립트의 90%를 쓰레기통에 버린 후 자바스크립트에 대한 애정을 다시 확인했는지에 대하여"
description: "함수형 자바스크립트를 사용하면 OOP 자바스크립트가 만드는 문제들에서 벗어날 수 있다. 객체지향은 자바스크립트에 맞지 않는 옷이다. 함수형 자바스크립트는 학습에 시간이 걸리지만 그럴만한 가치가 충분하다."
date: "2017-09-08"
layout: post
mainImage: "/images/post-main/2017-09-how-i-rediscovered-my-love-for-java-script-after-throwing-90-of-it-in-the-trash/trashbin.png"
tags:
  - Javascript
  - 함수형 프로그래밍
  - 번역
draft: false
---

이 글은 [Joel Thoms](https://hackernoon.com/@joelthoms?source=post_header_lockup)의 [How I rediscovered my love for JavaScript after throwing 90% of it in the trash](https://hackernoon.com/how-i-rediscovered-my-love-for-javascript-after-throwing-90-of-it-in-the-trash-f1baed075d1b)를 번역한 글입니다.

---

## 나와 자바스크립트의 관계

자바스크립트와 함께하는 여행의 시작은 1997년의 Netscape Navigator 3가 있던 시절로 거슬러 올라간다. 그 시절에는 자바스크립트로 별다른 일을 할 수 없었다. **자바스크립트로 할 수 있는 가장 멋진 일은 마우스 오버 효과를 만드는 것이었다**. 그 시절에는 그게 제법 고급 기술이었다. 단순히 마우스 포인터틑 가져다 대는 것만으로 페이지의 콘텐츠를 바꾼다는 것, 정말로 멋진 효과였다. 그리고 DHTML이 등장하기 전이었기에 DOM 요소를 숨기고 보여주는 일도 불가능했다. 당시 그것은 여전히 마법같은 일이었다.

그 시절에 자바스크립트의 성장은 매우 느렸고 주로 입력 양식(form) 유효성 검사에 주로 사용되고 있었다. 자바스크립트에 향한 관심이나 발전은 지금처럼 많지 않았다. 그저 있으면 좋은 부가적인 요소였다. 자바스크립트는 개발에 있어 주요 고려 대상이 결코 아니었고 애플리케이션이 자바스크립트 없이도 확실히 동작할 수 있도록 보장해야 했었다.

그런 후에 프레임워크들이 대거 등장했다. jQuery, Knockout, Angular, React, Vue, 기타 등등. 처음에는 그들에 대한 반응이 그저 그랬었다. 하지만 이제 우리는 매일매일 새로운 프레임워크를 만나는 중이다.

또한 **자바스크립트 자체의 진화 속도도 점점 빨라지고 있다**. 우리는 이제 ES6를 앞으로도 계속 사용할 수 있고 사람들은 관심사는 ES7애서 이미 ES8으로 넘어간 상태다!

그리고 TypeScript, CoffeeScript, ClojureScript, ELM 처럼 자바스크립트의 무한한 대안을 가지고 있다.

이들의 발전 속도는 너무나 빠르고 압도적이라 모든 것을 따라잡기는 불가능하다.

## 잘못된 길

자바스크립트가 처음 성숙해지기 시작했을 때 객체 지향 프로그래밍(OOP)이 자바스크립트 안으로 슬며시 비집고 들어왔다.... 그리고 나는 그걸 무척 좋아했다.

나는 가능한 모든 방법으로 클래스를 만들며 자바스크립트를 갖고 놀기 시작했다. 그리고 마침내 적절한 방법의 상속을 할 수 있었다. 나는 생각했다. 자바스크립트는 마침내 *진정한* 언어가 되었다고 말이다.

> **자바스크립트에 OOP를 사용하는 것이 끔찍한 실수라는 사실을 깨닫기까지 그리 오랜 시간이 걸리지 않았다.**

내가 **C#을 통해 알게 된 것들을 자바스크립트에도 강제하려 했고** 처음에는 그것이 무척 괜찮아 보였다. 하지만 그로 인한 복잡도는 정신이 혼미해질 정도였다.

왜냐하면, 자바스크립트의 프로토타입 상속은 C#처럼 작동하지 않기 때문이다. 나는 매일매일 `console.log(this)`를 쓰고 있는 나 자신을 발견할 수 있었다. *나는 누구, 지금 여기는 어디인가?* 객체지향 자바스크립트로 프로그래밍을 하면서 모든 것을 정확히 하지 않는다면 악몽 같은 일이 벌어진다. Private 메소드와 밸류에는 접두어로 밑줄(_)이 들어가거나 더 심한 경우 클로져 안에 래핑되어야 했다.

객체지향 자바스크립트는 OOP의 모든 문제를 가져왔을 뿐만 아니라 그 위에 새로운 문제를 추가해버렸다.

## 그리고 나는 함수형 프로그래밍을 발견했다

**처음에는 알지 못했다.**. 코드를 읽을 수 있고 이해할 수는 있지만 *왜* 그래야 하는지는 알 수 없었다. 결국, 나는 함수형 프로그래밍을 배우도록 나 자신을 강제했다. EDX에서 무료로 [Introduction to Functional Programming course](https://www.edx.org/course/introduction-functional-programming-delftx-fp101x-0)를 등록하고 강의에서 배운 기술을 자바스크립트에 접목하려 시도했다.

> 함수형 프로그래밍은 나에게 새로운 관점을 제시했다. 그것은 프로그래밍을 무척 다른 방식으로 접근하도록 만들어 주었다.

*처음에는* 제법 이상해 보여서 익숙해지기까지 시간이 좀 걸렸다. 모든 것은 거꾸로 돌아갔고, 불변(immutable)이었고, 이질적이었다.

천천히, 코드를 함수형 방식으로 풀어내려 시도했다. 익숙하지 않았기 때문에 시간이 더 걸렸고 더 많은 학습이 필요했다. 하지만 결국 조금씩 파악이 되었고 익숙해지기 시작했다. 그리고 마침내 *왜* 그렇게 해야 하는지 알 수 있었다.

나의 코드는 단순해졌고 재사용이 가능해졌다. 일반적인 언어의 특징이 내 코드에서 천천히 사라지기 시작했다. 내 코드는 완전히 다른 언어처럼 보였다. 내가 작성하고 있는 코드가 여전히 자바스크립트인가?

## 더 이상의 'var'는 없다

나의 모든 `'var'`는 `const`로 대체되었다. 내 코드가 **불변성**(immutable)을 가지고 함수가 **순수**(pure)해 졌을 때 `var`는 마침내 완전히 사라졌다.

내 코드에서 `var`는 물론이고 `let`이 모두 `const`로 바뀐 모습을 보며 놀라워하던 순간이 떠오른다. 함수형 프로그래밍에 대한 흥미가 깊어지기 시작했었다.

## 'for' 루프

`for` 루프는 가장 먼저 해결해야 할 것 중의 하나였다. 코드에서 `for` 루프를 `map`, `filter`, 그리고 `reduce`로 대체하기 시작했다. 루프 중에서 특별한 동작이 필요한 것은 재귀를 사용하거나 [lazy.js](http://danieltao.com/lazy.js/)를 사용했다. `break` 키워드는 어떻게 하냐고 중얼거리기 전에 [이 글](https://hackernoon.com/rethinking-javascript-break-is-the-goto-of-loops-51b27b1c85f8)을 읽어보길 바란다.

> [Rethinking JavaScript: Death of the For Loop](https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8)

`for` 루프는 이제 나의 코드 베이스에서 완전히 사라졌다. 만약 찾았다면 내가 없애버릴 수 있게 꼭 알려주길 바란다.

## 'if' 문

`if` 문은 해결해야 할 다음 과제다. 나는 if~else 블럭 안에서 중첩되는 거대한 코드 블럭을 작성하는 일을 그만두었다.(이 또한 OOP에서는 권장되는 방식이다) 로직은 함수로 추출되었고 `if`를 간단한 `삼항` 연산자로 전환할 수 있었다.

> [Rethinking JavaScript: The if statement](https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb)

이제 내 코드에서 `if`를 찾는 일은 거의 불가능해졌다. 앞으로 다른 프로그래머들의들 가독성을 위해서 거의 사용하지 않을 것이다.

## 삼가 'switch'에게 조의를

`if`와 `for`는 사라졌으니 다음 목표는 `switch` 문이다. 자주 사용되지는 않지만 나는 함수형 대안을 사용하고 싶었다.

> [Rethinking JavaScript: Eliminate the switch statement for better code](https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d)

나는 `switch`를 대체할 수 있는 Ramda의 [cond 연산자](http://ramdajs.com/docs/#cond)를 정말로 좋아한다.

## 더 이상의 'this'는 없다

그렇다. 제대로 읽은 것이 맞다! `this`는 완전히 사라졌다. 만약 지금까지 내 생각에 동의하지 못했더라도 이제는 나와 함께해야 한다.

> 함수형 자바스크립트는 애플리케이션을 `this` 없이 작성할 수 있도록 해준다.

이제 데이터와 함수만이 남았고 우리에게 `this`는 완전히 필요없어졌다. 나는 객체를 변경 가능한(mutable) 상태에 함수가 합쳐진 것으로 생각하기 시작했다. 나는 변경 가능한 상태도 필요하지 않으며 객체에 붙어있는 함수도 필요하지 않다. 그래서 나는 그 둘을 떼어내 버렸다.

> [Functional JavaScript: Decoupling methods from their objects](https://hackernoon.com/functional-javascript-decoupling-methods-from-their-objects-aa3ca13d7ae8)

## 객체지향 디자인은 필요하지 않다

되돌아 보면, 나는 OOP가 필요하지 않은 복잡도를 추가한다는 사실을 알게 되었다. 변경 가능한 상태 없이 동일한 작업을 실행할 수 있다는 사실을 알 수 있었다.

더 이상 무거운 객체를 전달할 필요가 없기 때문에 코드는 한결 가벼워진 느낌이 들었다. 코드에는 단지 데이터와 함수만 있을 뿐이다. 그 함수들은 객체에 묶여있지 않기 때문에 이제 예전보다 재사용성이 높아졌다.

나는 이제 자바스크립트가 제대로 지원하지 않는 전통적인 상속이 가져다주는 문제에 대해 더는 걱정할 필요가 없다.

자바스크립트가 private, public, internal, 또는 protected 같은 접근 제한 수식어를 제대로 지원하지 않는다는 것은 더 이상 문제가 되지 않았다. 접근 제한 수식어라는 것은 OOP가 만들어내는 문제를 해결하기 위해 만들어졌다. 그 문제들은 함수형 자바스크립트에서는 더 이상 존재하지 않는다.

## 요약

내 코드는 이제 완전히 다르게 보인다. 많은 **순수 함수**(pure functions)들의 모임이 있고 그것들은 **ES6 모듈**로 조직화된다. 나는 이 함수들을 조합해서 더 복잡한 함수를 만든다. 대부분의 함수는 **값을 즉시 반환하는 한줄로 된 람다 표현식**으로 되어 있다.

이제 나는 소프트웨어의 입력을 데이터의 스트림으로 간주하며 그 스트림들에 반응적으로(reactively) 프로그래밍한다.

함수형 프로그래밍에 대한 이해는 일반적인 문제를 해결할 수 있는 더 많은 선택지를 제공했다.

또한 나는 함수형 프로그래밍은 포괄적이기에 현재 진행중인 프로젝트에 충분히 사용하거나, 필요한 만큼만 적게 사용될 수도 있다는 사실을 배웠다. C#의 LINQ는 객체지향 언어에 함수형 디자인을 적용한 매우 훌륭한 사례다.

함수형 프로그래밍은 아름답다.

> [The beauty in Partial Application, Currying, and Function Composition.](https://hackernoon.com/the-beauty-in-partial-application-currying-and-function-composition-d885bdf0d574)