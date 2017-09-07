---
title: "dploy 모듈로 node.js에서 FTP 배포 프로세스 자동화하기"
description: "node.js 환경에서 FTP에 업로드는 방식으로 웹사이트를 배포하는 경우 커맨드라인 명령어는 복잡하고 Filezilla 같은 어플리케이션은 자동화가 까다롭다. node.js 모듈인 dploy와 npm script를 사용해서 배포 프로세스를 자동화할 수 있다."
date: "2017-09-01"
layout: post
mainImage: ""
tags:
  - FTP
  - node.js
  - npm
draft: false
---

웹사이트를 서버에 배포할 때 FTP를 통해 직접 업로드하려면 Filezilla처럼 UI를 제공하는 앱을 사용하거나 커맨드라인 명령어를 사용한다. 하지만 Filezilla는 태스크 관리를 통한 자동화를 지원하지 않고 커맨드라인 명령어는 복잡하고 학습 난이도가 있다. 여러 개의 파일을 폴더 단위로 업로드하려면 더욱 그렇다.

그래서 node.js에서 사용할 수 있는 모듈과 npm script를 사용해 자동화할 방법을 찾아보았다. 하지만 배포용 프로세스에 맞는 모듈은 좀처럼 찾기 어려웠다. 맥 OS의 기반이 되는 유닉스와 node.js에 익숙하지 못해서 제대로 사용하지 못하는 모듈도 여럿 있었다. 그러다 발견한 모듈이 [dploy](https://www.npmjs.com/package/dploy)였다.

dploy는 FTP와 SFTP를 모두 지원하고 자체적으로 서버에 버전 관리용 파일을 생성해서 변경된 파일만 업로드하는 기능을 가지고 있다. 그리고 환경 설정 파일을 별도로 생성할 수 있고 복수의 업로드 설정을 저장해둘 수 있다. 웹서비스를 개발할 때 테스트 버전, 운영 버전을 구분해서 배포하는 일이 일반적이므로 무척 유용하다.


## 배포 프로세스 구축

### dploy 설치

dploy는 전역에 설치해서 사용한다.

```
npm i -g dploy
```

### 설정 파일 생성

프로젝트 루트에 `dploy.yaml`파일을 만든다. `dploy install` 명령어를 사용해도 자동으로 만들어준다. 이 파일에 FTP 접속 정보와 업로드할 파일의 위치 등을 명시해준다. 아래는 예제 설정 파일이다.

```yaml
env_name:
    host: "ftp.host.pathname"
    user: "username"
    pass: "password"
    port: 21
    path:
      local: "build/"
      remote: "www/"
    exclude: [".DS_Store"]
    include:
        "build/**/*": "/"
```

설정 데이터는 중첩된 키-밸류 해쉬 데이터의 구조체로 되어 있으며 최상위 키의 이름으로 업로드 환경을 구분한다. host, user, pass 등은 FTP 접속에 필요한 정보이므로 직관적으로 알 수 있을 것이다. 업로드할 파일과 저장 위치를 설정하는 값들이 아래에 위치하고 있다.

#### path.local

현재 프로젝트에서 업로드할 폴더를 지정한다. 지정하지 않으면 프로젝트 전체가 업로드된다.

#### path.remote

파일을 업로드할 원격 폴더를 지정한다. 지정하지 않으면 역시 루트에 저장한다.


#### exclude

업로드할 때 제외할 파일들이다. 맥에서 개발을 진행한다면 운영체제에서 .DS_Store라는 이름의 숨겨진 파일을 자동으로 폴더에 생성하기 때문에 제외하는 편이 좋다. 어떤 FTP 모듈은 저런 숨겨진 파일 때문에 업로드 과정에서 오류가 발생하기도 한다.

#### include

업로드에 포함할 파일이다. exclude는 값으로 배열을 지정할 수 있지만 include는 키-밸류를 지정해야 한다. 키에는 업로드할 파일을 절대 경로를 사용해 직접 지정하거나 [glob](https://github.com/isaacs/minimatch) 패턴을 사용해서 복수의 파일을 지정한다. 그리고 밸류에는 원격 저장소에서 키에 지정한 파일이 위치할 경로를 작성한다. 이때 경로는 path.remote에서 지정한 경로에 대해 상대적인 경로로 지정해야 한다.

위의 예제 설정에서 키에는 `build/**/*`를 지정하여 build 폴더 내부의 모든 파일을 업로드하도록 했다. 그리고 밸류에는 `/`를 지정했는데, path.remote의 값은 `www/`이므로 업로드될 위치는 `www/`가 된다.

### 업로드

설정 파일 작성을 완료했다면 일단 업로드는 가능하다. dploy 명령어와 이름을 조합해서 업로드를 하면 된다.

```
dploy env_name
```

이제 테스트, 운영 빌드의 업로드 환경을 구분하고 npm script를 사용해서 빌드와 배포를 자동화하는 과정이 남았다.


### 업로드 환경 추가

키-밸류로 구성된 구조체를 하나 더 작성하면 된다. 테스트와 운영 웹사이트를 동일한 서버에 배포할 경우 path.remote의 값만 다르게 지정하면 될 것이다.

```yaml
test
    host: "ftp.test.pathname"
    user: "username"
    ...

prod
    host: "ftp.prod.pathname"
    user: "username"
    ...
```


### npm script 작성

프로젝트 빌드를 실행하는 npm script와 dploy 업로드 명령어를 조합해서 배포용 스크립트를 작성할 수 있다.

```json
{
  "scripts": {
    "build": "sh -ac '. .env.${REACT_APP_ENV}; react-scripts build'",
    "build:test": "REACT_APP_ENV=development npm run build",
    "build:prod": "REACT_APP_ENV=production npm run build",
    "upload:test": "dploy test",
    "upload:prod": "dploy prod",
    "deploy:test": "npm run build:test && npm run upload:test",
    "deploy:prod": "npm run build:prod && npm run upload:prod",
  }
}

```

---

FTP를 파일을 배포할 일이 있으면 Filezilla 같은 간편한 앱만 사용했었다. 업로드할 때마다 파인더에서 폴더를 찾고, 원격 폴더도 테스트인지 운영인지 확인하는 과정이 귀찮아져서 업로드 프로세스를 자동화시켜 보았다. 개발자라면 역시 [DRY 원칙](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)을 지키고 싶어지는 법이다.