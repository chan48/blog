---
title: "Redux 아키텍쳐를 위한 10가지 팁"
description: "Redux 아키텍쳐를 위한 10가지 팁"
date: "2017-01-23"
layout: post
mainImage:
tags: "Redux, React, Javascript, Front-end, 번역"
path: "/posts/2017-01-23-10-Tips-for-Better-Redux-Architecture"
---

이 글은 [Eric Elliott](https://medium.com/@_ericelliott)의 [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44#.ffjkpicnd)를 번역한 글입니다.

---

처음 React를 사용하기 시작했을 때는 Redux가 없었다. Flux 아키텍쳐만 있었고 Flux의 여러 구현체들이 경쟁하고 있었다.

이제는 React의 데이터 관리 분야에 확실한 선두주자가 둘 있다. 바로 Redux와 MobX다. 심지어 후자는 Flux 구현체도 아니다. 그간 많은 관심을 받아온 Redux는 이제 React에만 사용되지 않는다. Angular 2를 포함한 많은 프레임워크를 위한 Redux 아키텍쳐 구현체들이 존재한다. 예를 들면 [ngrx:store](https://github.com/ngrx/store)가 있다.


> Side note: MobX는 멋지며 나는 이미 간단한 UI에는 Redux 대신 사용하고 있다. 왜냐하면 덜 복잡하고 더 깔끔하기 때문이다. 바꿔 말하면 Redux는 MobX가 제공하지 않는 몇몇 중요한 기능이 있다는 말이다. 프로젝트에 사용할 라이브러리를 선택하기 전에 그 차이점이 무엇인지 이해하는 것이 중요하다.

> Side note: [Relay](https://facebook.github.io/relay/)와 [Falcor](https://netflix.github.io/falcor/)는 흥미로운 상태 관리 솔루션이다. 하지만 Redux와 MobX와는 달리 두 솔루션은 각각 GraphQL과 Falcor Server가 뒷받침해야 사용할 수 있다. 그리고 모든 Relay 상태는 서버상에 유지되고 있는 데이터와 연결되어 있다. 내가 아는 한 둘 다 클라이언트 기반의 일시적인 상태 관리를 위한 좋은 시나리오를 제공하지는 않는다. 서버에 유지되는 상태와 클라이언트의 상태를 구분지으며 Relay와 Falcor를 Redux와 Mobx와 조합해서 양쪽의 장점을 모두 취할 수는 있다. 결론: 현재 시점에서 클라이언트 상태(state) 관리 영역에는 확실한 승자가 없다. 그저 하는 각각의 작업에 맞는 도구를 선택해야 한다.

Redux를 만든 Dan Abramov는 주제와 관련된 좋은 강의를 만들어 두었다.

- [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
- [Building Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

둘다 Redux의 기초를 알려주는 무척 훌륭한 단계별 자습서지만 Redux를 최대한 활용하려면 더 깊은 이해가 필요하다.

다음은 당신이 더 나은 Redux 앱을 만드는데 도움을 줄 팁들이다.

## 1. Redux의 장점을 이해하라

1. 결정적인(deterministic) 뷰 렌더
2. 결정적인 상태 재생산

결정론(determinism)은 어플리케이션 테스트와 진단, 버그 픽스에 중요하다. 만약 당신의 앱이 비결정적이라면 뷰와 상태가 언제나 유효한 값을 가진다고 장담할 수 없다. 비결정적인 상태 자체가 버그라고도 말할 수 있다.

하지만 어떤 것들은 본질적으로 비결정적이다. 유저의 입력 타이밍 또는 네트워크 입출력이 그렇다. 그렇다면 코드가 정말로 작동하는지 어떻게 알 수 있을까? 답은 간단하다. 분리시키는 것이다.

Redux의 주 목적은 뷰의 렌더링 과정이나 네트워크 입출력과 같은 사이드 이펙트로부터 상태 관리를 독립시키는 것이다. 사이드 이펙트가 분리된다면 코드는 훨씬 간결해진다. 또 훨씬 이해하기 쉽고 DOM 업데이트와 네트워크 요청과 분리된 상태의 비즈니스 로직을 테스트하기도 쉬워진다.

뷰 렌더링이 네트워크 입출력과 상태 업데이트와 분리되면 결정적인 뷰 렌더링이 된다. 이는 같은 상태값이 주어졌을 때 언제나 같은 결과값이 표시된다는 말이다. 그리고 렌더링 과정에서 불규칙적으로 상태값을 없애버리거나 조작해버리는 비동기적인 작업들의 경쟁에서 오는 사이드 이펙트의 발생 가능성도 제거한다.

경험이 적은 사람은 뷰를 생성하는 일에 대해 보통 이렇게 생각한다. "이건 유저 모델이 필요할 것 같으니 우선 데이터를 가져올 비동기 요청을 하고, 프라미스(promise)가 해결(resolve)되면 모델에서 이름을 가져와서 유저 컴포넌트의 이름을 업데이트해야지. 그 위에는 할일 목록이 필요하니까 데이터를 요청하고(fetch) 프라미스가 해결되면 반복문을 이용해서 뷰에다 그려야겠다."

이러한 접근 방식에는 주요한 문제점이 몇 가지 있다.

1. 어떤 시점에도 완전한 뷰를 렌더링하기 위한 모든 데이터를 가지고 있지 못하다. 컴포넌트가 관련 작업을 하기 전까지는 데이터 요청을 실제로 시작하지 않는다.
2. 서로 다른 데이터 요청 작업은 서로 다른 시점에 끝나며 뷰 렌더링 과정에서 일어나는 일의 순서를 미묘하게 바꿔버린다. 렌더 순서를 정확히 이해하기 위해서는 예상할 수 없는 것들에 대한 지식을 가지고 있어야 한다. 돌발 질문: 위의 시나리오에서 무엇이 먼저 렌더링될까? 할일 목록? 서로 순서를 경쟁하기 때문에 알 수 없다.
3. 때로는 이벤트 리스너가 뷰를 변경한다.

> "비결정론 = 병렬 프로세스 + 상태 공유"
> ~ Martin Odersky(Scala designer)

> 데이터 요청과 데이터 조작, 그리고 뷰 렌더링을 연결하는 것은 시간여행 스파게티 코드를 만드는 레시피다.

저 말이 B급 공상과학 영화처럼 들릴 수 있다는 것을 안다. 하지만 날 믿어보기 바란다. 시간여행 스파게티 코드는 프로그래밍에서 최악의 취미다.

Flux 아키텍쳐는 다음과 같은 규칙들을 따름으로서 엄격한 분리와 작업 순서를 강제한다.

1. 먼저 고정된 상태(state)으로 시작한다.
2. 뷰를 렌더링한다. 이 렌더링 루프에서는 어떤 것도 상태를 변경할 수 없다.
3. 동일한 상태가 주어지면 뷰는 언제나 같은 결과를 렌더링한다.
4. 이벤트 리스너는 유저의 입력과 네트워크 요청을 처리하기 위해 대기한다. 이벤트 리스너가 관련 요청을 감지했을 때 액션(action)이 저장소(store)로 발송(dispatch)된다.
5. 액션이 발송되고 나면 상태는 새로운 상태로 업데이트되고 렌더링 과정이 반복된다. 오직 발송된 액션만이 상태에 영향을 줄 수 있다.

이상이 UI를 위한 단방향 아키텍쳐인 Flux에 대한 단순한 설명이다.

<figure class="">
<img src="https://cdn-images-1.medium.com/max/1600/1*2FrT8oMXswVWiVEfBCXlAQ.png">
<figcaption>Flux 아키텍쳐</figcaption>
</figure>

Flux 아키텍쳐와 함께 뷰는 유저 입력을 듣고, 그것들을 액션 객체로 변환하고, 그 객체들은 저장소로 전송된다. 저장소는 어플리케이션의 상태를 업데이트하고 뷰에게는 다시 렌더링하라고 알려준다. 물론 뷰는 입력과 이벤트의 유일한 소스인 경우는 거의 없지만 문제될 것은 없다.  아래와 같이 추가적인 이벤트 리스너가 액션 객체를 발송한다.

<figure class="">
<img src="https://cdn-images-1.medium.com/max/1600/1*MdaK2tzd5f9BqadwMvPoKg.png">
</figure>

중요한 사실은 Flux의 상태 업데이트는 트랜잭션(transaction)이라는 점이다. 상태가 가지고 있는 업데이트 메소드를 단순 호출하거나 직접 수정하는 대신 액션 객체가 저장소로 발송된다. 액션 객체는 트랜잭션의 기록이다. 적용되어야 할 사항이 기록된 은행 거래 내역에 비유해서 생각해 볼 수 있다. 예를 들어 은행에 입금을 한 경우 입금 전의 잔액이 지워지지는 않는다. 대신 변경된 잔액이 기존의 거래 내역에 추가되는 식이다. 액션 객체는 어플리케이션의 상태에 트랜잭션 내역이 추가된다.

엑션 객체는 아래와 같은 형태를 가진다.

```javascript
{
  type: ADD_TODO,
  payload: 'Learn Redux'
}
```

액션 객체는 상태 처리에 관한 모든 실행 로그를 유지할 수 있게 한다. 그 로그는 결정적인(deterministic) 방법으로 상태를 재생산할 수 있다. 이는 동일한 초기 상태와 같은 트랜잭션이 같은 순서대로 주어지면 언제나 같은 상태를 결과로 가진다는 의미다.

이것은 중요한 사실을 내포한다.

1. 쉬운 테스트
2. 쉬운 번복/재실행
3. 시간 여행 디버깅
4. 유지성 - 상태값이 사라져버려도 모든 트랜잭션의 기록을 가지고 있다면 다시 만들어낼 수 있다.

공간과 시간을 지배하고 싶지 않은 사람이 있겠는가? 트랜잭션을 기반으로 한 상태는 당신에게 시간을 지배할 수 있는 강력한 힘을 부여한다.

<figure>
    <img src="https://cdn-images-1.medium.com/max/1600/1*KFJdTQCHH60QDDWTJobVRw.gif" alt="">
    <figcaption>Redux dev tools history slider view</figcaption>
</figure>

## 2. Redux가 필요하지 않은 앱도 있다.

UI 워크플로우가 단순하면 Redux를 사용하는 것은 너무 과한 일이 될 수 있다. 만약 당신이 틱택토(tic-tac-toe) 게임을 만든다면 정말로 복구/재현이 필요할까? 게임이 몇 분 이상 유지될 일은 거의 없고 유저가 게임을 망친다면 그냥 초기화하고 새로 시작하게 하면 된다.

만약:
- 유저 워크플로우가 단순하다면
- 유저 간의 공동 작업이 없다면
- 서버 사이드 이벤트(SSE)나 웹 소켓을 관리할 필요가 없다면
- 하나의 페이지가 하나의 소스에서 데이터를 가져온다면

앱의 이벤트 흐름은 충분히 단순할 것이며 트랜잭션 기반의 상태 관리를 적용하기 위한 노력 대비 얻는 이점은 없을 것이다.

만약 앱에 Flux를 적용하고 싶지 않다면 Flux같은 역할을 하는 더 간단한 솔루션이 있다. [MobX](https://github.com/mobxjs/mobx)를 확인해보길 바란다.

하지만 앱의 복잡도가 증가할수록, 뷰의 상태 관리의 복잡도가 증가할수록, 트랜잭션 기반의 상태는 가치가 상승한다. MobX는 트랙잭션 상태 관리를제공하지 않는다.

만약:
- 워크플로우가 복잡하다면
- 앱이 다양한 유저 행동 흐름을 가진다면(일반 유저와 어드민이 동시에 사용한다고 가정)
- 유저 간에 공동 작업이 가능하다면
- 웹 소켓이나 SSE를 사용한다면
- 하나의 뷰에서 복수의 API를 이용해 데이터를 가져온다면

트랜잭션 상태 관리에 시간을 들인 만큼 이득을 볼 수 있을 것이다. Redux가 당신의 앱에 딱 좋을 수 있다.

웹 소켓과 SSE는 Redux는 무슨 관련이 있는가? 불확정한 상태 관리에서는 비동기 I/O 기반의 소스를 추가할수록 앱에게 대체 무슨 일이 일어나고 있는지 이해하기 힘들어진다. 결정적인 상태와 상태 트랜잭션 기록은 근본적으로 저런 문제를 단순화시킨다.

개인적인 의견으로는 대부분의 대규모 SaaS 제품에는 적어도 몇 가지 복잡한 UI가 포함되어 있고 트랜잭션 상태 관리를 사용해야 한다고 생각한다. 대부분의 작은 유틸리티 앱이나 프로토타입은 사용해서는 안된다. 작업에 맞는 도구를 사용해야 한다.

## 3. Reducer 이해하기

> Redux = Flux + Functional Programming

Flux는 액션 객체를 이용해 단반향 데이터 흐름과 트랜잭션 상태를 규정한다. 하지만 액션 객체를 어떻게 처리해야 할지는 언급하지 않았다. 그래서 Redux가 등장했다.

Redux 상태 관리의 주요 구성 요소는 리듀서(reducer) 함수다. 리듀서 함수란 무엇인가?

함수형 프로그래밍에서는 일반적으로 `reduce()`나 `fold()` 유틸리티 함수는 리스트에 포함된 각각의 값에 리듀서 함수를 적용해서 하나의 누적된 값을 만들어내는 데 사용한다. 아래는 자바스크립트 배열에 `Array.prototype.reduce()` 메소드를 이용해서 합계를 계산하는 리듀서의 예제다.

```javascript
const initialState = 0;
const reducer = (state = initialState, data) => state + data;
const total = [0, 1, 2, 3].reduce(reducer);
console.log(total); // 6
```

Redux는 리듀서를 배열에 적용하는 대신 액션 객체의 스트림에 적용한다. 액션 객체는 아래와 같은 형태임을 기억하자.

```javascript
{
  type: ADD_TODO,
  payload: 'Learn Redux'
}
```

합계를 계산하는 리듀서를 Redux 스타일의 리듀서로 바꿔보자.

```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD': return state + action.payload;
    default: return state;
  }
};
```

이제 테스트 액션을 적용할 수 있다.

```javascript
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3
```

## 4. 리듀서는 순수(pure) 함수여야 한다

결정적인 상태 재생산을 위해서는 리듀서는 반드시 순수 함수여야 한다. 예외는 없다. 순수 함수란:

1. 동일한 입력이 주어지면 언제나 동일한 출력을 반환한다.
2. 사이드 이펙트가 없다.

자바스크립트에서 중요한 사실은 원시 값이 아닌(non-primitive) 모든 객체는 함수에 참조로서 전달된다는 사실이다. 달리 말하자면 함수에 객체를 전달하고 그 객체의 속성을 직접 수정하면 함수 외부의 값도 함께 변경된다는 의미다. 이것이 사이드 이펙트다. 함수에 전달하는 객체가 어디에서 왔는지 완전히 알지 못한다면 그 함수의 호출이 무엇을 의미하는지 결코 알 수 없다. 그러면 안된다.

리듀서는 반드시 새로운 객체를 반환해야 한다. 예를 들면 `Object.assign({}, state, { 변경사항 })`으로 이를 구현할 수 있다.

배열 인자 또한 참조값이다. 리듀서 내부에서 배열에 `.push()` 메소드를 이용해서 새로운 아이템을 추가해서는 안된다. 마찬가지로 `.pop()`, `.shift()`, `.reverse()`, `.unshift()`, `.shift()` 를 비롯한 [변경(mutator) 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Mutator_methods)를 사용해서는 안된다.

배열을 안전하게 처리하고 싶다면 상태를 처리할 때 `.push()`, `.concat()` 같은 메소드 대신 안전한 [accessor 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Accessor_methods)를 사용하도록 제한해야 한다.

아래의 예제에서 `ADD_CHAT` 케이스를 살펴보자.

```javascript
const ADD_CHAT = 'CHAT::ADD_CHAT';

const defaultState = {
  chatLog: [],
  currentChat: {
    id: 0,
    msg: '',
    user: 'Anonymous',
    timeStamp: 1472322852680
  }
};

const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    default: return state;
  }
};
```

새로운 객체가 `Object.assign()` 으로 생성되었고 `.push()` 대신 `.concat()`을 이용해서 배열에 아이템을 추가했음을 확인할 수 있다.

개인적으로는 상태값이 우발적으로 변경되길 바라지 않는다. 그래서 나는 [immutable data API](https://facebook.github.io/immutable-js/)와 Redux를 함께 사용하는 방법을 연구해왔다. 만약 상태가 불변(immutable) 객체라면 그것이 우발적으로 변경되었는지 확인하기 위해 코드를 살펴볼 필요도 없어진다. 나는 팀원들과 일하면서 의도치 않게 변경된 상태로 인해 발생한 버그를 발견한 후 이런 결론이 이르게 되엇다.

순수 함수에 대해서는 이보다 더 많은 내용이 있다. 만약 Redux를 배포용 어플리케이션에 사용할 계획이 있다면 순수 함수에 대해 확실히 파악해야 한다. 그리고 그와 함께 그리고 시간 다루기, 로그 기록, 난수 등도 알아둬야 한다. 더 자세한 사항은 ["Master the JavaScript Interview: What is a Pure Function?"](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.26ljw27tp)을 살펴보기 바란다.


## 5. 기억하라: 리듀서는 반드시 신뢰할 수 있는 단일 출처야야 한다

앱의 모든 상태는 신뢰할수 있는 단일 출처(single source of truth)를 가져야 한다. 이 말은 상태는 한곳에만 저장되어 있다는 의미다. 그리고 상태 값이 필요한 모든 곳에서는 이 단일 출처를 참조해서 상태에 접근해야 한다.

서로 다른 요소에 각각의 출처가 있는 것은 괜찮다. 예를 들어 URL은 유저의 요청 경로와 파라메터에 대해 단일 신뢰 출처가 될 수 있다. 앱은 API URL을 단일 신뢰 출처로 가지는 서비스 설정 기능을 가질 수 있다. 하지만...

어떤 상태라도 Redux 저장소에 저장할 경우, 어떤 접근이라도 Redux를 통해 이루어져야 한다. 이 원칙에 충실하지 않는다면 Flux와 Redux가 해결하려고 했던 문제점인 Redux 저장소의 상태가 망가져버리는 일이나 의도치 못한 상태 조작으로 인한 버그가 발생할 수 있다.

달리 말하자면 신뢰할 수 있는 단일 출처가 없다면 Redux를 사용하든 안하든 아래와 같은 것들을 잃어버리게 된다.

- 결졍적인 뷰 렌더링
- 결정적인 상태 재생산
- 쉬운 복구/재현
- 시간 여행 디버깅
- 테스트 용이성


## 6. 액션 타입에 상수를 사용하라

나는 리듀서에 전달된 액션의 히스토리를 살펴봤을 때 가능하면 추적하기 쉽게 하려고 한다. 만약 모든 액션이 `CHANGE_MESSAGE`같은 짧고 일반적인 이름을 가진다면 앱에서 어떤 일이 일어나고 있는지 파악하기 어렵다. 하지만 `CHAT::CHANGE_MESSAGE`처럼 보다 구체적인 이름을 사용한다면 앱의 상태를 더 명확하게 파악할 수 있다.

또 정의되지 않은(`undefined`) 타입의 액션을 발송한다면 앱은 에러를 발생시킬 것이다. 만약 상수를 사용하지 않고 잘못된 문자열을 직접 입력한다면 그 액션은 조용히 잘못된 결과를 발생시킬 것이다.

리듀서에 사용할 모든 액션의 타입을 한곳에 모아서 유지할 때 얻게되는 장점은 다음과 같다.

- 일관적인 이름을 사용하게 된다
- 리듀서 API를 빠르게 이해할 수 있다
- 풀 리퀘스트(pull request)에서 무엇이 변경되었는지 확인하라


## 7. 발송을 호출하는 쪽에서 액션의 로직을 분리하기 위해 액션 생성자를 사용하라

내가 리듀서 내부에서는 ID를 생성하거나 현재 시간을 파악할 수 없다고 말하면 사람들은 나를 이상하게 바라본다. 만약 당신도 화면을 의심스럽게 바라보고 있다면 안심해도 된다. 당신만 그런 것이 아니니까.

그렇다면 액션이 필요한 모든 곳에서 순수하지 못한(impure) 로직을 중복 작성하는 일을 피하기 위해서는 어떻게 해야 하는가? 답은 액션 생성자(action creator)다.

액션 생성자는 아래와 같은 여러 이점을 가지고 있다.

- 액션을 발송하기 전에 입력값을 연산을 할 수 있다.
- 상용구(boilerplate)를 줄인다.

이제 `ADD_CHAT` 타입의 액션 객체를 액션 생성자를 이용해 만들어보자.

```javascript
// 액션 생성자는 순수하지 않을 수 있다.
export const addChat = ({
  // cuid는 random uuids/v4 GUIDs보다 안전하다.(usecuid.org 참조)
  id = cuid(),
  msg = '',
  user = 'Anonymous',
  timeStamp = Date.now()
} = {}) => ({
  type: ADD_CHAT,
  payload: { id, msg, user, timeStamp }
});
```

위의 코드에서 볼 수 있듯 [cuid](https://github.com/ericelliott/cuid)를 이용해서 각각의 채팅 액션별로 랜덤 아이디를 생성한다. 그리고 `Date.now()`를 이용해 타임스탬프를 생성한다. 둘다 리듀서 내부서는 실행하기에 안전하지 못한 순수하지 못한 연산들이다. 하지만 액션 생성자 내부에서는 사용해도 무방하다.

### 액션 생성자를 이용해 상용구를 줄이자

어떤 사람들은 액션 생성자를 사용하는 방법이 프로젝트에 상용구를 증가시킨다고 말한다. 그들의 의견과는 달리 내가 액션 생성자를 이용해서 리듀서 내부에서 상용구를 얼마나 줄이는지 확인해보라.

> 팁: 만약 상수, 리듀서, 액션 생성자를 모두 같은 파일에 저장하면 별도 위치에서 가져올 상용구가 줄어든다.

채팅 유저에게 사용자 이름과 신분을 조정할 수 있는 기능을 부여한다고 가정하자. 구현을 위해 몇개의 액션을 처리하기 위한 핸들러를 리듀서에 아래와 같이 추가할 수 있다.

```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};
```

리듀서 함수의 규모가 커지면 반복되는 상용구도 함께 늘어난다. 내가 만든 대부분의 리듀서는 위의 예제보다 훨씬 복잡했고 많은 중복 코드가 있었다. 단순한 속성 변경 액션을 하나로 모은다면 어떨까? 바꿔보자. 어렵지 않다.

```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });

    // 간단한 속성 변경 액션을 모두 모은다
    case CHANGE_STATUS:
    case CHANGE_USERNAME:
      return Object.assign({}, state, payload);

    default: return state;
  }
};
```

여분의 공간과 코멘트가 붙어도 수정한 버전이 더 짧고 `case`문도 2개로 줄었다.

### switch...case 문은 위험하지 않은가?

[어디선가](https://ericelliottjs.com/product/programming-javascript-applications-paper-ebook-bundle/) `switch` 문은 가능한 사용하지 않아야 한다는 글을 읽었을 수도 있다. 원하지 않게 에러가 발생할 수도 있고 switch문의 덩치가 커져버릴 수도 있다. 그리고 의도적인 fall-through(위의 코드처럼 복수의 케이스를 겹쳐서 사용하는 것)를 사용하지 말라는 얘기도 들었을 것이다. 왜냐하면 버그가 발생하면 찾기 어렵기 때문이다. 모두 좋은 조언이다. 하지만 방금 언급한 위험들에 대해서 좀 더 생각해보자.

- 리듀서는 조합이 가능(composable)하다. 그러므로 덩치가 커지는 것은 문제가 아니다. case문이 커지면 리듀서를 분리하면 된다.
- 모든 case의 본체는 `return`한다. 그러므로 의도치 않은 fall-through는 결코 발생하지 않는다.

Redux는 `switch...case`문을 잘 사용한다.공식적으로 이 건에 대해서는 나의 조언을 바꾸겠다. 위의 사례처럼 간단한 룰(switch 문을 목적에 맞게 작게 만들고 모든 case 몸통에서 return문을 사용하는 것)을 적용한다면 `switch`는 괜찮다.

그리고 이 버전이 다른 형태의 페이로드(payload)를 요구한다는 것을 알아챘을 것이다. 액션 생성자는 아래와 같은 형태를 가진다.

```javascript
export const changeStatus = (statusMessage = 'Online') => ({
  type: CHANGE_STATUS,
  payload: { statusMessage }
});

export const changeUserName = (userName = 'Anonymous') => ({
  type: CHANGE_USERNAME,
  payload: { userName }
});
```

코드에서 알 수 있듯이 이 액션 생성자들은 인자와 상태의 구조가 변경되었다. 하지만 그것이 전부는 아니다.


## 8. 서명 문서에 기본 매개변수(default parameter)를 사용하라

텍스트 에디터 플러그인으로 Tern.js(Sublime Text나 Atom에서도 사용 가능하다)를 사용하고 있다면 ES6 기본 매개변수를 통해 액션 생성자에 필요한 인터페이스를 파악해줄 것이다. 그리고 액션 생성자를 호출할 때 자동 완성이 가능하며 이는 개발자에게 인지 부하를 덜어준다. 왜내하면 액션 생성자에 필요한 페이로드 타입을 외우고 있을 필요가 없기 때문이다.

만약 Tern, TypeScript, Flow 같은 타입 인터페이스 플러그인을 사용하고 있지 않다면 꼭 사용하길 바란다.

노트: 나는 타입 주석(type annotation)보다는 함수 선언에 함께 작성된 기본 매개변수를 통해 파악하는 것을 더 선호한다. 그 이유는:

1. Flow나 TypeScript를 사용할 필요가 없다. 대신 표준 자바스크립트를 사용하면 된다.
2. TypeScript나 Flow를 사용하고 있다면 타입 주석은 기본 매개변수와 중복된다. TypeScript와 Flow 모두 기본 매개변수로부터 타입을 추론하기 때문이다.
3. 코드가 문법 잡음이 적을 때 더 가독성이 높다는 것을 알게 되었다.
4. 기본 설정을 얻게 된다. 이는 타입 에러에 의한 CI(continuos integration) 빌드 실패를 통해 확인하지 않아도 의도하지 않은 `undefined` 파라메터가 코드 안에 숨어있는 일이 결코 없게 된다는 의미다.


## 9. 연산이 추가된 상태와 분리(decoupling)을 위해 선택자(Selector)를 사용하라

역사상 가장 복잡한 채팅 앱을 만든다고 가정해보자. 50만줄 이상의 코드를 작성한 상태에서 기획 부서에서 새로운 기능을 요구했다. 그런데 그 기능은 지금껏 구현한 상태의 구조를 바꿔야만 구현이 가능한 상황이다.

당황할 필요는 없다. 기존 상태 구조와 앱의 나머지 부분들 사이의 결합도를 낮추기 위한 스마트한 방법인 선택자를 사용하면 된다.

내가 작성한 거의 대부분의 리듀서에서 나는 뷰를 만들기 위해 필요한 변수를 추출하기 위한 선택자를 추가로 작성했다. 간단한 채팅 리듀서는 어떻게 생겼을지 한번 살펴보자.

```JavaScript
export const getViewState = state => Object.assign({}, state);
```

너무 간단해서 gist로 저장할 가치조차 없다. 코드를 보고 어이가 없겠지만 잠깐, 상태에 약간의 연산을 추가하면 어떨까? 세션이 열려있는 동안 채팅에 참여한 모든 유저의 목록을 가져오는 것 같은? 이것을 `recentlyActiveUsers`라고 하자.

이 정보는 현재 상태에 이미 저장되어 있지만 가져오기는 쉽지 않다. `getViewState()`에서 이 값들을 가져오자.

```javascript
export const getViewState = state => Object.assign({}, state, {
  // return a list of users active during this session
  recentlyActiveUsers: [...new Set(state.chatLog.map(chat => chat.user))]
});
```

만약 연산된 상태를 모두 선택자를 통해 가져온다면:

1. 리듀서와 컴포넌트의 복잡도를 줄여준다.
2. 상태 구조와 앱 사이의 결합도를 낮춰준다.
3. 리듀서 내부에서조차 단일 출처 원칙을 따른다.


## 10. TDD 사용: 테스트를 먼저 작성하라

[많은](http://link.springer.com/article/10.1007%2Fs10664-008-9062-z) [연구](https://www.computer.org/csdl/mags/so/2007/03/s3024.pdf)들이 테스트를 먼저 하는 방법론과 테스트를 나중에 하는 방법론, 그리고 테스트를 전혀 하지 않는 방법론을 비교해 보았다. 결과는 명확하고 극명하다. 대부분의 연구가 구현 전에 테스트를 작성했을 경우 어플리케이션 배포시 40~80%의 버그가 감소했다는 결과를 내놓았다.

> TDD는 배포시 버그 비율은 절반 이상으로 줄일 수 있고 이 주장을 뒷받침할 수 있는 많은 증거들이 존재한다.

이 글에서 작성한 예제 코드를 작성할 때 나는 모두 유닛 테스트부터 시작했다.

부서지기 쉬운 테스트를 피하기 위해서 나는 기대값을 만들기 위한 팩토리 함수를 작성했다.

```javascript
const createChat = ({
  id = 0,
  msg = '',
  user = 'Anonymous',
  timeStamp = 1472322852680
} = {}) => ({
  id, msg, user, timeStamp
});

const createState = ({
  userName = 'Anonymous',
  chatLog = [],
  statusMessage = 'Online',
  currentChat = createChat()
} = {}) => ({
  userName, chatLog, statusMessage, currentChat
});
```

둘다 함수 모두 기본값을 제공하므로 테스트에서는 팩토리가 제공하는 기본 구조에다가 내가 필요한 속성을 덮어쓸 수 있다.

다음과 같이 사용한다.

```javascript
describe('chatReducer()', ({ test }) => {
  test('with no arguments', ({ same, end }) => {
    const msg = 'should return correct default state';

    const actual = reducer();
    const expected = createState();

    same(actual, expected, msg);
    end();
  });
});
```

노트: 나는 그 단순함 때문에 유닛 테스트에 [tape를 사용한다](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.711m3iv2m). 나는 물론 Mocha와 Jasmine도 2~3년간 사용해 본 경험이 있고, 기타 다양한 테스트 프레임워크도 사용해 보았다. 어떤 프레임워크를 사용하든 합당한 목적과 원칙을 가지고 선택해야 할 것이다.

위에서 작성한 테스트 코드의 스타일에 대해 간략히 설명하고자 한다. Jasmine과 Mocha를 사용해 온 경험이 있는 탓에 나는 바깥 블럭에서 테스트하고자 하는 컴포넌트를 설명하는 것으로 시작하는 편이다. 그리고 안쪽 블럭에서는 컴포넌트에 전달하는 것을 서술한다. 내부에서는 간단한 테스트 라이브러리의 `deepEqual()`이나 `toEqual()`등으로 실행할 수 있는 간단한 등가 가정문을 작성한다.

위에서 볼 수 있듯 나는 `beforeEach()`나 `afterEach()`같은 유틸리티 메소드 대신 독립된 테스트 상태값과 팩토리 함수를 사용했다. 왜냐하면 저 유틸리티 함수들로 인해 경험이 부족한 개발자들이 의도치 않게 상태값을 테스트 케이스마다 공유하게 되는 일을 피하기 위해서이다.

짐작했겠지만 나는 리듀서마다 서로 다른 3개의 테스트를 작성했다.

1. 리듀서를 직접 테스트: 방금 본 예제에 해당한다. 리듀서가 기대한 값을 반환하는지 확인하기 위해 필수적으로 필요하다.
2. 액션 생성자 테스트: 사전 정의된 상태값을 초기값으로 하여 액션을 리듀서에 적용하는 방식으로 액션 생성자를 테스트한다.
3. 선택자 테스트: 예상된 값을 가진 게산된 속성을 포함한 기대한 모든 값을 가지고 있는지 확인한다.

리듀서 테스트는 이미 확인했으니 다른 예제를 살펴보자.


### 액션 생성자 테스트

```javascript
describe('addChat()', ({ test }) => {
  test('with no arguments', ({ same, end}) => {
    const msg = 'should add default chat message';

    const actual = pipe(
      () => reducer(undefined, addChat()),
      // id, timestamp 속성은 반드시 존재해야 하지만 실제 값은 무엇이든 상관없다.
      state => {
        const chat = state.chatLog[0];
        chat.id = !!chat.id;
        chat.timeStamp = !!chat.timeStamp;
        return state;
      }
    )();

    const expected = Object.assign(createState(), {
      chatLog: [{
        id: true,
        user: 'Anonymous',
        msg: '',
        timeStamp: true
      }]
    });

    same(actual, expected, msg);
    end();
  });


  test('with all arguments', ({ same, end}) => {
    const msg = 'should add correct chat message';

    const actual = reducer(undefined, addChat({
      id: 1,
      user: '@JS_Cheerleader',
      msg: 'Yay!',
      timeStamp: 1472322852682
    }));
    const expected = Object.assign(createState(), {
      chatLog: [{
        id: 1,
        user: '@JS_Cheerleader',
        msg: 'Yay!',
        timeStamp: 1472322852682
      }]
    });

    same(actual, expected, msg);
    end();
  });
});
```

이 예제는 여러모로 흥미롭다. `addChat()` 액션 생성자는 순수(pure)하지 않다. 그 말은 함수 내부에서 조작될 값을 직접 전달하지 않는다면 그 함수가 만들어낼 기대값을 얻을 수 없다는 의미다. 이에 대응하기 위해, 우리는 `pipe`를 사용했다. 나는 때때로 `pipe`를 필요하지 않은 여분의 변수를 생성하는 데 사용한다. 나는 그것을 생성된 값을 무시할 때 사용한다. 존재한다는 것은 확실히 할 수 있지만 어떤 값을 가지는지는 알 필요가 없다. 내가 타입 체크조차 하지 않았던 것을 확인해보라. 그 값들의 처리는 타입 추론과 기본값의 역할에 맡긴다.

Pipe는 입력값을 일련의 함수들에 연속적으로 전달해주는 유틸리티 함수다. Pipe 내부에서 값을 전달받은 함수는 그 결과를 다음 함수의 입력으로 전달하고, 이 과정은 pipe 내부의 모든 함수들에 연속적으로 적용된다. 나는 `lodash/fp/pipe`로부터 lodash pipe 함수를 이용한다. 이는 lodash/flow의 별칭이기도 하다. 흥미롭게도 `pipe()` 함수 그 자체도 리듀서 함수로부터 만들어졌다.

```javascript
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!'

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!
```

나는 `pipe()` 함수를 상태 전환을 단순화시키기 위해 리듀서 파일에서 많이 사용한다. 모든 상태 전환은 궁극적으로 하나의 데이터 표현에서 다음으로 옮겨가는 데이터의 흐름이다. 그것을 구현하는데 `pipe()`가 무척 적합하다.

액션 생성자 또한 모든 기본값을 덮어쓰게 한다는 점을 기억하라. 그래서 우리는 특정 값의 테스트를 위해 특정한 아이디와 타임스탬프를 전달할 수 있는 것이다.


### 선택자(selector) 테스트

마지막으로 상태 선택자를 테스트하고 계산된 모든 값들이 기대한 값과 일치하는지 확인하자.

```javascript
describe('getViewState', ({ test }) => {
  test('with chats', ({ same, end }) => {
    const msg = 'should return the state needed to render';
    const chats = [
      createChat({
        id: 2,
        user: 'Bender',
        msg: 'Does Barry Manilow know you raid his wardrobe?',
        timeStamp: 451671300000
      }),
      createChat({
        id: 2,
        user: 'Andrew',
        msg: `Hey let's watch the mouth, huh?`,
        timeStamp: 451671480000 }),
      createChat({
        id: 1,
        user: 'Brian',
        msg: `We accept the fact that we had to sacrifice a whole Saturday in
              detention for whatever it was that we did wrong.`,
        timeStamp: 451692000000
      })
    ];

    const state = chats.map(addChat).reduce(reducer, reducer());

    const actual = getViewState(state);
    const expected = Object.assign(createState(), {
      chatLog: chats,
      recentlyActiveUsers: ['Bender', 'Andrew', 'Brian']
    });

    same(actual, expected, msg);
    end();
  });
});
```

이 테스트에서 우리는 `Array.prototyope.reduce()` 메소드를 `addChat()` 액션 생성자를 처리하기 위해서 사용했다. Redux 리듀서의 멋진 점은 그들은 그저 보통의 `reducer` 함수라는 사실이다. 이는 다른 리듀서 함수로 함 수 있는 모든 것들을 Redux 리듀서 함수에도 할 수 있다는 의미와 같다.

우리의 '기대된(expected)' 값은 모든 채팅 객체가 로그에 남아있는지, 최근에 활성화된 유저가 제대로 표시되어 있는지 확인한다.


## Redux 규칙

만약 당신이 Redux를 제대로 사용한다면 다음과 같은 장점을 취할 수 있다

- 시간차 때문에 발생하는 버그의 제거
- 결정적인 뷰 렌더링
- 결정적인 상태(state) 재생산
- 기능의 간편한 번복/재실행
- 디버깅 단순화
- 시간 여행자 되기

하지만 위의 것들이 가능하게 하려면 다음 규칙들을 따라야 한다.

- 리듀서는 반드시 순수한 함수여야 한다
- 리듀서는 반드시 앱 상태의 신뢰할 수 있는 단일 출처여야 한다
- 리듀서는 언제나 열거 가능(serializable)해야 한다
- 리듀서는 함수를 포함해서는 안된다

또한 다음을 명심하길 바란다.

- 어떤 앱은 Redux가 필요하지 않다
- 액션 타입에는 상수를 사용하라
- 액션 로직와 디스패치 호출자를 분리하기 위해 액션 생성자를 사용하라
- 자체 타입 기술을 위해 ES6 기본 파라메터를 활용하라
- 계산된 상태와 분리를 위해 셀렉터를 이용하라
- 항상 TDD 개발!

