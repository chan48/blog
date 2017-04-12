---
title: "버전 관리 시스템 Git 기초"
description: "버전 관리 시스템 Git 기초"
date: "2017-01-08"
layout: post
mainImage: "https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/file-status.png"
tags: "VCS, Git, SVN, Git flow"
path: "/posts/2017-01-07-git-basic"
---

## Git: 분산형 파일 버전 관리 시스템

Git은 분산형 파일 버전 관리 시스템이다. *파일 버전*, *관리 시스템*, *분산형*이라는 세 단어로 Git을 설명할 수 있다.

### 파일 버전

작업을 하다보면 동일한 파일을 계속 수정하기 때문에 변경 이력에 대한 기록이 필요하다. 가령 소스 코드에서 오류를 발견했을 경우 정상적으로 작동했던 시점의 코드와 비교하고 싶어질 것이다. 하지만 사용자가 직접 특정 시점의 파일을 유지하려면 파일의 복제본을 만들 수밖에 없다. 그래서 자동화를 위한 시스템이 등장했다.

### 파일 버전 관리 시스템

버전 관리 시스템(`VCS`, Version Control System)은 파일 버전을 관리하는 소프트웨어다. 사용자가 파일의 복제본을 직접 생성하지 않아도 여러가지 명령어를 통해 파일 버전을 효율적으로 관리할 수 있도록 도와준다. 단순 파일 복제를 넘어 변경 사항만 기록해서 디스크를 효율적으로 사용하고 브랜치를 생성해서 서로 다른 작업을 독립적으로 진행하는 등 다양한 기능을 지원한다.

### 분산형 파일 버전 관리 시스템

분산형은 집중형의 반대말이다. 이는 파일 저장소의 원본이 어디에 있느냐의 차이라고 할 수 있다.

#### 중앙 집중식 버전 관리 시스템(`CVCS`, Central Version Control System)

`CVCS`에서 사용자는 **원격 저장소에서 최신 버전의 파일만을 내려받아서 사용한다**. 사용자가 새로운 버전을 추가하기 위해서는 무조건 원격 저장소에 추가해야 한다. 최신 버전이 항상 원격에 유지되며 사용자는 원격에 접속하지 않고는 작업 이력을 남길 수 없으므로 관리자로서는 관리하기 쉽다는 장점이 있다. 하지만 사용자가 원격 저장소에 연결되어 있지 않을 경우 협업, 백업을 할 수 없다는 단점이 생긴다.

대표적인 소프트웨어는 SVN이다.

#### 분산형 버전 관리 시스템(`DVCS`, Distributed Version Control System)

`DVCS`는 원격 저장소에서 최신 버전의 파일만 가져오는 것이 아니라 **과거 이력을 포함한 저장소의 모든 데이터를 복제**한다. 복제한 후에는 로컬에서 자유롭게 작업을 진행할 수 있고 원격 저장소에 문제가 생겨도 로컬에 복제된 저장소로 복구할 수 있다는 등의 장점이 있다. 복제한 로컬 저장소는 원격에 접속하지 않고도 모든 버전에 접근할 수 있는 진정한 백업이다.

대표적인 소프트웨어로는 Git, Mercurial, Bazaar 등이 잇다.

## Git 기초

### 스냅샷

**특정 시점에서 파일, 폴더 또는 워크스페이스의 상태**를 의미한다. 스냅샷을 통해 특정 시점에 어떤 파일에 어떤 내용이 기록되어 있었는지, 폴더 구조는 어떠했는지, 어떤 파일이 존재했는지 등 저장소의 모든 정보를 확인할 수 있다. Git에서는 새로운 버전을 기록하기 위한 명령인 커밋(`commit`)을 실행하면 스냅샷이 저장된다.

#### Git과 SVN의 스냅샷의 차이점

SVN은 개별 파일별로 변화를 감지해서 스냅샷을 저장한다. 버전 생성은 시간순으로 파일들의 집합을 구성하는 방식을 이용한다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/snapshot-svn.png">
<figcaption>SVN 스냅샷</figcaption>
</figure>

반면에 **Git은 저장소의 파일 시스템 전체를 스냅샷으로 취급**한다. 커밋 시점의 저장소 상태가 하나의 버전이 된다. 파일이 변경되지 않았다면 Git은 파일을 새로 저장하지 않고 링크만 저장한다. Git은 데이터를 스냅샷의 스트림으로 취급한다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/snapshot-git.png">
<figcaption>Git 스냅샷</figcaption>
</figure>


#### Git이 작고 빠를 수 있는 이유?

Git에서 커밋을 하면 워크스페이스 전체가 스냅샷으로 저장되지만 덩치가 배로 불어나지는 않는다. Git은 마지막 커밋의 스냅샷만 통째로 저장하고 나머지 커밋에 대해서는 스냅샷과 스냅샷이 차이를 기록한 ‘델타’를 저장하기 때문이다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/snapshot-delta.png">
<figcaption>Git의 스냅샷과 델타 구성</figcaption>
</figure>

이렇게 하면 버전별로 전체 스냅샷을 모두 저장하지 않아도 마지막 스냅샷을 기준으로 특정 시점의 스냅샷을 만들 수 있다. 저장소의 크기도 자연히 줄어든다. (Git을 개발한 측에서는 VCS 중에서 저장소 크기가 가장 작다고 주장한다)



### 로컬 기반의 명령

Git은 분산형 파일 버전 관리 시스템이기 때문에 로컬에 저장소 전체가 저장되어 있어서 자유롭게 커밋을 하거나 되돌릴 수 있고 과거 버전에도 접근할 수 있다. 반면에 SVN같은 중앙 집중식은 원격 저장소에 연결되어 있어야만 커밋을 할 수 있다. Git에서는 원격 저장소에 작업 결과물을 올리거나 새로 가져올 경우에만 네트워크 원결이 필요하다.

### 파일 상태 라이프사이클

Git에서는 파일을 4가지 상태로 구분한다.

- `untracked` - Git 저장소에 추가되지 않은 상태. Git이 변경 이력을 관리하지 않으며 스냅샷에도 추가되지 않는다.

- `tracked` - 파일을 Git 저장소에 추가되어서 시스템에 의해 관리되고 있는 상태. 스냅샷에 추가된다. `tracked` 는 다음 3가지 상태로 구분된다.

    + `unmodified` - 수정되지 않은 상태. 마지막 커밋과 비교해서 변경된 부분이 없는 경우.

    + `modified` - 수정된 상태.

    + `staged` - 수정된 파일을 커밋하기 위한 준비 상태. 커밋을 하게 되면 새로운 스냅샷이 생성되고 staged 상태의 파일은 다시 unmodified로 돌아간다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/file-status.png">
<figcaption>Git 파일 라이프사이클</figcaption>
</figure>

## Git 브랜치

**브랜치는 특정 커밋을 가리키는 포인터와 같은 개념이다.** 특정 커밋을 기준으로 브랜치를 생성할 수 있다.

Git의 강점은 브랜치를 쉽게 만들고 병합할 수 있다는 점이다. 브랜치를 이용하면 여러 사람이 함께 진행하는 프로젝트에서 다른 브랜치의 커밋에 영향을 받지 않고 작업을 진행할 수 있다.

예를 들어 새로운 이슈가 생겨서 개발을 진행해야 할 때 브랜치를 새로 생성해서 작업을 진행할 수 있다. 개발이 진행 중인 상황에 배포된 버전에 문제가 생겼을 때는 이슈를 개발중인 브랜치는 유지하고 배포된 커밋에서 수정용 브랜치를 생성해서 문제를 해결할 수 있다. 이처럼 브랜치를 이용하면 다양한 상황에 유연하게 버전을 관리하면서 대응할 수 있다.


### 브랜치 생성과 커밋 히스토리의 분기

Git 저장소를 초기화하면 `master`라는 이름의 기본 브랜치가 만들어져 있다. `master`와는 다른 `testing`이라는 브랜치를 만들고 커밋을 진행한 예제 히스토리를 살펴보자.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/branch.png">
<figcaption>2개의 브랜치 히스토리(좌측이 과거 커밋)</figcaption>
</figure>

1. 기본 브랜치 `master`가 `f30ab`를 가리키는 상태에서 새 브랜치 `testing`을 생성하고 체크아웃(워크스페이스를 특정 스냅샷(커밋)으로 변경하는 명령)한다.
    1. `HEAD`(현재 작업 중인 로컬 브랜치를 가리키는 포인터)가 `testing`을 가리키는 상태가 된다.
1. 커밋을 하면 새로운 스냅샷 `87ab2`가 생성된다.
    1. `testing` 브랜치는 새로 생성된 스냅샷을 가리킨다.
    1. `master` 브랜치는 스냅샷 `87ab2` 이전의 `f30ab`를 여전히 가리킨다.
    1. 아직은 포인터만 다르고 브랜치가 갈라진 상태는 아니다.
1. `master` 브랜치로 체크아웃한 후 커밋을 해서 새로운 스냅샷 `c2b9e`를 생성한다.
    1. `master` 브랜치는 `testing` 브랜치와는 달리 `c2b9e` 스냅샷을 가리킨다.
    1. 이제 `master`와 `testing`은 스냅샷 `f30ab`로부터 서로 갈라져 나온 상태가 되었다.


### 브랜치의 병합(merge)

브랜치를 분리한 후에는 병합 과정이 필수적이다. 병합은 2가지 상황이 있을 수 있다.

1. 현재 브랜치가 가리키는 커밋이 병합할 브랜치가 가리키는 커밋의 조상인 때.
2. 현재 브랜치가 가리키는 커밋이 병합할 커밋의 조상이 아닌 때

#### 1의 경우

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/merge-same-ancestor.png">
<figcaption></figcaption>
</figure>

`master`에서 `hotfix`를 병합하는 경우다. `master`는 `hotfix`의 부모이므로 `c2` 과 `c4` 커밋을 서로 비교해서 병합을 진행한다.

### 2의 경우

`master`에 `hotfix`가 병합되었고 `iss53` 브랜치에서는 별도로 계속 작업이 진행되었다. `master`에서 작업이 완료된 `iss53` 브랜치를 병합하려고 한다.

이 경우에는 두 브랜치가 갈라져 나온 공통 조상 커밋, 병합할 두 브랜치의 커밋, 총 3개의 커밋을 비교해서 병합을 진행한다. 이를 `3-way merge`라고 한다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/3-way-merge.png">
<figcaption>3-way merge</figcaption>
</figure>

`c4`, `c5`는 모두 `c2`를 공통 조상 커밋으로 기지므로 `c2`를 기준으로 두 브랜치의 커밋을 비교해서 병합을 진행한다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/3-way-merge-result.png">
<figcaption>3-way merge 실행 결과</figcaption>
</figure>

병합이 완료되면 `master` 브랜치는 두 브랜치를 병합한 결과인 `c6` 커밋을 가리키게 된다.

### 병합 과정에서 발생하는 충돌(conflict)

`3-way merge`는 실패하는 경우가 생길 수 있다. 서로 다른 브랜치에서 같은 부분을 수정한 경우에 발생한다.

```html
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer"> please contact us at support@github.com </div>
>>>>>>> iss53:index.html
```

위의 예제 코드는 index.html 파일의 `div` 태그 내부에서 충돌이 발생했음을 나타낸다. `HEAD`는 병합 시도시 체크아웃되어 있던 브랜치, 즉 앞서 살펴본 병합 예제에서는 `master` 브랜치에 해당한다.

그리고 `=======` 아래의 코드는 병합할 브랜치인 `iss53` 브랜치에서 커밋한 index.html 파일에서 충돌한 부분이다.

충돌은 특정 브랜치의 코드를 사용하도록 선택하거나, 코드를 직접 수정하거나, 외부 병합 툴을 사용해서 해결한다. 브랜치간의 충돌을 최소하기 위해서는 작업중인 브랜치(`feature`)에서 다른 사용자와 공동으로 사용하는 브랜치(`develop`)에 추가되는 커밋들을 가능한 한 자주 병합해 나가야 한다.


### 재배치(rebase)

재배치는 브랜치를 병합하는 다른 방식이다. 재배치를 사용하면 복수의 브랜치를 커밋 히스토리가 분기된 것처럼 보이지 않고 처음부터 1개의 브랜치였던 것처럼 구성할 수 있다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/basic-rebase-1.png">
<figcaption>재배치 시작 전 분기된 브랜치 히스토리</figcaption>
</figure>
<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/basic-rebase-2.png">
<figcaption>3-way merge 완료</figcaption>
</figure>
<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/basic-rebase-3.png">
<figcaption>C4를 C4'으로 재배치해서 experiment 브랜치를 앞으로 이동</figcaption>
</figure>
<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/basic-rebase-4.png">
<figcaption>master 브랜치를 C4'로 이동</figcaption>
</figure>

## Git flow

Git flow는 Vincent Driessen의 [브랜칭 모델](http://nvie.com/posts/a-successful-git-branching-model/)을 사용하기 위한 Git 확장 프로그램이다. 커맨드라인에서 사용하기 위해서는 별도 설치가 필요하고 [SourceTree](https://www.sourcetreeapp.com/)에는 기본 내장되어 있다.

Git flow는 역할에 따라서 브랜치를 분리해서 사용한다.

### `master`

기본 브랜치. 배포된 버전의 브랜치로 사용한다.

### `develop`

실제 개발이 진행되는 브랜치. 프로젝트를 함께 진행하는 팀원들이 우선적으로 공유하는 브랜치라고 할 수 있다.

### `feature`

이슈별로 `feature` 브랜치를 생성해서 작업을 진행한다. `feature` 브랜치는 `develop`에 있는 커밋을 기반으로 생성하며 작업이 완료되면 `develop`에 병합된다. 병합 후에는 특별한 경우가 아니라면 삭제한다.

### `release`

다음 버전 배포를 위한 개발이 완료되었을 때 `develop` 브랜치의 커밋에서 생성하여 배포 준비를 진행한다. 버그 픽스, 간단한 기능 추가, 문서 작업 등을 목적으로 사용한다. 배포 준비가 끝나면 `release` 브랜치는 `master`와 `develop`에 병합된 후 삭제된다.

`release` 브랜치가 있으면 배포 준비 중에도 다른 팀원들은 즉시 다음 버전 개발을 시작할 수 있다는 장점이 있다.


### `hotfix`

배포된 버전을 수정할 필요가 생기면 `master` 브랜치의 커밋을 기반으로 생성한다. 작업이 완료되면 `hotfix` 브랜치는 `master`와 `develop`에 병합된 후 삭제된다.

<figure class="">
<img src="https://s3.ap-northeast-2.amazonaws.com/rhostem-cdn/blog/2017-01-09-git-basic/git-flow.png">
<figcaption>Git flow 브랜치 히스토리 샘플</figcaption>
</figure>

## 참고 자료, 이미지 출처

- [book “Pro Git”](https://git-scm.com/book/ko/v2)
- [Git 간편 안내서](https://rogerdudler.github.io/git-guide/index.ko.html)
- [누구나 이해할수 있는 git 입문](https://backlogtool.com/git-guide/kr/intro/intro1_1.html)
- [Git: 델타와 스냅샷](http://dogfeet.github.io/articles/2012/git-delta.html)
- [Git flow workflow tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Git flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html)

