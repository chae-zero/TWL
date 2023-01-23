# JS의 특징

**html을 제어하는 언어, html 위에서 작동하는 언어**

1. // in-line comment -> 일반 주석

2. /_ this is a multi-line comment_/ -> /_, _/ 사이에 여러 줄의 주석 작성 가능

3. 사용자와 상호작용
   웹 브라우저는 한 번 출력이 되면 자기 자신을 바꿀 수 있는 능력이 없음
   자바스크립트는 버튼에 따라 자기 자신의 디자인을 바꿀 수 있게 해줌

(웹페이지 - 오른쪽 버튼 - '검사' - 'elements'(= 태그) 눌러서 실험해보기)

# JS 활용

1. JS를 시작할 것임을 선언

```html
<script>
  document.write("hello world"); // 세미콜론 붙여주기
</script>
```

2. html과의 차이점

1+1 입력시

- html: 1 + 1 출력
- js: 2 출력

(눈에 보이는 결과는 같지만, html은 정적, js는 동적)

3. 이벤트

onclick, onchange 등의 속성 활용. 속성값으로는 반드시 js 코드가 와야 함

- 웹 브라우저는 해당 속성값을 기억하고 있다가 속성이 위치하고 있는 태그를 사용자가 클릭했을 때, 기억하고 있던 js 코드를 해석해서 그에 맞는 결과를 도출

(javascript keydowm event attributes 검색)

4. 콘솔을 활용해 JS를 실행하는 방법

- 파일을 만들지 않고 'f12 > 콘솔'에서 js 코드 직접 실행

- element 메뉴에서 esc 누르면 콘솔창이 함께 뜸(콘솔창 없애고 싶으면 다시 한 번 esc)

- 한 번 실행한 코드를 재실행하거나 수정하고 싶다면, 위쪽 화살표 키 눌러주면 됨

# Data types and Variables

## Data Types: undefined, null, boolean, string, symbol, number, object

- 가장 일반적인 것은 string & number
- undefined: 아무것도 설정하지 않은 변수가 있을 경우
- null: 설정은 했지만 아무 값도 넣고 싶지 않을 경우
- symbol: 고유한 불변의 기본 값
  (immutable primitive value that is unique)
- object: 다양한 key value pairs 저장 가능

-변수를 사용하면 데이터들을 동적으로 저장하고 조작할 수 있음
(데이터를 가리키는 label)

## Declare a variables

1. var 사용

- 전체 프로그램에서 사용 가능
- 다만 메모리 낭비가 있어서 지양하는 게 좋음

```html
<script>
  var myName = "Beau";
</script>
```

- 변수 값을 바꾸고 싶을 땐 재선언

```html
<script>
  var myName = "Beau";

  myName = 8; // 숫자형으로 변환
</script>
```

2. let 사용

- 선언한 범위 내에서만 사용 가능
- let으로는 같은 변수를 두 번 선언할 수 없음

```html
<script>
  let ourName = "FreeCodeCamp";
</script>
```

3. const 사용

- 절대로 변경하면 안 되는 변수
- 변경 시도할 경우 error 발생

```html
<script>
  const Pi = 3.14;
</script>
```

## Storing Values with Assignment Operator

할당 연산자로 값 저장하기

- **변수 선언**과 **변수 할당**에는 차이가 있음

```html
<script>
  var a; //세미콜론을 쓰지 않아도 실행은 되지만,코드의 끝을 알리기 위해 붙여주는 것이 약속
  var b = 2;

  a = 7;

  b = a;

  console.log(a);
</script>
```

1.  var b = 2;

- 2가 b에 할당되고 있음을 의미
- b가 곧 2는 아님

2. b = a

- a의 내용을 b에 할당

3. console.log(a)

- 콘솔에서 원하는 항목을 볼 수 있음
- 다양한 위치에서 어떤 변수가 있는지, 해당 변수에 할당된 값이 무엇인지 확인 가능

## Initializing Variables with Assignment Operator

할당 연산자로 변수 초기화하기

```html
<script>
  var a = 9;
</script>
```

- a를 다시 변수로 선언함과 동시에 새로운 연산자 할당

## Uninitialized Values

```html
<script>
  // 아직 정의되지 않은 변수(var 변수명;)에 연산자 할당
  var a = 5;
  var b = 10;
  var c = "I am a";
  // 원하는 값으로 변형
  a = a + 1; // 5 + 1
  b = b + 5; // 10 + 5
  c = c + "String!"; // "I am a String!"
</script>
```

## Case Sensitivity in Variables

변수의 대소문자 구분

- JS의 변수명에서는 대소문자 구분이 중요
- 첫 번쨰 문자는 반드시 소문자로 시작
- 주로 Camel Case(각 단어의 시작 부분만 대문자)

```html
<script>
  // Declarations
  var studlyCapVar;
  var properCamelCase;
  var titleCaseOver;
  // Assignments
  var studlyCapVar = 10;
  var properCamelCase = "A String";
  var titleCaseOver = 9000;
</script>
```

## Adding/Subtracting Numbers

연산자로 숫자형 데이터 +, -, \*, /, %, 등

```html
<script>
  var sum = 10 + 27;
  var sum = 10 - 27;
  var multi = 10 * 27;
  var div = 10 / 27;
  var remainder = 11 % 3;

  console.log(sum); // sum 값을 보여줌
</script>
```

## Incrementing/Decrementing Numbers

++, --, +=, -= 연산자 활용
(곱셈, 나눗셈도 동일한 방식으로 활용 가능)

```html
<script>
  var myVar = 87;

  myVar = maVar + 1;
  myVar++; // 같은 결과로, 원래 값에 1을 더해줌
  myVar += 12; // 원래 값에 12를 더해줌

  myVar--; // 1을 빼줌
  myVar -= 12; // 원래 값에서 12를 빼줌
</script>
```

## Decimal Numbers

소수

- 연산 방식은 정수 데이터와 같음

```html
<script>
  var ourDecimal = 5.7;
  var myDecimal = 0.009;
</script>
```

## Literal Quotes

-`(backticks) 활용하면 작은 따옴표, 큰 따옴표 모두 사용 가능

- 파이썬 f-string과 유사
- '""', "''" 꼴로 활용하면 백슬래시 안 붙여줘도 됨

## Escape Sequences

\': single quote
\": double quote
\\: backslash
\n: newline
\r: carriage return
\t: tab
\b: backspace
\f: form feed

### Length of a String

```html
<script>
  var firstNameLength = 0;
  var firstNAme = "Ada";

  firstNameLength = firstName.length; // .length: 해당 문자열의 길이를 알려줌
  var lastNameLength = 0;
  var lastName = "Lovelace";

  lastNameLength = lastName.length;
</script>
```

## Bracket Notation

파이썬 인덱싱([])과 유사

- 문자열의 마지막 문자 확인 방법

```html
<script>
  var myStr = "Jello world";
  myStr;
</script>
```

## String Immutability

문자열의 불변성

- 문자열 자체는 변경할 수 있지만, 어떤 문자열이 할당되었을 때 문자열 내 개별 문자를 변경할 수는 없음

```html
<script>
  var firstNAme = "Ada";

  var lastLetterOfFirstNAme = firstName[firstName.length - 1]; // 문자열 길이 - 1 : 마지막 문자의 인덱스 번호
</script>
```

## Word Blanks

```html
<script>
    function wordBlanks(myNoun, myAdjective, myVerb, myAdverb) {
      var result = "";
      result += "The " + myAdjective + " " + myNoun + " " + myVerb + " to the store " + " " + myAdverb + ".";
  " " +
      return result;
    }

    console.log(wordBlanks("dog", "big", "ran", "quickly")) // The big dog  ran to the store quickly.
    console.log(wordBlanks("bike", "slow", "flew", "slowly")) // The slow bike flew to the store slowly.
</script>
```

## Arrays, Nest Arrays

[], [[]] (일차원 리스트와 중첩 리스트)

- array에서는 인덱싱을 활용한 데이터 대체가 가능 (문자열에서는 불가능했었음)

```html
<script>
  var myArray = [18, 64, 99];
  myArray[1] = 45; // [18, 45, 99]

  var lastLetterOfFirstNAme = firstName[firstName.length - 1]; // 문자열 길이 - 1 : 마지막 문자의 인덱스 번호
</script>
```

```html
<script>
  var myArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [[10, 11, 12], 13, 14],
  ];

  var myData = maArray[0][0]; // 1
  var myData = maArray[2][1]; // 8
</script>
```

## Manipulate Arrays with push(), pop()

배열 조작

1. **push()**: 배열 끝단에 새로운 값 더하기

```html
<script>
  var ourArray = ["Stimpson", "J", "cat"];
  ourArray.push(["happy", "joy"]); // ["Stimpson", "J", "cat", ["happy","joy"]]

  var myArray = [
    ["John", 23],
    ["cat", 21],
  ];
  myArray.push(["dog", 3]);
</script>
```

2. **pop()**: 배열 마지막 값 제거하기

```html
<script>
  var ourArray = ["Stimpson", "J", "cat"];
  ourArray.pop(); // ["Stimpson", "J"]
</script>
```

3. **shift()**: 배열 첫 번째 값 제거하기

```html
<script>
  var ourArray = ["Stimpson", "J", "cat"];
  ourArray.shift(); // ["J", "cat"]

  var myArray = [
    ["John", 23],
    ["cat", 21],
  ];
  myArray.shift(); // [["cat", 21]]
</script>
```

4. **unshift()**: 배열 앞단에 요소 추가

```html
<script>
  var ourArray = ["Stimpson", "J", "cat"];
  ourArray.unshift(["happy", "joy"]); // [["happy","joy"], "Stimpson", "J", "cat"]

  var myArray = [
    ["John", 23],
    ["cat", 21],
  ];
  myArray.unshift(["dog", 3]); // [["dog", 3], ["John", 23], ["cat", 21]]
</script>
```

## Shopping list

```html
<script>
  var myList = [
    ["cereal", 3],
    ["bananas", 2],
    ["eggs", 5],
  ]; // 쇼핑 리스트 작성
</script>
```

## Write Reusable with Functions

```html
<script>
  function ourReusableFunction() {
    condole.log("Heyya World!");
  }

  ourReusableFunction();
  ourReusableFunction();
  ourReusableFunction();
  ourReusableFunction(); // Heyya World! 를 네 번 출력
</script>
```

## Arguments

인자를 사용해 함수에 값 전달하기

```html
<script>
  function ourReusableFunction(a, b) {
    condole.log(a - b);
  }

  ourReusableFunction(10, 5); // 5
</script>
```

## Global Scope / Local Scope

전역변수 / 지역변수

- JS 코드의 모든 위치에서 볼 수 있음을 의미
- 함수 외부에서 설정된 변수는 전체 코드 어디에서나 볼 수 있음
- 함수 내부에서 설정된 변수는 해당 함수 내부(로컬)에서만 볼 수 있음

1. 전역변수

```html
<script>
  var myGlobal = 10;

  function fun1() {
    oopsGlobal = 5; // var 키워드를 붙이지 않으면 함수 내에 있어도 전역에서 볼 수 있음
  }

  function fun2() {
    var output = "";
    if (typeof myGlobal != "undefined") {
      output += "myGlobal: " + myGlobal;
    }
    if (typeof oopsGlobal != "undefined") {
      output += "oopsGlobal: " + oopsGlobal;
    }
    console.log(output);
  }

  fun2();
</script>
```

2. 지역변수

```html
<script>
  function myLocalScope() {
    var myVar = 7;
    console.log(myVar); // fun1() 함수 내에서만 볼 수 있음
  }

  myLocalScope();
</script>
```

3. 전역 vs 지역

- 한 함수 내에서 전역변수와 지역변수를 함께 쓸 경우, 지역변수가 전역변수보다 우선

```html
<script>
  var outerWear = "T-shirt";

  function myOutfit() {
    var outerWear = "Sweater";

    return outerWear;
  }

  console.log(myOutfit()); // 지역변수가 우선이므로, "Sweater" 출력
  console.log(outerWear); // "T-shirt" 출력
</script>
```

## Return a Value from a Function

```html
<script>
  function minusSeven(num) {
    return num - 7;
  }

  console.log(minusSeven(10)); // 3

  funtion timesFive(num) {
    return num * 5;
  }

  condole.log(timesFive(5)); // 25
</script>
```

## Undefined Value returned

```html
<script>
  var sum = 0;
  function addThree() {
    sum += 3;
  }

  funtion addFive() {
    sum += 5;
  }
  // return 하지 않았기에 아직까지는 정의되지 않은 상태
</script>
```

## Assignment with a Returned Value

```html
<script>
  function change(num) {
    return (num + 5) / 3;
  }

  changed = change(10);

  var processed = 0;

  function processArg(num) {
    return (num + 3) / 5;
  }

  processed = processArg(7);

  console.log(changed); // 5
  console.log(processed); // 2
</script>
```

## Stand in Line

- Queue
  : 항목이 순서대로 유지되는 추상 데이터(Abstract Data) 구조
  : 큐의 뒷면에 새 항목을 추가할 수 있고, 큐의 앞면에서 이전 항목을 제거할 수 있음
- JSON 모듈의 stringify

```html
<script>
  function nextInLine(arr, item) {
    arr.push(item);
    return arr.shift();
  }

  var testArr = [1, 2, 3, 4, 5];

  console.log("Before: " + JSON.stringify(testArr)); // Before: [1,2,3,4,5]
  console.log(nextInLine(testArr, 6)); // 1 (testArr.shift(): tsetArr의 첫 번째 값인 1을 반환)
  console.log("After: " + JSON.stringify(testArr)); // After: [2,3,4,5,6]
</script>
```

## If Statements

```html
<script>
  function ourTrueOrFalse(isItTrue) {
    if (isItTrue) {
      return "Yes,it's true";
    }
    return "No, it's false";
  }

  function trueOrFalse(wasThatTrue) {
    if (wasThatTrue) {
      return "Yes, that was true";
    }
    return "No, that was false";
  }

  console.log(trueOrFalse(true)); // Yes, that was true
</script>
```

```html
<script>
  function testEqual(val) {
    if (val == 12) {
      return "Equal";
    }
    return "Not Equal";
  }

  console.log(testEqual(10)); // Not Equal
</script>
```

## Comparison with the Strict Equality Operator

- ===: 보다 엄격한 항등 연산자, 3이 3과 같은지 확인
- 항등 연산자의 부정: !=
- 엄격 항등 연산자의 부정: **!==**

```html
<script>
  function textStrict(val) {
    if (val === "10") {
      return "Equal";
    }
    return "Not Equal";
  }

  testStrict(10); // 문자열 '10'과 정수 '10'은 다르므로 "Not Equal" 출력
</script>
```

연산 예시 1

```html
<script>
  function compareEquality(a, b) {
    if (a == b) {
      return "Equal";
    }
    return "Not Equal";
  }

  console.log(compareEquality(10, "10")); // 일반 항등 연산자이므로  10과 '10'을 같은 것으로 추정, 문자열을 숫자형으로 반환 후 "Equal" 반환.
</script>
```

연산 예시 2

```html
<script>
  function compareEquality(a, b) {
    if (a === b) {
      return "Equal";
    }
    return "Not Equal";
  }

  console.log(compareEquality(10, "10")); // 엄격 항등 연산자이므로 유형 변환 없이 10과 '10'을 다른 것으로 추정, "Not Equal" 반환.
</script>
```

## And / Or Operators

- && 연산자

```html
<script>
  function testLogicalAnd(val) {
    if (val <= 50 && val >= 25) {
      // && 연산자를 활용해 and 판별
      return "Yes";
    }

    return "No";
  }

  console.log(testLogicalAnd(10)); // No
</script>
```

- || 연산자

```html
<script>
  function testLogicalOr(val) {
    if (val < 10 || val > 20) {
      // || 연산자를 활용해 or 판별
      return "Yes";
    }

    return "No";
  }

  console.log(testLogicalOr(25)); // Yes
</script>
```

## Else / Else If

- 순서가 중요
- 만일 if 의 조건이 val < 10이고, else if의 조건이 val < 5 라면, val에 3이 할당되었을 때 if 문의 조건을 이미 충족하므로 else if 문까지 가지 않음.
- else if 문은 여러 개 붙을 수 있음

```html
<script>
  function testElse(val) {
    var result = "";

    if (val > 5) {
      result = "Bigger  than 5";
    } else if (val < 5) {
      result = "Smaller than 5";
    } else {
      // 줄바꿈 없이 바로 뒤에 붙여주기
      result = "5";
    }

    return result;
  }

  testElse(4); // Smaller than 5
  testElse(5); // 5
  testElse(10); // Bigger than 5
</script>
```

## Switch Statements

```html
<script>
  function casaInSwitch(val) {
    var answer = "";
    switch (val) {
      case 1: // val === 1일 때 (염격 항등 연산자 적용)
        answer = "alpha"; // 가독성을 위해 들여쓰기
        break;
      case 2:
        answer = "beta";
        break;
      case 3:
        answer = "gamma";
        break;
      case 4:
        answer = "delta";
        break;
      default: // 위의 어떤 case에도 해당하지 않을 때 내놓을 디폴트 값 설정
        answer = "stuff";
        break;
    }

    return answer;
  }

  console.log(caseInSwitch(1)); // alpha
  console.log(caseInSwitch(2)); // beta
  console.log(caseInSwitch(3)); // gamma
  console.log(caseInSwitch(4)); // delta
  console.log(caseInSwitch("abc")); // stuff
</script>
```

- 여러 case에 같은 값을 적용하고 싶을 경우

```html
<script>
  function sequentialSizes(val) {
    var answer = "";
    switch (val) {
      case 1:
      case 2:
      case 3:
        answer = "Low";
        break;
      case 4:
      case 5:
      case 6:
        answer = "Mid";
        break;
      case 7:
      case 8:
      case 9:
        answer = "High";
        break;
    }
  }
</script>
```

- if/else if 문을 switch 문으로 바꾸는 게 편할 때도 있음

## Returning Boolean Values from Functions

- if 문 활용할 경우

```html
<script>
  function isLess(a, b) {
    if (a < b) {
      return true;
    } else {
      return false;
    }
  }

  isLess(10, 15);
</script>
```

- if 문을 사용하지 않는 경우(권장)

```html
<script>
  function isLess(a, b) {
    return a < b; // a < b 가 true일 경우엔 true, 아니면 false 반환
  }

  console.log(isLess(10, 15));
</script>
```

## Return Early Pattern for Functions

```html
<script>
  function abTest(a, b) {
    if (a < 0 || b < 0) {
      return undefined;
    }

    return Math.round(Math.pow(Math.sqrt(a) + Math.sqrt(b)), 2); // sqrt는 제곱근(루트), pow는 제곱
  }

  abTest(2, 2); // 8
  abTest(-2, 2); // undefined
</script>
```

## Card Counting

```html
<script>
  var count = 0; // 전역변수 선언

  function cc(card) {
    switch (card) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        count++;
        break;
      case 10:
      case "J":
      case "Q":
      case "K":
      case "A":
        count--;
        break;
    }

    var holdbet = "Hold"; // 지역변수 설정
    if (count > 0) {
      holdbet = "Bet";
    }

    return count + " " + holdbet;
  }

  cc(2);
  cc("K");
  cc(10);
  cc("K");
  cc("A"); // -3
  console.log(cc(4)); // -3 + 1 = -2, 출력값: -2 Hold
</script>
```

## Build Objects

```html
<script>
  var ourCat = {
    name: "Miu",
    legs: 4,
    tails: 1,
    MBTI: "CUTE",
    friends: ["everything!"], // 모든 datatype 가능
  };

  var theirCat = {
    name: "Mike",
    legs: 3,
    tails: 2,
    MBTI: "FINE",
    friends: [],
  };

  var ourCatTails = ourCat.tails; // 1
  var ourCatMbti = ourCat.MBTI; // CUTE

  // 인댁싱도 가능
  var ourCatTails = ourCat["tails"]; // 1
  var ourCatMbti = ourCat["MBTI"]; // CUTE

  var isTail = "tails";
  var ourCatTails = ourCat[isTail]; // 1
</script>
```

- 개체 속성 업데이트하기: 변수명.키 값 = 대체값

```html
<script>
  var ourCat = {
    name: "Miu",
    legs: 4,
    tails: 1,
    MBTI: "CUTE",
    friends: ["everything!"], // 모든 datatype 가능
  };

  ourCat.name = "Happy Miu";

  var theirCat = {
    name: "Mike",
    legs: 3,
    tails: 2,
    MBTI: "FINE",
    friends: ["freeCodeCamp Campers"],
  };

  theirCat.name = "Happy Mike";
</script>
```

- 개체 속성 추가하기: 변수명[새로운 key] = 새로운 value
- 개체 속성 삭제하기: delete 변수명.지우고자 하는 key

```html
<script>
  var ourCat = {
    name: "Miu",
    legs: 4,
    tails: 1,
    MBTI: "CUTE",
    friends: ["everything!"], // 모든 datatype 가능
  };

  ourCat[crying] = "Miao";

  var theirCat = {
    name: "Mike",
    legs: 3,
    tails: 2,
    MBTI: "FINE",
    friends: ["freeCodeCamp Campers"],
  };

  delete theirCat.legs;
</script>
```

- 조회를 위한 개체 사용

```html
<script>
  function ourCatLookup(val) {
    var result = "";

    var ourCat = {
      "name": "Miu",
      "legs": 4,
      "tails": 1,
      "MBTI": "CUTE",
      "friends": ["everything!"]

    result = ourCat[val];
    return result;
  }

  ourCatLookup("MBTI"); // CUTE
</script>
```

## Testing Objects for Properties

```html
<script>
  var myObj = {
    name: "Miu",
    legs: 4,
    tails: 1,
    MBTI: "CUTE",
    friends: ["everything!"],
  };

  function checkObj(checkProp) {
    if (myObj.hasOwnProperty(checkProp)) {
      // 속성이 있는 경우 true, 없으면 flase 반환해주는 메소드
      return myObj[checkProp];
    } else {
      return "Not Found";
    }
  }
  console.log(checkObj("name"));
</script>
```

## Manipulating Complex Objects

```html
<script>
  var myMusic = [
    // 한 변수 안에 여러 개의 딕셔너리가 들어감. JSON과 매우 유사한 형태.
    {
      artist: "Billy Joel",
      title: "Piano Man",
      release_year: 1973,
      list: ["CD", "8T", "LP"],
      gold: true,
    },

    {
      artist: "Beau Carnes",
      title: "Cereal Man",
      release_year: 2003,
      list: [
        // index 3번
        "CD",
        "8T",
        "Youtube video",
      ],
      gold: true,
    },
  ];

  var secondTree = myMusic[1].list[3]; // myMusic의 인덱스 1번 딕셔너리 안의 "list"라는 key에 해당하는 value 출력
  console.log(secondTree); // Youtube video
</script>
```

## Nested Objects

중첩된 객체 접근하기

```html
<script>
  var myStorage = {
    // 중첩된 딕셔너리가 들어간 경우
    car: {
      inside: {
        "glove box": "maps",
        "passenger seat": "crumbs",
      },
      outside: {
        trunk: "jack",
      },
    },
  };

  var gloveBoxContents = myStorage.car.inside["glove box"]; // 객체명.1차원.2차원[3차원]

  console.log(gloveBoxContents); // maps
</script>
```

## Record collection

```html
<script>
  var collection = {
    "2548": {
      "album": "Slippery when wet",
      "artist": "Bon Jovi",
      "tracks": [
        "Let it rock",
        "You give love a bad name"
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [
        "1999",
        "Little red corvette"
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
    "album": "ABBA Gold"
    }
  };

  var collectionCopy = JSON.parse(JSON.stringify(collection));
  // nested된 것들은 깊은 복사가 필요
  // parse와 stringify는 기억해둘 것

  funtion updateRecords(id, prop, value) {
    if (value === "") {
      delete collection[id][prop]
    } else if (prop === "tracks") {
      collection[id][prop] = collection[id][prop] || []; // 속성이 존재하면 그대로, 존재하지 않으면 빈 리스트 할당
      collection[id][prop].push(value);
    } else {
      collection[id][prop] = value;
    }

    return collection;
  }
  console.log(updateRecords(2468, "tracks","test")) // "tracks"라는 key의 value 리스트 끝단에 "test" 추가됨
  console.log(updateRecords(5439, "artist","ABBA"))  // "ABBA"가 "artist"라는 새로운 키의 value로서 추가됨
</script>
```

## While Loops

while문 활용

```html
<script>
  var myArray = [];

  var i = 0;
  while (i < 5) {
    myArray.push(i);
    i++;
  }
  console.log(myArray); // [0,1,2,3,4]
</script>
```

## Iterate with For Loops

for문 활용

```html
<script>
  var ourArray = [];
  for (var i = 0; i < 5; i++) {
    // 조건(두 번째에 위치)이 false이면 자동으로 탈출, 한 번 루프 돌면 i++ 해주기
    ourArray.push(i);
  }

  var myArray = [];
  for (var i = 1; i < 6; i++) {
    // 조건(두 번째에 위치)이 false이면 자동으로 탈출
    myArray.push(i);
  }

  console.log(ourArray); // [0,1,2,3,4]
  console.log(myArray); // [1,2,3,4,5]
</script>
```

- for문으로 짝수/홀수 만들기

```html
<script>
  var ourArray = [];
  for (var i = 0; i < 10; i += 2) {
    ourArray.push(i);
  }

  var myArray = [];
  for (var i = 1; i < 10; i += 2) {
    myArray.push(i);
  }

  console.log(ourArray); // [0,2,4,6,8]
  console.log(myArray); // [1,3,5,7,9]
</script>
```

- 배열을 활용해 for문 돌리기

```html
<script>
  var ourArray = [9, 10, 11, 12];
  var ourTotal = 0;

  for (var i = 0; i < ourArray.length; i++) {
    ourTotal += ourArray[i];
  }

  console.log(ourTotal); // 42
</script>
```

## Nesting For Loops

for문 중첩

```html
<script>
  function multiplyAll(arr) {
    var product = 1;

    for (var i = 0; i < arr.length; i++) {
      // for문 중첩, arr의 길이만큼 반복
      for (var j = 0; j < arr[i].length; j++) {
        // arr[i]의 길이만큼 반복
        product *= arr[i][j];
      }
    }

    return product;
  }

  var product = multiplyAll([1, 2], [3, 4], [5, 6, 7]); // 1,2,3,4,5,6,7을 차례로 꺼내어 모두 곱한 값: 5040
</script>
```

## Iterate with Do...While Loops

Do...While문

```html
<script>
  var myArray = [];
  var i = 10;

  do {
    myArray.push(i);
    i++;
  } while (i < 5); // 조건이 거짓이면 바로 do...while문 탈출

  console.log(i, myArray); // [10], i == 11
</script>
```

## Profile Lookup

```html
<script>

  var contacts = [
    {
      "first name": ~~,
      "last name": ~~,
      "number": ~~~,
      "likes": ["sdf", "ggh", "jkj"]
    },
    {

    },
    {

    }
  ];

  function lookupProfile(name, prop) {
    for (var i = 0; i <contacts.length; i++)  { // 딕셔너리 하나씩 꺼내오기
      if (contacts[i].firstName === name) { // i 인덱스에 해당하는 딕셔너리의 firstname 인자가 name과 일치하면
        return contacts[i][prop] || "No such property"; // 같은 인덱스의 prop를 꺼내오고, 아닐 경우 "No such property"
      }
    }

    return "No such contact";
  }

  var data = lookUpProfile("Shirlock", "likes"); // shirlock의 likes 속성을 가져옴

  console.log(data)
</script>
```

## Generate Random Fractions

무작위 분수 생성

- 0과 1 사이의 실수 (1은 미포함)

```html
<script>
  function randomFraction() {
    return Math.random(); // 0과 1 사이의 실수가 랜덤으로 출력.
  }

  console.log(randomFraction());
</script>
```

- 임의의 정수 생성

```html
<script>
  var randomNumberBetween0and19 = Math.floor(Math.random() * 20);
  /*0과 1사이의 실수에 20을 곱한 다음 가장 가까운 정수로 내림하기.
  이때, 나오는 숫자는 0부터 19까지의 정수 (20은 포함되지 않음)*/

  function randomWholeNum() {
    return Math.floor(Math.random() * 10); // 0부터 9까지의 정수 (10은 포함되지 않음)
  }
</script>
```

- 범위내 임의의 정수 생성

```html
<script>
  function ourRandomRange(ourMin, ourMax) {
    return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin; // 최솟값/최댓값 사이의 난수를 얻기 위한 식
  }

  ourRandomRange(1, 9);


  function randomRange(myMin, myMax) {

    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

  var myRandom = randomRange(5, 15)
  console.log(myRandom);
</script>
```

## ParseInt

문자열을 정수로 변환

- 문자열인지 정수인지 확인하고 싶을 때 사용
- 문자열을 정수로 변환할 수 없는 경우 NaN 반환

```html
<script>
  function convertToIntegar(str) {
    return parseInt(str);
  }

  convertToIntegar("56");
</script>
```

- 진수 변환

```html
<script>
  function convertToIntegar(str) {
    return parseInt(str, 2); // 들어오는 문자열 내 숫자가 이진수임을 표시
  }

  convertToIntegar("10010");
</script>
```

```html
<!-- 삼항 연산자 -->
<script>
  // condition ? statement-if-true : statement-if-false;
  function checkEqual(a, b) {
    return a === b ? true : false;
  }
  checkEqual(1, 2);
</script>

<!-- 중첩 삼항 연산자 -->
<script>
  function checkSign(num) {
    return num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero";
  }

  console.log(checkSign(0));
</script>

<!-- var vs let -->
- let으로는 같은 변수를 두 번 사용할 수 없음 - var은 전역변수로 선언. let의
범위는 선언된 블록문 또는 표현식으로 제한

<script>
  let catName = "Miu";
  let quote;

  catName = "Beau"; // 이미 앞에서 같은 변수를 let으로 선언했으므로, 여기선 let을 쓰면 안 됨

  function catTalk() {
    "use strict"; // 코딩 실수나 안전하지 않은 작업을 포착하는 strict 모드를 활성화함. JS 파일 맨 위에 사용하는 경우가 많음

    catName = "Oliver";
    quote = catName + "says Meow!";
  }
  catTalk();
</script>

<script>
  function checkScope() {
    "use strict";
    let i = "function scope"; // (1)
    if (true) {
      let i = "block scope"; // { 블록 } 안에서만 사용
    }
    console.log("Function scope i is: ", i); // (1)을 따라 i = "function scope"
    return i;
  }
  checkScope();
</script>

<!-- const -->
<script>
  function printManyTimes(str) {
    "use strict";

    const SENTENCE = str + " is cool!";

    for (let i = 0; i < str.length; i += 2) {
      console.log(SENTENCE);
    }
  }
  printManyTimes("freecodecamp");

  // SENTENCE = str + " is amazing!"  추가하면 오류 발생.
  // 실수로 변수를 재할당하지 않도록 방지해준다는 장점이 있음.
  // 또한 const로 선언할 땐 변수명을 모두 대문자로 설정하는 것이 일반적.
  // const는 주로 let 과 함께 자주 사용됨
</script>

<!-- const 배열 변경 -->
<script>
  // const는 재할당은 불가하지만 배열 변경은 가능하다
  const s = [5, 7, 2];
  function editInPlace() {
    "use strict";

    s[0] = 2;
    s[1] = 5;
    s[2] = 7;
  }
  editInPlace();
  console.log(s);
</script>

<!-- Prevent Object Mutation -->
<script>
  // 개체 변이 방지: object.freeze
  function freezeObj() {
    "use strict";
    const MATH_CONSTANTS = {
      PI: 3.14,
    };

    Object.freeze(MATH_CONSTANTS);

    try {
      MATH_CONSTANTS.PI = 99; // type 에러 발생. object.freeze 했기 때문.
    } catch (ex) {
      console.log(ex);
    }
    return MATH_CONSTANTS.PI;
  }

  const PI = freezeObj();
</script>
```

## Arrow Functions

```html
<script>
  var magic = function() {
    return new Date()
  }; // 변수명이 함수명이 됨. 익명함수


  var magic = () => {
    return new Date();
  }


  const magic = () => new Date(); // 코드 간소화 + var을 const로 바꿔주기
  }
</script>

<script>
  var myConcat = (arr1, arr2) => arr1.concat(arr2);
  // 변수명 = (인자1, 인자2, ..., 인자n) => 함수식

  console.log(myConcat([1, 2], [3, 4, 5])); // 함수명 없이, 변수명(인자에 해당하는 값 넣기)
</script>
```

## Arrow Functions

화살표 함수

```html
<script>
  var magic = function() {
    return new Date()
  };


  var magic = () => {
    return new Date();
  }


  const magic = () => new Date(); // 코드 간소화 + var을 const로 바꿔주기
  }
</script>

<script>
  var myConcat = (arr1, arr2) => arr1.concat(arr2);
  // 변수명 = (인자1, 인자2, ..., 인자n) => 함수식

  console.log(myConcat([1, 2], [3, 4, 5])); // 함수명 없이, 변수명(인자에 해당하는 값 넣기)
</script>
```

## Arrow Functions

고차 화살표 함수

- 한 함수가 다른 함수를 인수로 받을 때 사용하기 좋음

```html
<script>
  // 배열에 있는 양의 정수의 제곱만 계산하고자 함
  const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];

  const squareList = (arr) => {
    const squaredIntegers = arr
      .filter((num) => Number.isInteger(num) && num > 0)
      .map((x) => x * x);
    // arr.filter -> 배열 내에서 정수 && 양수인 숫자만 가져오기 -> 가져온 수를 각각 제곱한 뒤에 mapping
    return squaredIntegers; // [4, 42, 6]을 각각 제곱 -> [16, 1764, 36]
  };

  const squaredIntegers = squareList(realNumberArray);
  console.log(squaredIntegers);
</script>
```

- 값이 전달되지 않는 인자의 디폴트 값 정해주기

```html
<script>
  const increment = (function () {
    return function increment(number, value = 1) {
      // value값이 들어오지 않을 때는 1로 계산
      return number + value;
    };
  })();
  console.log(increment(5, 2)); // 7
  console.log(increment(5)); // 6
</script>
```

## Spread Operator

스프레드 연산자 (...)

```html
<script>
  const sum = (function () {
    return function sum(x, y, z) {
      const args = [x, y, z];
      return args.reduce((a, b) => a + b, 0);
    };
  })();

  console.log(sum(1, 2, 3));
</script>
```

```html
<script>
  const sum = (function () {
    return function sum(...args) {
      return args.reduce((a, b) => a + b, 0);
    };
  })();

  console.log(sum(1, 2, 3, 4));
</script>
```

- 스프레드 연산자로 변수 복사

```html
<script>
  const arr1 = ["JAN", "FEB", "MAR", "APR", "MAY"];
  let arr2;
  (function () {
    arr2 = [...arr1];
    arr1[0] = "potato";
  })();
  console.log(arr2);
</script>
```

## Destructuring Assignment

구조 분해 할당

- 개체에서 직접 가져온 값을 변수에 할당하기 위한 특수 구문

```html
<script>
  var voxel = { x: 3.6, y: 7.4, z: 6.54 };

  var x = voxel.x; // x = 3.6
  var y = voxel.y; // y = 7.4
  var z = voxel.z; // z = 6.54

  const { x: a, y: b, z: c } = voxel; // a = 3.6, b = 7.4, c = 6.54

  const AVG_TEMPERATURES = {
    today: 77.5,
    tomorrow: 79,
  };

  function getTempOfTmrw(avgTemperatures) {
    const { tomorrow: tempOfTomorrow } = avgTemperatures;
    return tempOfTomorrow;
  }

  console.log(getTempOfTmrw(AVG_TEMPERATURES)); // 79
</script>
```

- 중접된 객체를 활용해 구조 분해 할당하기

```html
<script>
  const LOCAL_FORECAST = {
    today: { min: 72, max: 83 },
    tomorrow: { min: 73.3, max: 84.6 },
  };

  function getMaxOfTmrw(forecast) {
    const {
      tomorrow: { max: maxOfTmrm },
    } = forecast;

    return maxOfTmrw;
  }

  console.log(getMaxOfTmrw(LOCAL_FORECAST));
</script>
```

- 구조 분해를 통해 배열로부터 변수 할당하기

```html
<script>
  const [z, x, , y] = [1, 2, 3, 4, 5, 6]; // 본래 배열 요소 개수대로 차례로 할당, 변수에 들어갈 배열의 요소를 지정할 수 없음. 따라서 숫자 4를 변수로 활용하려면 위처럼 쉼표 이용하기
  console.log(z, x, y);

  let a = 8,
    b = 6;
  (() => {
    [a, b] = [b, a];
  })();
  console.log(a);
  console.log(b);
</script>
```

- 스프레드 연산자로 구조 분해 할당하기

```html
<script>
  const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function removeFirstTwo(list) {
    const [, , ...arr] = list; // 앞에 두 요소를 누락시키고 나머지만 arr에 넣어줌

    return arr;
  }
  const arr = removeFirstTwo(source);
  console.log(arr);
  console.log(source);
</script>
```

- 구조 분해 할당으로 객체를 함수의 매개변수로 전달하기
  > 전체 통계를 함수에 전하는 대신, 필요한 정보만 골라서 매개변수로 전달하기

```html
<script>
  const stats = {
    max: 56.78,
    standard_deviation: 4.34,
    median: 34.54,
    mode: 23.87,
    min: -0.75,
    average: 35.85,
  };

  const half = (function () {
    return function half({ min, max }) {
      // 원하는 정보만 골라 가져오기. api 호출 시 많이 쓰임.
      return (stats.max + stats.min) / 2.0;
    };
  })();

  console.log(half(stats)); // 28.015
</script>
```

## Template Literals

- 복잡한 문자열을 더 쉽게 만들어줌
- 문자열 포맷팅과 유사

```html
<script>
  const person = {
    name: "Chae-zero",
    age: 25,
  };

  const greeting = `Hello, my name is ${person.name}! I am ${person.age} years old.`;

  console.log(greeting); // Hello, my name is Chae-zero! I am 25 years old.
</script>
```

## Simple Fields

```html
<script>
  const createPerson = (name, age, gender) => ({ name, age, gender });
  // const 객체명 = (매개변수1, 매개변수2, 매개변수3,...) => ({key1, key2, key3,...})
  console.log(sreatePerson("Zodiac Hasbro", 56, "male"));
</script>
```

## Declarative Functions

- 객체 안에 함수를 넣을 때, [객체명(매개변수)] 형태로 간소화. 객체명이 곧 함수명.

```html
<script>
  const bycicle = {
    gear: 2,
    // setGear: function(newGear) {....}
    setGear(newGear) {
      this.gear = newGear;
    },
  };

  bicycle.setGear(3);
  console.log(bicycle.gear); // 3
</script>
```

## class Syntax

```html
<script>
  // Older way
  var SpaceShuttle = function (targetPlanet) {
    this.targetPlanet = targetPlanet;
  };
  var zeus = new SpaceShuttle("JUpiter"); // 'new' 키워드를 활용해 객체를 인스턴스화

  console.log(zeus.targetPlanet);

  // Now
  class SpaceShuttle {
    constructor(targetPlanet) {
      // constructor = 생성자
      this.targetPlanet = targetPlanet;
    }
  }
  var zeus = new SpaceShuttle("JUpiter"); // 'new' 키워드를 활용해 객체를 인스턴스화

  console.log(zeus.targetPlanet);
</script>
```

## getters and setters

```html
<script>
  class Book {
    contructor(author) {
      this._author = author;
      // this.: 해당 변수가 이 클래스 내에서만 접근 가능함을 의미
      // 클래스 외부 혹은 해당 범위 외부에 액세스할 수 없음
    }
    // gettle
    get writer() {
      // 객체 가져오는 역할
      return this._author;
    }
    //setter
    set writer(updatedAuthor) {
      // 계산 호출, 값 재정의 등을 위한 코드 작성 가능
      // 속성을 설정하기 전에 계산을 수행할 수 있음
      this._author = updatedAuthor;
    }
  }

  function makeClass() {
    class Thermostat {
      constuctor(temp) {
        this._temp = (5 / 9) * (temp - 32); // 섭씨를 화씨로 바꿔주는 방정식
      }

      get temeprature() {
        return this._temp; // 여기까지는 섭씨로 표시됨
      }
      set temperature(updatedTemp) {
        this._temp = updatedTemp;
      }
    }
    return Thermostat;
  }

  const Thermostat = makeClass();
  const thermos = new Thermostat(76);
  let temp = thermos.temperature; // thermos.temperature는 getter를 사용해 온도를 가져오고, this._temp를 반환함
  thermos.temperature = 26;
  temp = thermos.temperature;
  console.log(temp);
</script>
```

## import and export

- 파일 또는 특정 변수에서 특정 함수를 import/export 할 수 있음

```js
import * as capitalizeStrings from "파일명";
// as 뒤에 오는 이름은 내 마음대로 설정 가능, from에는 파일명
```

- 디폴트값 설정

```js
export default function subtract(x, y) {
  return x - y;
}
import subtract from "출처";
```
