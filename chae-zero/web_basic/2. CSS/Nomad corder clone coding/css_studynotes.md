## 3.0 How to Add CSS to HTML

#### html과 css 코드를 함께 작성할 때

html 파일 안에서 css 코드를 함께 작성할 땐 <style> 태그 사용. 반드시 <head> 안에 와있어야 함

따로 css 파일을 만들 경우 <link />(self-close) 태그 사용.

href="파일명.css" re="stylesheet"로 링크 연결 후 해당 파일과의 관계를 적어줌

#### css 파일을 따로 만들어 연결해 사용할 때

따로 css 파일을 만들 경우 <link />(self-close) 태그 사용. href="파일명.css" re="stylesheet"로 링크 연결 후 해당 파일과의 관계를 적어줌

## 3.1 Writing Our First CSS Lines

#### 코드 작성 시 주의사항

- CSS가 하는 일은 HTML 태그를 가리키는 일. ("이 태그는 초록색", 우리가 가리키는 태그를 'selector'라고 함)
- CSS 작성에선 띄어쓰기를 하지 않음
- font-size:20px; 과 같이, 속성 다음 콜론(:), 값 다음 세미콜론(;)으로 닫아줘야 함

"속성이름:속성값;"

- 밑줄(\_) 또는 슬래쉬(/) 사용 불가
- css 또한 어떤 값이든 쓸 수 있으나, 속성에 맞는 값을 써야 브라우저에서 적용됨
- css 또한 모든 속성을 일일이 다 기억할 필요는 없음 -기본적으로 어떻게 동작하는지만 기억하면 됨

##### 요약

1. 태그를 지정
2. 원하는 속성값을 쓴다.

## 3.2 What Does Cascading Mean

#### CSS : Cascading Style Sheet

Cascading : 위에서 아래로 내려오는 이미지(폭포가 흐르는 것 떠올리기)

어떤 것 다음에 어떤 것이 온다 이것이 cascading이 의미하는 바다.

브라우저가 CSS 코드를 읽을 때 cascading 방식으로, 즉 위에 있는 코드부터 차례차례로 읽힌다.

위에서 아래로 읽는다는 브라우저가 CSS를 읽는 방법을 아는게 가끔 유용하다.

inline CSS와 external CSS 두 CSS 코드가 같은 대상을 가리키게 되면 어떻게 될까?

→ 브라우저는 위에서 아래로 코드를 읽으므로 마지막에 있는 코드가 우리에게 보여지게 된다.

가장 마지막으로 변경된 속성이 우리에게 보여진다.

그래서 코드의 순서를 바꾸면 최종적으로 보여지는 모습이 달라진다.

##### 요약

CSS는 위에서 아래로 작동한다. 결국 적용 되는 건 가장 마지막 코드다.

## 3.3 Blocks and Inlines

#### 블록이 아닌 것을 기억하라

1. div는 옆에 다른 div가 오지 않는다.
2. span은 옆에 다른 span이 올 수 있다.
3. link도 옆에 다른 게 올 수 있다.
4. p는 옆에 올 수 없다. (블록이기 때문)
5. 옆에 다른 요소가 못 오는걸 block
   올 수 있는걸 inline라고 한다. (in the same line)
6. inline의 대표적인 태그 <span>, <a>, <img>

## 3.4 Margin Part One

#### Block의 특징(margin, padding, border)

block에서 inline으로 inline에서 block으로 바꾸는게 가능할까? → 가능하다

이렇게 하는 걸 display 속성이라고 한다.

기본적으로 span의 display 속성은 inline이다. 이걸 block으로 바꿔주면 span도 block이 된다.

그렇다면 div를 inline으로 바꾸면 어떤 일이 일어날까? → div가 사라진다.

이유는 어떤 요소가 inline이면 그 요소는 높이와 너비를 가질 수 없기 때문이다.

높이와 너비가 없고 내용도 없기 때문에 사라져 보인다. 내용이 있으면 그 내용만큼의 크기를 가지고 보여지게 된다.

inline은 높이와 너비가 없고, block은 높이와 너비가 있다.

block의 엄청난 특징 3가지는 다음과 같다.

브라우저는 요소들에게 원치 않아도 많은 style 속성을 준다.

user agent stylesheet : 브라우저가 기본적으로 준 style 속성

1. **margin : box의 border의 바깥에 있는 공간**
2. padding
3. border

## 3.5 Margin Part Two

#### 마진 상쇄(겹침)

방향 설정 없이 margin 하나를 주면 사방에 전부 다 적용된다.

두 개를 줄 경우 상하, 좌우 이다.

네 개를 줄 경우 시계방향 순으로 적용된다. (상 우 하 좌)

Collapsing margin 현상 (상하에서만 발생함)

body안에 div의 위 아래 마진이 body의 위 아래 마진과 만나면(두 경계가 만나면), 둘 중 더 큰 값의 마진이 body에 적용되며 body 와 div margin은 하나로 취급된다.

"마진 상쇄에 대한 설명"
https://velog.io/@raram2/CSS-%EB%A7%88%EC%A7%84-%EC%83%81%EC%87%84Margin-collapsing-%EC%9B%90%EB%A6%AC-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4

## 3.6 Paddings and IDs

#### 박스에게 마진은 외투, 패딩은 내복

- padding은 margin과 반대 개념이다.

- padding은 box의 경계로부터 '안쪽'에 있는 공간이다.

- 값의 개수에 따라 적용되는 방향은 margin과 동일하다.

- 여러 div를 생성했을 때 'id'를 이용하여 div들을 구분할 수 있고, 각각 다른 속성을 적용시킬 수 있다.

- CSS로 first div에 속성을 적용 시킬 땐, #first {} , #과 아이디 사이에 공백이 있으면 안 된다.

```html

    <style>
      body {
      #first {
        background-color: whitesmoke;
        width: 150px;
        height: 150px;
      }
    </style>
  <body>
    <div id="first">
  </body>
```

- 이는 body, span 등에서도 마찬가지다.

- CSS 코드의 id명은 unique 해야 하고 HTML 코드에서 썼던 id명과 같아야 한다.

##### 요약

Collapsing Margin를 해결하기 위한 방법은 Padding을 사용하여 body 구역과 box구역의 경계를 만들어 주는 것이다.

- 크롬에서는 이 padding구역을 녹색으로 따로 표현하였다.

## 3.7 Border

#### border: box의 경계

- border 종류는 많은데 다 못생겨서 거의 한 종류의 border만 씀
- border 굵기(line-width), 종류(style), 색상(color) 순으로 입력
- style 종류: solid - 실선, dashed - 점선
- inline과 block 모두 적용됨

css의 cascading 특징을 이용해서, 한개의 border style만 바꾸고 싶으면 먼저 \*를 이용해서 전체 다 스타일 준 뒤에 밑에 해당 요소만 다른 style 주면 그거만 바뀜. 해당 요소에서 코드를 전부 다시 쓸 필요 없이 바꿀 코드만 작성하면 됨.

모든 요소에 border 주고 싶으면 *을 이용. *는 전체를 뜻함.

## 3.8 Classes

#### inline에서의 margin & padding

1. padding은 span에 적용 된다.

2. span은 inline 속성이다.

3. inline 속성은 높이와 너비가 없으므로 margin을 적용할 경우 좌, 우에만 적용된다.

- 이와 같은 상황에 margin을 위, 아래에 적용하고 싶다면, inline 요소를 block으로 바꿔줘야 한다.

4. class는 여러개의 속성들이 공용으로 사용할 수 있는 스타일 형식이다.

5. 여러 개의 속성에 같은 스타일을 적용하고 싶을 때 사용한다.

6. class는 .속성 으로 사용한다.

- id⇒ #tomato는 id="tomato"
  -class⇒ .tomato는 class="tomato"

7. id명과 다르게 class명은 여러 요소들이 같이 쓸 수 있다.

- class 속에는 btn과 tomato를 연이어 넣어 각각 다른 class 속성을 동시에 부여할 수도 있다.

## 3.9 Inline Block

#### display: inline-block;

block 속성을 inline로 바꾸고, width와 height를 갖게 하고 싶을 때는 inline-block을 사용한다.

##### 예시

div는 너비와 높이를 가질 수 없으므로, div를 inline-block으로 display해준다

하지만 많은 문제가 있고, 오래됐기 대문에 잘 사용하지 않음.
(반응형 디자인을 지원하지 않는다.)

## 3.10 Flexbox Part One

#### Flexbox란?

flexbox는 박스들을 어떤 곳이든 둘 수 있어서 좋음. 아주 유연하다. 2d(2차원) 레이아웃에서 잘 작동한다.

사용시 3개의 규칙이 있다.

1. 자식 엘리먼트에는 어떤 것도 적지 말아야 한다. 부모 엘리먼트에만 명시.

박스들을 우리가 원하는 곳으로 움직이게 하려면 부모 엘리먼트를 flex container로 만들어야 함. display: flex;

3. justify-content: 값; 으로 화면 크기에 따라 자유롭게 배치가 된다.

4. flex container는 두개의 축을 가진다. 주축(main axis)과 교차축(cross axis).
   디폴트로는 주축은 수평이고, 교차축은 수직이다.

5. justify-content: 값;는 주축에 적용되고, align-items: 값;은 교차축에 적용된다.

6. 주축은 수평으로 디폴트가 설정되어 있고 교차축은 수직으로 설정되어 있으며 나중에 바꿀 수도 있다.

7. 만약 body가 height를 가지고 있지 않다면, align-items를 설정하더라도 바뀌지 않다.
   이미 맨 위아래를 차지하고 중심에 있으니까.
   이 경우에는 flex컨테이너에 height를 추가하면 된다. 예) height: 100vh;

8. vh단위는 viewport(screen) height라는 지표다. 화면 크기에 따라 다르다. height: 100vh;는 화면 높이의 100%를 의미. 따라서 아이폰, 맥, 더 큰 화면 모두에서 화면에 맞춰 모양이 바뀜

9. vw: 보여지는 스크린 폭에 맞춰서 움직임 100vw(보여지는 스크린 폭의 100%)

## 3.11 Flexbox Part Two

#### Flex-direction & wrap

1. justify-content나 align-items의 default를 변경하기 위해선, 'flex-direction'을 수정하면 된다.

2. flex-direction에는 두 가지 속성, column과 row가 있다.

3. display를 flex로 했을 때 default는 row이다. 따라서 flex-direction: column;을 주면 주축과 교차축이 반전된다.

4. 원하는만큼 flex 부모-자식 엘리먼트를 만들어낼 수 있다.

5. flex-wrap: nowrap;을 통해 wrapping이 일어나지 않게 할 수 있다.

6. flexbox는 width값을 초기 사이즈로만 여기고, 모든 엘리먼트를 같은 줄에 있게 하기 위해 width를 바꾸기도 한다.

7. flex-direction: column-reverse; 밑에서 시작해서 위로 올라가게 한다.(마찬가지로 row-reverse도 있다.)

8. flex-wrap: wrap-reverse; 또한 있는데, 브라우저를 줄일 때, 엘리먼트가 겹쳐지는 위치가 역전된다.

## 3.12 Fixed

#### fixed와 미세 조정

1. position fixed를 이용하면 스크롤해도 항상 제자리에 머무른다.

2. 처음 만들어진 자리에 고정 되지만 top, left, right, bottom 중 하나만 수정해도 서로 다른 레이어에 위치하게되어 원래 위치가 무시된다.

3. positon fixed를 이용하면 가장 위에 위치하게 된다. (맨 앞)

## 3.13 Relative Absolute

#### Relative & Absolute

1. positon: static (default)

2. position: fixed

- element가 처음 생성된 자리에 고정.

3. position: relative;

- element가 '처음 생성된 위치'를 기준점으로, top bottom left right으로 위치를 조금씩 수정할 수 있다.

4. position: absolute;
   가장 가까운 relative 부모를 기준으로 이동
   position:relative; 를 해주면 부모가 된다.

5. 부모, 조상 요소에 position이
   지정이 되어 있지 않았을 때,
   position: absolute인 자식 요소의 위치가
   body를 기준으로 움직이는 게 아니라
   초기 컨테이닝 블록 = viewport = 현재 화면 영역의 크기를 기준으로 움직인다.

## 3.14 Pseudo Selectors part One

#### pseudo selector

기존 방법 : 태그, id w/#, class w/.

psuedo selector는 세부적으로 엘리먼트를 선택해 주는 것!

복잡한 엘리먼트 지정 과정을 pseudo selector로 간소화할 수 있음

ex>

```css
div:first-child {
  background-color: tomato;
}

div:last-child {
  background-color: teal;
}
```

1. id나 class를 따로 만드는것보다 이렇게 지정하는게 훨씬 좋은 방법
   (css에서만 선택하면 되고 html 코드를 고칠 필요가 없음)

2. n번째 태그 수정하기: nth-child(n)

```css
span:nth-child(2) {
  background-color: teal;
}
span:nth-child(even) {
  //or odd ( 홀수 )
  background-color: teal;
}
```

even은 모든 짝수번째 요소를 한꺼번에 바꿀 수있다

```css
span:nth-child(5n + 1) {
  background-color: silver;
}
```

n을 사용하면 매우 편하다

##### live Server 사용하시면서 last-child 지정 안되는 이유는?

Live Server 가 Body 태그 안쪽 맨 아래에 보이지 않는 스크립트 태그 ( 또는 어떤 것 ) 을 만들기 때문에 더이상 div가 last-child가 아닙니다.

## 3.15 Combinators

#### 다양한 Combinator

부모 자식 {} → 부모의 inside
부모 > 바로 밑 자식 {} → 부모의 under
비슷한 A1 + A2 {} → A1의 next

### 적용 방법

1. div의 자식 span들을 모두 찾아서 효과를 주는 방법

div span {
text-decoration : underline;
}

-> div밑에 있는 모든 span에 효과가 적용됨
-> 바로 밑 자식이 아니어도 div 안에 포함되는 모든 span을 찾아줌

2. div의 바로 밑 자식 span에만 효과를 주는 방법

div > span {
text-decoration : underline;
}

이렇게하면오로지 바로 밑의 자식만 건드림

3. 형제에게 효과를 주는방법

p + span {
color: black;

}

p 다음에 오는 span의 색을 검정색으로 바꿔줌

- 를 사용하면 자신 바로 밑에 있는형제에게 영향을 끼칠 수 있다.

5. 만약 p, address, span 순으로 형제관계가 형성되어있는데 p 아래 쪽 span에게 효과를 주고 싶다면?

p ~ span 으로 쓰면 바로 밑 형제가 아니더라도 적용 가능(p + span을 쓰면 중간에 address가 있기 때문에 효과가 적용되지 않음)

## 3.16 Pseudo Selectors part Two

#### Attribute selectors 특성 선택자

- 기본 형태의 input과 required input이 있다면, input:required{}를 통해서, required input에만 속성을 적용시킬 수 있다.

```css
input {
  border: 1px solid wheat;
}
input:required {
  border-color: tomato;
}
 /*...*/
<form>
  <input type="text" placeholder="first name" />
  <input type="text" placeholder="last name" />
  <input type="password" required placeholder="password"/>
</form>
```

- input{} 을 통해, [input 이름]에 해당하는 input 속성을 따로 줄 수 있다.
- 여기서, input[placeholder="First name"]은 First name에만 속성을 주지만, input[placeholder~="name"]은 name이 들어가는 모든 input에 속성을 부여할 수 있다.

```css
input[placeholder~='name'] {
  ~
}
/* '~='의 경우엔 name 앞뒤에 공백이 하나라도 있어야만 적용됨 */
/*~는 독자적인 단어, 어구 "name"을 잡아주는 것이고
*는 어떤 문장이든 name를 포함하고 있으면 다 선택. rename, ringname, adsfsfnameadsfd 등등등...*/
```

- "~="은 name을 포함하고 있다는 의미가 되는 것이다.
- a[href$=".org"] → "$="는 ".org"로 끝나는 모든 anchor를 선택할 수 있다.
- attribute selectors를 이용하면, class를 지정할 필요 없이 CSS만으로 각각의 속성을 부여해줄 수 있다.

## 3.17 States

#### Active, hover, focus, focus-within, visited

1. active
   : 해당 요소를 마우스로 클릭했을 때 효과를 적용

2. hover
   : 마우스가 해당 요소 위를 지나갈 때 효과를 적용

3. focus
   : 키보드로 선택되었을 때 효과를 적용

4. focus-within
   : 부모 요소에게 적용. 자신의 자식 요소 중 하나가 focused되었을 때 효과를 적용

5. visited
   : 방문한 사이트일 경우에 효과를 적용

6. 조건을 나열해 여러 상황을 동시 설정할 수 있음.

예) high-tag:hover low-tag:focus{

}

인 경우, 상위 요소위에 마우스 커서가 있고, 하위 요소가 focused되었을 때 효과를 적용하게 된다.

and 의 개념

## 3.18 Recap

#### 총정리

1. :: placeholder (0:46)
   : placeholder의 특성만 바꾸고 싶을 때 사용

2. :: selection (1:31)
   : 클릭해서 긁을 때(1:58) 발생

3. :: first-letter
   : 첫 글자에만 적용

4. ::first-line
   : 첫 줄에만 작용

#### States 총정리

1. active
   : 클릭할 때 작동 (예: 버튼 클릭 시 색깔 변함)

2. hover
   : 마우스 커서를 올려놓으면 작동 (예: 글자 위에 마우스 커서 올려두면 색상 변함)

3. focus
   : element가 focused된 상태

4. visited
   : 방문한 사이트임을 나타낼 때 유용

5. focus-within
   : focus되는 children이 있으면 작동
   div: focus-within {background-color: cyan}이면, div의 children이 focus 될 때 {}가 작동

- form: hover input: focus{} 의 경우엔 두 조건 모두 만족해야 {} 안이 실행

## 3.19 Colors and Variables

#### Color system

1. hexadecimal color (16진수 컬러)
   #000000 <

2. RGB 방식
   rgb(252,206,0);
   rgba (205,23,0, 0.5);

(4번째 알파 = opacity)

#### Variable (custom properties )

1. :root 라는 엘리먼트에 변수 추가

:root은 기본적으로 모든 document의 뿌리

만일 --main-color라고 변수명을 주고
이것을 document의 root에 저장하면 일일히 컬러를 직접 지정해줄 필요 없이 var(--main-color)와 같은 형식으로 불러와서 두고두고 사용 가능

2. 변수명 앞에 반드시 --를 붙여줘야 함
   -- + 변수명

빈공간이 있다면 -로 채워야 함
--default-border: 1px solde var(--main-color);

그 다음 이 변수를 사용할 곳에
p {
background-color: var(--main-color);
}
a {
background-color: var(--main-color);
}

컬러 외에도 다양한 것들을 variables로 관리 가능
