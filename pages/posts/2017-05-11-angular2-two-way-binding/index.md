---
title: "Angular 2의 양방향 연결(two-way binding) 구현"
description: "Angular 2에서 banana-in-box 표기법과 getter, setter를 이용해 양방향 바인딩을 어떻게 구현하지는 예제 코드와 함께 설명한다."
date: "2017-05-11"
layout: post
mainImage: "/posts/2017-05-11-angular-2-two-way-binding/karina-carvalho-94650.jpg"
tags:
  - Javascript
  - Angular 2
path: "/posts/2017-05-11-angular-2-two-way-binding"
---

<figure>
<img src="/posts/2017-05-11-angular-2-two-way-binding/karina-carvalho-94650.jpg">
<figcaption>https://unsplash.com/@nickeedoo</figcaption>
</figure>

## one-way binding

Angular 2(Angular >= 2.x, 이하 Angular로 표기)는 React.js, Vue.js처럼 데이터의 흐름이 단방향(one-way binding)이다. 최근 대부분의 모던 자바스크립트 프레임워크들은 단방향 데이터 연결을 지향하고 있다. 그 이유는 앱 구조를 보다 명확하게 할 수 있고 확실한 명령을 통해서만 앱 상태를 변경하기에 사이드 이펙트 발생을 줄이고 컴포넌트간의 데이터 흐름을 직관적으로 만들어준다.

## AngularJS의 two way binding

Angular 1(Angular > 1.x, 이하 AngularJS로 표기)에서 많은 인기를 얻었던 특징 중에는 `ng-model` 지시자(directive)를 이용한 양방향 데이터 연결(two-way binding)이 있다. UI의 입력 데이터가 변경되면 콜백 함수 없이도 앱의 상태가 자동으로 업데이트되는 기능이다.

```js
// name 속성이 연결된 input에 텍스트를 입력하면 h1 태그 내부의 텍스트가 동시에 변경된다.
<div ng-app="myApp" ng-controller="myCtrl">
  Name: <input ng-model="name">
  <h1>You entered: {{name}}</h1>
</div>
```

앞서 Angular는 2.x 버전부터는 데이터는 흐름이 단방향으로 바뀌었다고 했다. 그럼 ng-model은 사라진 것일까? 그렇지 않다. Angular에서도 여전히 ng-model 기능을 지원한다. 하지만 실제 구현을 살펴보면 양방향 데이터 연결이 아니라 단방향에 기반하고 있다.


## banana-in-box 표기법

Angular에서는 컴포넌트에 속성(property)과 이벤트(event)를 바인딩하는 문법을 구분해서 사용한다. 속성에는 대괄호, 이벤트에는 중괄호를 사용한다.

```js
<SampleComponent
  [data]="prop"
  (onChange)="onChangeData($event)"
></SampleComponent>
```

그리고 Angular에서는 양방향 연결을 위한 특수한 표기법을 지원한다. banana-in-box라는 표기법으로 중괄호와 대괄호를 동시에 사용한다.

```js
<SampleComponent
  [(data)]="prop"
/></SampleComponent>
```

저 표기법을 사용하면 내부적으로 양방향 연결이 구현되어 있는 것일까? 그렇지 않다. 대신 컴파일시 속성 바인딩과 이벤트 바인딩으로 자동으로 분리한다. 그리고 이벤트 바인딩에는 속성에 사용한 이름에 `Change`라는 접미사가 붙은 이름이 들어간다. (Change가 붙는 것은 banana 표기법을 사용했을 때 일관적으로 적용되는 규칙이다)

```js
<SampleComponent
  [data]="prop"
  (dataChange)="prop = $event"
/></SampleComponent>
```

`prop = $event`부분은 콜백 함수의 본문을 직접 할당한 방식으로 볼 수 있다. dataChange 이벤트가 발생하면 부모 컴포넌트의 prop 속성에 $event 변수가 할당되어서 부모의 상태가 업데이트된다. 그런데 $event라는 변수는 어디서 온 것일까? 다음 코드를 살펴보자.

```js
@Component(
  selector: 'app-sample'
  template: `
    <div>
      <label>data: </label>
      <input [value]="data" />
      <button (click)="increase()">+</button>
    </div>
  `
)
export class SampleComponent {
  @Input() data: number;
  @Output() dataChange = new EventEmitter();

  increase() {
    this.data++;
    this.dataChange.emit(this.data);
  }
}
```

SampleComponent의 버튼을 클릭하면 increase 메소드가 실행된다. increase 메소드는 data 속성의 값을 변경한 후 EventEmiiter인 dataChange의 emit 메소드를 실행해서 이벤트를 발생시키는 과정을 확인할 수 있다. 앞서 예제의 `(dataChange)="prop = $event"` 부분에 등장한 $event가 바로 emit 메소드가 전달한 값에 해당한다.

컴포넌트에서 버튼을 클릭하면 data 속성이 변경되고, 그 값은 다시 부모 컴포넌트로 전달된다. 이렇게 양방향 연결이 구현되었다.


## getter와 setter를 이용한 양방향 바인딩

위의 예제에서는 버튼을 클릭해야만 양방향 연결이 작동한다. AngularJS에서 사용했던 것처럼 따로 버튼을 클릭하지 않고도 input 값만 변경되어도 양방향 연결이 되도록 만들어보자. 이를 위해서는 [getter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get)와 [setter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set)를 사용해야 한다.

```js
@Component(
  selector: 'app-sample'
  template: `
    <div>
      <label>data: </label>
      <input [value]="data" />
    </div>
  `
)
export class SampleComponent {
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

핵심은 컴포넌트 로컬 속성을 따로 관리한다는 점이다. data 속성은 Input 데코레이터가 적용되었기에 컴포넌트와 그 부모에서 모두 값을 참조하고 할당할 수 있다. 대신 단순 참조와 할당을 하지 않고 getter로 로컬 속성인 componentData를 반환하고, setter로는 input에 입력된 값을 로컬 속성(componentData)에 할당한 후 다시 그 값을 부모 컴포넌트로 올려보낸다.

setter에서 이벤트를 발생시키지 않으면 컴포넌트는 부모 컴포넌트로 변경된 값을 전달하지 않는다. UI에서 값이 변경되고 있지만 그것은 SampleComponent의 독립된 공간에서만 일어나는 일일 뿐이며 부모 컴포넌트와는 관계가 없게 된다. 이 예제를 통해 Angular는 단방향 데이터 흐름을 가지며, 직접 지시를 하지 않으면 데이터가 아래에서 위로 거슬러 올라가는 일은 발생하지 않는다는 사실을 확인할 수 있다.


## ngModel

banana-in-box 표기법에 ngModel을 사용하면 지금까지 살펴본 구현 방식을 프레임워크가 직접 구현해준다는 편리함이 있다. 하지만 input 같은 기본 컴포넌트는 ngModel을 이용해서 양방향 바인딩을 쉽게 사용할 수 있지만 커스텀 컴포넌트와 양방향 바인딩을 이용해서 데이터를 주고받기 위해서는 지금까지 살펴본 예제처럼 직접 구현해야 한다.


## 참고자료

- [Angular Docs - Two way binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way)
- [TWO-WAY DATA BINDING IN ANGULAR](https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html)
