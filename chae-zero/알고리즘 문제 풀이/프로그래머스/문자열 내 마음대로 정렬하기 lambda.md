### 문자열 내 마음대로 정렬하기



##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12915


##### 나의 풀이

```py
def solution(strings, n):
    
    # i[n], sort() 활용
    a = []
    for i in strings:
        a.append(i[n] + i)
        a.sort()
        # i[n] 값이 같을 경우, 사전순으로 앞선 문자열이 앞쪽에 와야하므로 sort()
    
    # 첫 인덱스 제외하고 슬라이싱 추출: [1:]
    b = []
    for j in a:
        b.append(j[1:])
            
    return b
```



##### 다른 풀이 1


1. sort, sorted에 key인자를 넣어줌으로써 정렬 기준을 정할 수 있다.

2. key 기준으로 정렬을 할 경우 오직 key 기준으로만 정렬을 한다.
key이외의 나머지 요소에 대해선 정렬되지 않는다.

3. lambda를 이용한 key 설정에서 튜플을 넣어줌으로써 정렬의 우선순위를 지정할 수 있다.

```py
def solution(strings, n):
    strings.sort() 
    return sorted(strings, key=lambda x:x[n])

def solution(strings, n):
    return sorted(strings, key=lambda x:(x[n],x))
    # 내림차순을 구하고 싶을 경우: ~(x[n], -x)
```
