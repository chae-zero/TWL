### 문자열 내 마음대로 정렬하기


##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12915



##### 문제 설명

문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 예를 들어 strings가 ["sun", "bed", "car"]이고 n이 1이면 각 단어의 인덱스 1의 문자 "u", "e", "a"로 strings를 정렬합니다.


##### 제한 조건

strings는 길이 1 이상, 50이하인 배열입니다.
strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
모든 strings의 원소의 길이는 n보다 큽니다.
인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.



##### 나의 풀이

```py
def solution(strings, n):
    
    # i[n], sort() 활용
    a = []
    for i in strings:
        a.append(i[n] + i) # 문자열 덧셈 acar ebed usun
        a.sort()
        # 알파벳 문자열 sort: i[n] 값이 같을 경우, 사전순으로 앞선 문자열이 앞쪽에 와야하므로 sort()
    
    # 첫 인덱스 제외하고 슬라이싱 추출: [1:]
    b = []
    for j in a:
        b.append(j[1:])
            
    return b
```



##### 다른 풀이 1


1. sort, sorted에 key인자를 넣어줌으로써 정렬 기준을 정할 수 있음

2. key 기준으로 정렬을 할 경우 오직 key 기준으로만 정렬함

3. 그러나 key 이외의 나머지 요소에 대해선 정렬되지 않음

3. lambda를 이용한 key 설정에서 튜플을 넣어줌으로써 정렬의 우선순위를 지정할 수 있음

```py
def solution(strings, n):
    strings.sort() # lambda 활용할 땐 key 기준으로만 정렬하기에 나머지 알파벳 순서는 고려하지 않기 때문에,  미리 sort()로 사전순 정렬
    return sorted(strings, key=lambda x:x[n])

def solution(strings, n):
    return sorted(strings, key=lambda x:(x[n],x))
    # 튜플을 순서대로 정렬의 우선순위를 할당
    # key 인자에 함수를 넘겨주기: key= lambda x:(x[n],x)
    # x[n]을 기준 삼아 단어들을 정렬한 후에, x[n] 값이 같은 단어들끼리는 또 다시 x를 기준으로 다시 한 번 정렬
    # 내림차순을 구하고 싶을 경우: 기준이 되는 key에 마이너스 부호 붙여주기
```

sort(): 자기자신을 변화시키고, 반환을 안 함
sorted(): 정렬한 새로운 값을 반환한다
반환을 하고 안 하고의 차이