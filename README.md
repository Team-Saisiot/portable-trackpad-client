# Portable TrackPad

항상 들고다니는 스마트폰을 매직 트랙패드처럼 사용할 수 있다면 어떨까? 에서 출발한 프로젝트
**Portable TrackPad**입니다. 

사용자는 Portable TrackPad를 이용해 스마트폰을 트랙패드처럼 사용할 수 있으며, 제스처를 사용해 볼륨 조절과 탭 넘기기 같은 기능을 사용할 수 있습니다. 또한 Gesture Drawing 웹페이지에서 다른 사용자들과 함께 그림을 그리고, 제스처를 이용해 도형을 생성하거나 크기를 조절할 수 있습니다.

> Deploy(Web) : https://gesture-drawing.online
#
<br/>
<br/>

### `📃 프로젝트 구조`

### Portable TrackPad

- 1개의 모바일 어플리케이션과 2개의 서버(Sever, Package)로 구성
    - React Native를 통해 커서 조작 데이터를 Socket으로 보낼 모바일 어플리케이션
    - 모바일 어플리케이션과 트랙패드 움직임 데이터를 Socket으로 받을 Node.js Package
    - 사용자 정보등 다양한 DB정보에 접근할 수 있는 Node.js Express Server

### Gesture Drawing

- 1개의 웹 어플리케이션과 Socket 통신을 담당하는 1개의 서버 (Package)로 구성
    - React를 통해 드로잉 기능을 구현한 웹 어플리케이션
    - 웹 어플리케이션에서 전달해준 데이터를 Socket으로 사용자들에게 전달하는 Package
#
<br/>
<br/>

### `🗄 레포지토리 링크`

- [Frontend(Mobile)](https://github.com/Team-Saisiot/portable-trackpad-client)
- [Frontend(Web)](https://github.com/Team-Saisiot/portable-trackpad-gesture-drawing)
- [Backend](https://github.com/Team-Saisiot/portable-trackpad-server)
- [Package](https://github.com/Team-Saisiot/portable-trackpad-package)

#
<br/>
<br/>

### `⚙️ 셋업 설명`

### Frontend(Mobile)

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 환견변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    SERVER_PORT=SERVER_PORT
    PACKAGE_SERVER_PORT=PACKAGE_SERVER_PORT
    EXPO_CLIENT_ID=EXPO_CLIENT_ID
    EXPO_WEB_CLIENT_ID=EXPO_WEB_CLIENT_ID
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm start
    ```
    
4. Android의 경우 PlayStore에서 `Expo`를 IOS의 경우 AppStore에서 `Expo Go`를 다운로드 받는다.
5. 해당 Expo어플리케이션에서 QR코드인식 모드를 켠다.
6. 프로젝트에서 표시된 QR코드를 스캔한다.

<br/>

### Frontend(Web)

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-gesture-drawing)를 git clone을 한다.
2. 환견변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    REACT_APP_SERVER_IPADDRESS=REACT_APP_SERVER_IPADDRESS
    REACT_APP_SERVER_PORT=REACT_APP_SERVER_PORT
    REACT_APP_PACKAGE_IPADDRESS=REACT_APP_PACKAGE_IPADDRESS
    REACT_APP_PACKAGE_PORT=REACT_APP_PACKAGE_PORT
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm start
    ```
    
<br/>

### Backend

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    PORT=PORT
    MONGODB_URL=MONGODB_URL
    CLIENT_PORT=CLIENT_PORT
    EXPO_CLIENT_ID=EXPO_CLIENT_ID
    MAILS_EMAIL=MAILS_EMAIL
    MAILS_PWD=MAILS_PWD
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm run dev
    ```
<br/>  

### Package

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm run dev
    ```
#
<br/>
<br/>    

### `🎥 기능 시연 영상`

### Portable TrackPad
<details>
  <summary>커서 이동</summary>
  
https://user-images.githubusercontent.com/99075014/199181600-7b149691-fb0b-460c-8f07-c063db5a33c2.mov

</details>

<details>
  <summary>드래그</summary>
  
https://user-images.githubusercontent.com/99075014/199181649-86f67156-5f5b-4e0a-a0d1-933c6a4897ba.mov

</details>

<details>
  <summary>스크롤</summary>
  
https://user-images.githubusercontent.com/99075014/199181705-899ffa28-e478-438a-9096-a708e072c7b8.mov

</details>

<details>
  <summary>브라우저 앞으로, 뒤로가기</summary>
  
https://user-images.githubusercontent.com/99075014/199185416-abc538cb-1249-4700-8bf6-a9d4030b0a2d.mov

</details>


<details>
  <summary>브라우저 탭 앞으로, 뒤로가기</summary>
  
https://user-images.githubusercontent.com/99075014/199185470-f21f706c-702b-423b-b4c7-a1cf1c38cb6e.mov

</details>

<details>
  <summary>볼륨 업, 다운</summary>
  
https://user-images.githubusercontent.com/99075014/199185310-74e5a7b0-864d-443e-9e12-bcbc2db78b96.mov

</details>

<details>
  <summary>제스처 생성 기능</summary>
  
https://user-images.githubusercontent.com/99075014/199181948-ce32368d-2462-41c2-b2ac-26aae2555eee.mov

</details>

<details>
  <summary>제스처 편집 기능</summary>
  
https://user-images.githubusercontent.com/99075014/199185540-a9fb2cbd-2cb8-4c9c-b312-698b54467a5b.mov

</details>

### Gesture Drawing

<details>
  <summary>제스처로 도형 생성 기능 (With Portable TrackPad)</summary>
  
https://user-images.githubusercontent.com/99075014/199187026-83c794cf-bc4b-43b3-a888-023e199bf092.mov

</details>

<details>
  <summary>제스처로 도형 크기 조절 기능 (With Portable TrackPad)</summary>
  
https://user-images.githubusercontent.com/99075014/199187110-2d024476-e1a5-4123-9684-38f4f7722f5f.mov

</details>

<details>
  <summary>Drawing 공유기능</summary>
  

https://user-images.githubusercontent.com/99075014/200184662-a9e3de36-d7c5-4aba-8cd0-9e1e74a6a1ff.mov


</details>

<details>
  <summary>Figure 공유기능</summary>

https://user-images.githubusercontent.com/99075014/200184705-4d16848c-9edb-41f1-a567-2fc92efd7189.mov

</details>

<details>
  <summary>사용자간 공유되는 Undo, Redo</summary>

https://user-images.githubusercontent.com/99075014/200184725-27b0084b-0bdf-4d0a-ba63-d516cb1cfaa3.mov

</details>

#
<br/>
<br/>

### `🛠 기술 스택`

## Frontend(mobile)

- React Native
- React Native Gesture handler
- Socket io(Client)
- Styled Compontents
- Axios

## Frontend(web)

- React
- Canvas
- Socket io(Client)
- Redux-Toolkit
- Axios

## Backend

- Node.js
- Express
- Google Oauth
- MongoDB
- Mongoose
- Local-Devices
- Nodemailer

## Package

- Node.js
- Express
- Socket io(server)
- Robot.js

## Depoly

- Netlify (Frontend)
- AWS Elastic Beanstalk (Backend)

#
<br/>
<br/>

### `🗓 프로젝트 기간`

**2022년 10월 10일 ~ 10월 29일**

- 10월 10일 ~ 10월 13일 : 아이디어 기획, 기술 검증 및 구현 방법 리서치, 목업 작성, 칸반 작성
- 10월 14일 ~ 10월 29일 : 개발 진행, 배포, 테스트 작성
- 10월 21일 ~ 10월 29일 : 추가 프로젝트(Gesture Drawing)기획 및 개발 진행

#
<br/>
<br/>

### `💡 핵심 구현 사항`

<details>
  <summary>원활한 사용자 경험을 위한 레이턴시 개선</summary>
  
## 충분히 빠른 레이턴시 확보의 필요성

 본 프로젝트에서 가장 핵심 기능은 Socket을 통한 PC와 모바일간의 데이터 통신이다. 
우리가 이 부분을 구현하면서 가장 고심했던 부분은 `얼마나 Socket통신을 원활한 상태로 유지할 수 있을까?`였다. 

 사용자가 터치패드를 사용하면서 `가장 크게 체감되는 불편함`은 PC와 터치 동작간의 입출력 시간의 딜레이
즉, `충분히 빠르지 못한 레이턴시`이다. 

 터치패드는 연속된 동작을 인식해야하는 입력기기이기 때문에 레이턴시에 민감하다. 만약 20ms의 아주 짧은 딜레이가 생기더라도 그것을 사용하게될 사용자의 입장에서는 상당히 크게 느껴진다. 

 때문에 `사용자가 불편함을 느끼지 않을만큼 충분히 빠른 레이턴시를 확보`하는것이 중요했다. 

<br/>

## Socket 통신의 흐름 파악

 우선 원활한 Socket통신 구조를 만들기 위해서 우리 프로젝트의 Socket통신 흐름을 파악해보기로 했다.
그 흐름을 파악한 다음 어느 구간에서 딜레이가 생길지를 파악해보기 위함이었다.

Portable TrackPad의 전체적인 Socket통신 구조는 다음과 같았다.

1. `터치 인식` : 사용자가 모바일 디바이스 스크린에 터치를 한다.
2. `터치 이벤트 감지` : 해당 터치에 해당하는 이벤트를 감지한다.
3. `실행 기능 변환` : 해당 이벤트를 Robot.js가 실행해야할 기능으로 변환한다.
4. `Socket 전송`: 해당 기능에 대한 데이터를 Socket을 통해 Package로 전송한다.
5. `해당 기능 실행`: Socket을 통해 전달받은 데이터를 기반으로 PC가 동작한다.

 

 이러한 흐름에서 각 구간을 넘을때마다 딜레이가 생길것이라 판단하였다. 때문에 이 과정에서 생기는 딜레이를 최소화하는 방향으로 개선해나갔다.

<br/>

## 구간별 조치 사항

### `1. 터치 인식`

***조치 사항: PWA에서 React Native로 전환***

 프로젝트 기획 초기에는 PWA를 활용하여 개발을 진행하려했다. 하지만 PWA는 엄밀히 말해서 Native한 모바일 어플리케이션이 아니고 단지 웹을 앱처럼 보이게 해줄 뿐이다.  
 하지만 React Native를 통해 개발하면 보다 Native한 터치를 구현할 수 있을것이라 판단하였다. 때문에 모바일 디바이스가 터치를 인식함에 있어서 보다 정밀하고 빠른 인식을 위해 React Native를 선택하였다.

<br/>

### `2. 터치 이벤트 감지`

***조치 사항: React Native Gesture Handler***

 React Native에서 제공하는 내장 터치 매서드는 Javascript 스레드에서 실행되기 때문에 네이티브 스레드에서의 실행보다 성능이 떨어진다. 제스쳐 이벤트가 수행될 때마다 React Native 브리지를 통해 인터페이스로 데이터를 전송하여 성능이 저하될 수 있기 때문이다.

하지만 React Native Gesture handler를 사용하면 네이티브 스레드에서 실행되고 플랫폼별 동작을 따르기 때문에 React Navtive에서 고성능 제스처를 구현할 수 있어 성능이 보다 향상된다.

즉, 터치 이벤트를 감지하는 연산에서의 시간을 줄임으로써 딜레이를 줄였다

<br/>

### `3. 실행 기능 변환`

***조치 사항: 없음***

 해당 구간은 단지 터치 이벤트가 실행되었을때 해당 기능을 나타내는 문자열, 좌표값을 반환하는 코드만으로 이루어져있다. 때문에 딜레이에 큰 지장을 주지않을것이라 판단하여 별다른 조치를 취하지 않았다.

<br/>

### `4. Socket 전송`

***조치 사항: 전달하는 데이터의 간소화***

 사실 이 과정에서 딜레이에 영향을 주는건 `네트워크의 속도`였다.
하지만 사용자의 네트워크의 속도는 개발자의 입장에서는 컨트롤하기 어렵다. 때문에 다른 부분에서 조치를 취해야했다.

 React Native개발 초기에 사용자가 입력한 메세지를 Socket통신하는 테스트를 진행하였다.
해당 테스트에서 사용자가 입력한 메세지가 길어질때마다 미세하게 딜레이가 늘어나는것을 확인하였다.
이전에는 단순히 String만 전송하는것이기에 속도에 크게 상관없을것이라 생각했었다.
하지만 실제로 수많은 데이터를 오고가며 통신할때는 그 미세한 용량차이가 딜레이를 좌우함을 깨달았다..

위의 테스트를 통해 Socket을 통해 전달하는 데이터는 정말 최소한의 데이터로 간략화 시키는것이 중요하다고 판단하였다.

즉, Socket을 통해 전달하는 데이터는 `[”기능”, x좌표, y좌표]`라는 아주 단순한 정보만을 담도록 코드를 제작하였다.

***실패한 조치 사항: 데이터 전달 빈도 조정***

 본 프로젝트에서는 터치를 감지할때마다 해당하는 데이터가 Socket으로 전송된다. 
그래서 커서를 이동하는 기능을 실행하면 손가락을 움직일때마다 해당하는 변화값이 Socket으로 전송된다. 하지만 이 전송의 빈도가 너무 많으면 레이턴시에 문제가 생기지 않을까 생각했다.

때문에 count를 통해서 Socket통신의 빈도를 조절하면 될것이라 생각하였다.

해당 방법을 통해 구현해보았으나 동작이 툭툭 끊기는 느낌이 났었다.
사용자가 오히려 불편함을 느낄것이라 생각하여 해당 조치 사항은 반영하지 않기로 하였다.

<br/>

### `5. 해당 기능 실행`

조치 사항: if문이 아닌 switch문 사용

 해당 구간에서는 Socket을 통해 받은 데이터를 분류하여 실행한다.
기존에는 if else를 사용하여 데이터를 분류하려했다. 하지만 switch case가 단순 분류에서는 더욱 나은 성능을 보인다는 [자료를 보게되었다.](http://www.blackwasp.co.uk/SpeedTestIfElseSwitch.aspx) 때문에 if else가 아닌 switch case를 사용하기로 결정하였다.

<br/>
<br/>

</details>


<details>
  <summary>Socket을 통한 Undo, Redo 동기화</summary>
  
## Drawing과 Figure의 구조

 Gesture Drawing에서 펜그리기와 도형그리기기능은 다음과 같은 로직으로 구현되었다.

<br/>

1. 해당하는 개체의 정보가 담긴 배열이 있다
    1. 펜의 경우 `[[시작점x, 시작점,y], [종료점x, 종료점y], 색상, 두께]]`라는 정보를 담고있다.
    2. 도형의 경우 `[x좌표, y좌표, 너비, 높이, 색상, 도형의 종류]`라는 정보를 담고있다
2. `Objects`배열에 해당하는 개체를 저장한다.
3. Objects 배열의 내용에 변화가 생기면
Objects의 내용을 Canvas에 렌더링해주는 함수 `Visualizer`를 실행한다.

<br/>

## Local 환경에서의 Undo, Redo 구현

 단순히 자신의 그리기 기록을 Undo, Redo를 하는것은 구현에 큰 어려움이 없을것으로 판단하였다. 
기본적으로 개체들의 정보가 담긴 `Objects`를 활용하여 Local환경에서의 Undo, Redo를 구현해보았다.

<br/>

1. 사용자가 개체를 생성, 조작하면 해당하는 동작수행 후 
그 사용자의 Objects를 `UndoStore`배열에 추가한다.
2. 사용자가 `Undo`를 실행하면 `UndoStore`에 저장된 Objects중 가장 최근것을 가져와
사용자의 Objects에 덮어씌운다.
덮어씌워지기 전의 Objects는 `RedoStore`에 저장한다.
3. 덮어씌워진 Objects에 맞게 렌더링(Visualizer)한다. 
4. 사용자가 `Redo`를 실행하면 `RedoStore`에 저장된 Objects중 가장 최근것을 가져와 
사용자의 Objects에 덮어씌운다.

<br/>

## Socket 통신 환경에서의 Undo, Redo 구현

 자신의 Undo, Redo를 다른 사람들과 공유하여 서로의 History가 동기화되도록 구현하기 위해서는 고려해야할 사항이 많았다. 

사용자들간의 Undo, Redo가 복합적으로 작용하는 상황을 매끄럽게 구현하기 위해서는 각 사용자들이 어떠한 방식으로 Undo, Redo를 전달받을것인가를 고민해보아야했다.

<br/>

1. 사용자들은 개체를 생성, 조작, Undo, Redo를하면 해당하는 동작수행 후 
그 사용자의 Objects를 `UndoStore`배열에 추가한다.
2. `자신의 Objects`, `UndoStore`, `RedoStore`를 Socket을 통해 `Server`에 보내준다.
3. Server는 받은 데이터를 다시 모든 사용자들에게 `broadcast`해준다.
4. 해당 데이터를 다른 사용자가 받게되면 
해당 데이터에 맞게 자신의 Objects, UndoStore, RedoStore를 덮어씌운다.
5. 덮어씌워진 Objects에 맞게 렌더링(Visualizer)한다.

<br/>

기본적으로는 Local환경과 비슷하지만 Socket통신을 통해 서로의 상태를 공유하는 로직을 구현하였다.

<br/>

## 얕은 복사 이슈

 위의 로직대로 코드를 작성하였지만 Socket통신을 하는 과정에서 데이터가 제대로 전달되지 않는 문제가 발생하였다.

분명 Socket을 통해 Server로 데이터를 전송할때는 제대로된 데이터였지만, Server에서 받은 데이터는 빈 배열 또는 서로 꼬여진 데이터였다.

문제의 원인은 Server로 데이터를 전달할때 데이터를 담는 과정에서의 스프레드 연산자를 통한 얕은 복사였다. 해당 문제를 해결하기위해 lodash의 deepClone을 사용하였다.

그 결과 서로의 Undo, Redo, Objects들이 정상적으로 전송되었다.

<br/>
<br/>

</details>

<details>
  <summary>제스처 추가 로직</summary>

## 로직의 모티브

 Portable TrackPad가 가지는 장점중 하나는 사용자가 자신만의 제스처를 만들어서 사용할 수 있다는 것이다. 
기존에 제스처와 크게 겹치지 않는다면 자신이 원하는 동작을 원하는 기능에 할당할 수 있다. 
사용자에게 보다 나은 사용자 경험을 제공한다는 우리팀의 목표에 부합하는 기능이었다.

 하지만 이러한 기능 구현하기 위한 로직이 쉽게 떠오르지 않았다. 사용자가 원을 그릴 수 도, 네모를 그릴 수 도 있으며, 심지어 별을 그릴 수 있는데 그 많은 경우를 어떻게 계산할것인가?하는 문제에 봉착했다. 사용자가 어떠한 제스처를 그리던 그 정보를 저장하고 다시 그렸을때 그것과 동일함을 계산할 수 있어야했다. 

 그러던 중 어릴적에 했었던 한붓그리기가 떠올랐다. 여러개의 점을 하나씩 지나가며 결국은 하나의 도형을 만들어내는 놀이인 한붓그리기. 만약 사용자가 제스처를 생성할때 한붓그리기처럼 경로를 나타내는 점을 생성하고, 제스처를 사용할때는 그 경로와 얼마나 유사한지를 알아낸다면? 이러한 모티브를 통해서 로직을 짜게되었다.

## 로직의 구현

<br/>

1. 사용자는 제스처를 생성할때 그리는 경로를 나타내는 x,y좌표들이 담긴 배열을 DB에 저장한다.
2. 그리고 사용자가 해당 제스처를 사용할때는 사용자가 입력한 제스처의 x,y좌표들이
DB에 저장되어있는 x,y좌표들을 얼마나 포함하는가?를 계산한다.
3. 만약 일정 기준을 통과하면 제스처 사용, 통과하지 못하면 제스처 사용 실패를 판정한다.
4. 이를 그림으로 나타내면 다음과 같다.

    ![제스처 추가 설명](https://user-images.githubusercontent.com/99075014/200192143-4a1cd20e-036d-4061-be64-1180938f891d.png)
    
<br/>
<br/>

</details>

<details>
  <summary>삼각함수</summary>

## 로직의 모티브

 Portable TrackPad 프로젝트와 Gesture Drawing 프로젝트를 밀접하게 연결하기 위해서 만들었던 기능 중 하나는 Portable TrackPad에서 삼각형, 사각형, 원을 그리면 해당 모양을 인식해서 Gesture Drawing에서 그 모양을 출력해주는 것이었다. 하지만 작업을 시작하면서 사용자가 모양을 그렸을 때 모양을 인식하는 로직을 짜는 것이 생각했던 것보다 어렵다는 것을 깨달았다.

 어떤 방식으로 로직을 구현해야할지 고민하던 중, 사용자가 그리는 그림의 모서리의 개수를 계산해서 어떤 모양을 그리는지 확인하는 방법을 생각했고, 다음과 같은 로직을 짜게 되었다.

1. 사용자가 처음 터치한 곳의 x, y 좌표를 시작점과 기준점으로 저장한다.
2. 사용자가 그리기 시작하면, 기준점을 중심으로 가상의 사각형을 그려 사용자가 사각형 밖으로 나가는지 체크한다.     
3. 사용자가 사각형 밖으로 나가면, 기준점의 좌표와 현재 좌표를 계산한 좌표 changeX, changeY를 구한 뒤 atan2에 좌표값을 넣어 각도를 계산한다. 그리고 각도를 이전 각도와 비교해서 일정 값 이상 차이가 생긴 경우  모서리로 판단하고 count를 올린다.
4. 사용자가 터치를 끝냈다면, 시작점의 좌표와 마지막 터치한 곳의 좌표를 비교하여 도형을 완성했는지를 검사하고, 완성하지 못했다면 도형을 생성하지 않고, 완성했다면 모서리 개수에 해당하는 도형을 그려준다.

</details>

<br/>
<br/>

# 개별 회고

### 김태섭

<details>
  <summary>한줄평: 후회없던 3주</summary>
  
 코딩을 시작하면서 나는 막연한 꿈 하나를 가졌었다. “내가 원하는것, 내가 그리는것, 내가 필요로 하는것을 내가 직접 만들어낼 수 있으면 좋겠다.” 내 머릿속에만 존재하던 공상들이 실제로 사람들이 사용할 수 있는 유용한 도구로 실체화되는 그 쾌감은 언제나 나의 행동에 큰 동기가 되어주었다. 그래서 나는 항상 무언가를 만들어내는 것에 관심이 있고, 무언가를 보여주는것에 관심이 많았을지 모른다.

 이번 프로젝트는 그런 꿈을 처음으로 이루었던 순간들이었다. “내가 들고다니는 스마트폰을 언제 어디서나 트랙패드로 쓸 수 있다면 좋지않을까?” 코딩을 시작하기 한참전에 막연하게 생각했던 아이디어는 몇년이 지나 비로소 내 손으로 품게되었다. 언제나 무언가를 만들어내고, 구현하는 일상을 살아왔지만, 이번만큼은 느끼는바가 다른것같다. 내가 만든 프로그램이 다른 사람에게는 편리한 도구가 되어주고, 필요한 무언가가 되어줄 수 있다는게 참 묘한 느낌이다. 아직도 부족하다고 생각하는데도 무언가를 이루었다는 마음이 생기는것은 아마 우리가 만든 이 프로젝트가 그 자체로 의미를 가지기 때문이라 생각한다.

 나는 팀으로 함께 해나가는것의 의미는 “혼자였다면 볼 수 없었을 다른 시각”이라고 생각했다. 혼자서 무언가를 해나가게되면 프로젝트가 진행되어가면서 오로지 나의 시각만이 들어가기 쉽다고 생각했다. 때문에 목표까지 가는 길엔 갈등은 없을지라도 결과물의 단점들이 나중에서야 보이게 되곤한다. 하지만 팀이라면 다르다. 서로가 서로를 보면서 의견을 나누고, 갈등이 생기고, 다시 그 간극이 아물면서 점차 견고해지는 과정속에 프로젝트는 점차 퀄리티가 높아져간다.

 하지만 나는 이번 프로젝트를 하면서 “팀”이라는 의미를 하나 더 알아가는것같다. 바로 “서로를 채워준다”라는 의미이다. 이번 프로젝트를 진행하면서 나는 이제껏 무언가를 만들었던 순간들중 가장 힘겨운 시간을 보냈다. 매번 “나는 아직 너무 부족하구나…”, “내가 코딩으로 어떠한 의미를 만들기에는 아직 멀었구나…”라는 생각을 하게되었다. 똑같은 코드를 3시간동안이나 되짚어보기도하고, 이제껏 만들었던 로직을 다시 갈아엎는 순간도 있었다. 무엇이든 머릿속에 정리한 다음, 그 정리된 내용을 토대로 행동하는것을 좋아하는 나에게 기존 계획이 엎어지고 다시 새로 시작하는 과정은 나에게 소위 “멘붕”을 선사해주었다. 그래서 나는 더더욱 이 프로젝트를 혼자하게되었다면 완성을 할 수 있었을까? 하는 생각이 들었다.

 이러한 멘붕에 과정에서 도와준것은 바로 팀원들이었다. 나는 “무언가를 구현하기 위해서는 어떤 접근 방법으로 다가가야할까?”, “내 머릿속에 맴도는 공상을 실체화시키기위해서는 어떻게 해야할까” 생각하는것을 좋아한다. 하지만 이번 프로젝트에서는 나의 이러한 과정들이 하나 둘 막혀가기 시작하면서 힘든 순간들이 많았다. 이러한 순간에 팀원들은 그러한 나의 빈곳을 너무도 잘 채워주었다. 내가 알지 못했던 접근 방식을 공유해주고, 내가 해결하지 못했던 부분을 함께 고민하며 채워나가는 그 과정은 소위 말하는 “서로 힘을 합쳐 이겨낸다”에 정확히 부합하는 의미라 생각했다. 하나의 목표를 달성하기위해 서로 모든것을 불태울 각오로 정진하는 그 과정은 이 프로젝트를 하며 얻을 수 있었던 가장 큰 의미가 아닐까 생각한다.

 내가 힘들어 주저않아도 나를 일으켜 같이 달려줄 팀원이 있다는것, 그것이 바로 서로를 채워가는 이상적인 “팀”이 아닐까? 나는 아마도 그런 팀을 경험했던것이리라. 예전에는 팀으로 무언가를 한다고 했을때 처음 드는 생각은 “1 + 1이 과연 2일까?”였었다. 사람이 여럿 모인다고 무조건 사람 하나보다 나으리란 보장이 없기 떄문이다. 하지만 이번 프로젝트를 하면서 “1 + 1 + 1은 3, 그 이상일 수 있다”라는 생각을 하게되었다. 서로를 채워주며 함께 정진해가는 “팀”은 그 어떤 고난이 오더라도 포기하지않을 수 있는 “근거”가 되어준다. 그렇기 우리는 매일 새벽 첫차를 타면서도 피곤하지 않을 수 있었던것이 아닐까? 무언가를 함께 만들어 간다는것. 서로 포기하지않고 더 나아지려 노력한다는것. 이번 프로젝트는 나에게 너무나도 많은 의미를 가져다 주었다.

</details>

### 김병석

<details>
  <summary>한줄평: 언두리두 스쿠비두</summary>
  
 그간 해왔던 과제들도 어려웠던 나에게 3주라는 팀프로젝트는 정말 큰 부담으로 다가왔었다. 아이디어는 어떻게 하지? 내가 1인분은 할 수 있을까? 팀원들이랑 불화 없이 잘 해낼 수 있을까? 란 생각에 머리가 어지러웠다. 그런데 이번에 같이 프로젝트를 진행했던 팀원들이 정말 친절하고, 잘 이끌어줘서 부담을 덜할 수 있었다.

 새로운 기술 스택인 React Native를 처음 하는 팀프로젝트에서 써본다는 것은 생각보다 더 어려운 일이었다. 비록 React라는 이름을 달고 있지만 모바일 환경을 다룬다는 것은 다른 느낌이었기에 어려웠었다. 하지만 프로젝트를 진행하면서 조금씩 익숙해졌었고, 멀게만 느껴졌던 모바일 구현이 할 수 있을 것 같다는 생각으로 바뀌었다. 물론 아직 모르는건 많지만, 다음에 React Native를 마주하더라도 비교적 쉽게 시작할 수 있을 것이다.

 코로나에 걸린 건 정말 치명적이었다. 한번도 걸리지 않았던 코로나가 팀프로젝트를 할 때 찾아올 줄은 몰랐다. 억울하고 슬펐지만, 그래도 주어진 일은 최대한 하기 위해 노력했었다. 더불어 팀원들이 힘든 내색 않고 열심히 해주셔서 미안한 마음에 더욱 잘하고 싶다는 생각도 들었다. 팀원들에게 다시 한번 감사하다는 말씀을 드리고 싶다…

 로직을 구현한다는 것은 정말 생각해야할 것이 많았다. 코딩이 90%는 설계하고 실제 작성은 10%만 한다는 것이 무엇인지를 다시금 깨닫게 되었다. 그리고 그 중에 갑이 undo, redo 였다… 정말 쉽지 않았다.

</details>


### 이상아

<details>
  <summary>한줄평: 같이 하면 못할게 없지😎</summary>
  
처음에 팀플 하기 전엔 막연한 기대가 많았다. 같이 무언가를 만들어내면 얼마나 재미있을까? 다행이도 팀원들을 너무 잘 만나서… 큰 어려움 없이 즐겁게 잘 끝낼 수 있었다. 나에게 있어 제일 큰 난관은 팀원들과의 갈등이 아닌 들어보지도 못했던 새로운 기술들을 바로바로 구현해 내는 것이었다. 처음엔 공식문서를 보면서 새로운 것들을 익히기도 바쁜데 시간이 한정되어 있어 바로 코드를 적어가며 실시간으로 기술구현을 해내야 하는게 막막했는데, 그 때 팀원들의 도움을 많이 받았다. 아는 부분이 있으면 바로바로 공유하고, 막히는 부분이 있으면 어떤 문제가 있는지 체크해주며, 해결하지 못하면 밤을 새서라도 같이 도와주면서 해결했다. 나는 이 부분이 사실 너무 좋았다.  밤새 수많은 에러를 보면 스트레스도 많이 쌓이지만 팀원들과 머리 싸매고 고민해서 해결하면 서로 박수도 치고  격려도 해주고 등도 두들겨주고. 되돌아 보면 그 순간순간들이 많이 기억난다. 사실 팀원들의 도움을 많이 받으며 과제를 해서 개인 프로젝트를 어떻게 해야할 지 지금 걱정이 크게 앞서긴 하지만, 지금 상황에선 무사히 팀플을 잘 끝냈고, 너무 고마웠고 다들 수고 많이했다는 생각만 하기로 했다. 

</details>


<br/>
<br/>

# 참여 개발자

## 김태섭


Contact : serbi2012@naver.com

## 김병석


Contact: hallabong0126@gmail.com

## 이상아


Contact: comt-mix@gmail.com
