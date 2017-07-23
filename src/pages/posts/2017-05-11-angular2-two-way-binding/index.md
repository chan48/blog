---
title: "Angular 2의 양방향 연결(two-way binding) 구현"
description: "Angular 2에서 banana-in-box 표기법과 getter, setter를 이용해 양방향 바인딩을 어떻게 구현하지는 예제 코드와 함께 설명한다."
date: "2017-05-11"
layout: post
mainImage: "/images/post-main/2017-05-11-angular2-two-way-binding/karina-carvalho-94650.jpg"
tags:
  - Javascript
  - Angular 2
path: "/posts/2017-05-11-angular-2-two-way-binding"
draft: false
---

![CSS Modules](./karina-carvalho-94650.jpg)
*https://unsplash.com/@nickeedoo*

## one-way binding

Angular 2(Angular >= 2.x, 이하 Angular로 표기)는 React.js, Vue.js처럼 데이터의 흐름이 단방향(one-way binding)이다. 최근 대부분의 모던 자바스크립트 프레임워크들은 단방향 데이터 연결을 지향하고 있다. 그 이유는 앱 구조를 보다 명확하게 할 수 있고 확실한 명령을 통해서만 앱 상태를 변경하기에 사이드 이펙트 발생을 줄이고 컴포넌트간의 데이터 흐름을 직관적으로 만들어주기 때문이다.

## AngularJS의 two way binding

Angular 1(Angular > 1.x, 이하 AngularJS로 표기)에서 많은 인기를 얻었던 특징 중에는 `ng-model` 지시자(directive)를 이용한 양방향 데이터 연결(two-way binding)이 있다. UI에 연결된 데이터가 변경되면 앱의 상태가 자동으로 업데이트되는 기능이다. 예를 들면 input 태그의 value 속성에 변수를 할당한 후 사용자가 텍스트를 입력하면 onChange에 콜백 함수를 할당하지 않아도 자동으로 변수가 입력된 값으로 업데이트된다.

```html
// name 속성이 연결된 input에 텍스트를 입력하면 h1 태그 내부의 텍스트가 동시에 변경된다.
<div ng-app="myApp" ng-controller="myCtrl">
  Name: <input ng-model="name">
  <h1>You entered: {{name}}</h1>
</div>
```

앞서 Angular는 메이저 업데이트를 통해 데이터는 흐름이 단방향으로 바뀌었다고 했다. 그렇다면 자연스럽게 ng-model을 통한 양방향 데이터 연결은 컨셉에 맞지 않으니 제거했을 거라고 생각할 수도 있지만 그렇지 않다. 새로운 Angular에서도 여전히 ng-model 기능을 지원한다. 하지만 실제 구현을 살펴보면 양방향 데이터 연결이 아니라 단방향에 기반을 두고 있다는 사실을 확인할 수 있다.


## banana-in-box 표기법

Angular에서는 컴포넌트에 속성(property)과 이벤트(event)를 바인딩하는 문법을 구분해서 사용한다. 속성에는 대괄호, 이벤트에는 중괄호를 사용한다.

```html
<app-two-way-binded
  [data]="prop"
  (dataChange)="onDataChange($event)"
></app-two-way-binded>
```

그리고 Angular에서는 양방향 연결을 위한 특수한 표기법을 지원한다. banana-in-box라는 표기법으로 중괄호와 대괄호를 동시에 사용한다.

```html
<app-two-way-binded
  [(data)]="prop"
/></app-two-way-binded>
```

저 표기법을 사용하면 예전처럼 프레임워크가 양방향 연결을 구현해 주는 것일까? 그렇지 않다. 대신 Angular는 컴파일시 banana-in-box 표기법을 **속성 바인딩과 이벤트 바인딩으로 자동으로 분리**한다. 속성 바인딩은 할당된 이름을 그대로 사용하고 이벤트 바인딩에는 속성에 사용한 이름에 `Change`라는 접미사가 붙은 이름을 사용한다.

```html
<app-two-way-binded
  [data]="prop"
  (dataChange)="prop = $event"
/></app-two-way-binded>
```

`prop = $event`부분은 콜백 함수를 선언하지 않고 함수 본문을 직접 할당한 방식이다. `dataChange` 이벤트가 발생하면 부모 컴포넌트의 `prop` 속성에 `$event` 변수가 할당되어서 부모의 상태가 업데이트된다. 그런데 `$event`라는 변수는 어디서 온 것일까? 다음 코드를 살펴보자.


```js
@Component(
  selector: 'app-two-way-binded',
  template: `
    <div>
      <label>data: </label>
      <input [value]="data" />
      <button (click)="increase()">+</button>
    </div>
  `
)
export class TwoWayBinded {
  @Input() data: number;
  @Output() dataChange = new EventEmitter();

  increase() {
    this.data++;
    this.dataChange.emit(this.data);
  }
}
```

`TwoWayBinded`의 버튼을 클릭하면 `increase` 메소드가 실행된다. `increase` 메소드는 `data` 속성의 값을 변경한 후 EventEmiter인 `dataChange`의 `emit` 메소드를 실행해서 이벤트를 발생시킨다.
`emit` 메소드의 인자로 전달된 값이 바로 앞선 예제의 `(dataChange)="prop = $event"` 부분에 등장한 `$event`에 해당한다.

컴포넌트에서 버튼을 클릭하면 `data` 속성이 변경되고, 그 값은 다시 부모 컴포넌트로 전달된다. 이렇게 양방향 연결이 구현되었다.


## getter와 setter를 이용한 양방향 바인딩

앞서 살펴본 예제에서는 버튼을 클릭해야만 양방향 연결이 작동한다. AngularJS에서 사용했던 것처럼 따로 버튼을 클릭하지 않고도 input 값만 변경되어도 양방향 연결이 되도록 만들어보자. 이를 위해서는 [getter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get)와 [setter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set)를 사용해야 한다.

```js
@Component(
  selector: 'app-two-way-binded',
  template: `
    <div>
      <label>data: </label>
      <input [value]="data" />
    </div>
  `
)
export class TwoWayBinded {
  componentData: number; // 컴포넌트 속성

  @Input()
  get data {
    return this.componentData;
  }
  set data(v) {
    this.componentData = v;
    this.dataChange.emit(this.componentData);
  }

  @Output() dataChange = new EventEmitter();
}
```

핵심은 컴포넌트 로컬 속성을 따로 관리한다는 점이다.

`data` 속성은 Input 데코레이터가 적용되었기에 컴포넌트와 그 부모에서 모두 값을 참조하고 할당할 수 있다. 대신 단순 참조와 할당을 하지 않고 getter로 로컬 속성인 `componentData`를 반환하고, setter로는 `input`에 입력된 값을 로컬 속성(componentData)에 할당한 후 다시 그 값을 부모 컴포넌트로 올려보낸다.

setter에서 이벤트를 발생시키지 않으면 컴포넌트는 부모 컴포넌트로 변경된 값을 전달하지 않는다. UI에서 값이 변경되고 있지만 그것은 `TwoWayBinded`의 독립된 공간에서만 일어나는 일일 뿐이며 부모 컴포넌트와는 관계가 없게 된다.

이 예제를 통해 Angular는 단방향 데이터 흐름을 가지며, 직접 지시를 하지 않으면 데이터가 아래에서 위로 거슬러 올라가는 일은 발생하지 않는다는 사실을 확인할 수 있다.


## ngModel과 banana-in-box

banana-in-box 표기법에 ngModel이라는 이름을 사용하면 AngularJS에서 사용했던 것처럼 프레임워크가 자동으로 양방향 바인딩을 구현해준다. 하지만 `input`같은 HTML 폼 요소에서 사용가능하고 커스텀 컴포넌트에서는 앞서 제시한 getter, setter를 이용한 방법 등으로 사용자가 직접 구현해야 한다.

```js
@Component(
  selector: 'app-ngModel-sample',
  template: `
    <label for="search">
      search:
      <input [(ngModel)]="search" name="search"/>
    </label>
  `
)
export class NgModelSample {
  search: string;
}
```

## Syntactic sugar

Angular에서 양방향 바인딩은 [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)(문법을 사용하기 쉽게 표현한 형태)일 뿐이며 단방향으로 구현되어 있다. 프레임워크가 어려운 일을 대산해주면 사용하는 입장에서는 편하지만 표준에서는 멀어진다는 단점이 있다. React.js가 [컴포넌트 메소드 자동 바인딩을 제거한 사례](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding)도 그런 철학에 기반한 것으로 여겨진다. 좋은 도구를 사용하면서도 항상 원리에 접근하려는 자세를 가져야 하겠다.

## 참고자료

- [Angular Docs - Two way binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way)
- [TWO-WAY DATA BINDING IN ANGULAR](https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html)
