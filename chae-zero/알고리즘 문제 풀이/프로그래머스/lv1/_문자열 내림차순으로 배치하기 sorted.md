### 문자열 내림차순으로 배치하기


##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12917



##### 문제 설명

문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.


##### 제한 사항

str은 길이 1 이상인 문자열입니다.


##### 입출력 예

s: "Zbcdefg"	
return: "gfedcbZ"

##### 나의 풀이

sorted() 함수

1. sorted(정렬할 데이터)

2. sorted(정렬할 데이터, reverse 파라미터)

3. sorted(정렬할 데이터, key 파라미터)

4. sorted(정렬할 데이터, key 파라미터, reverse 파라미터)

리스트.sort()와 sorted(리스트)의 가장 큰 차이는
리스트.sort() 는 "본체의 리스트를 정렬해서 변환"하고,
sorted(리스트) 는 "본체 리스트는 내버려두고, 정렬한 새로운 리스트를 반환"한다는 것


```py
# 실패한 코드
def solution(s):
    answer = sorted(s, reversed = True)
    # join()을 활용하지 않고 sorted()만 활용하면 함수가 정렬된 문자를 split해서 리스트로 반환

# 성공한 코드
def solution(s):
    answer = "".join(sorted(s, reverse = True))
    # 문자열.join(), sorted() 활용
    # 문자열.join(리스트)를 이용하면 리스트 내 요소 하나하나를 합쳐서 하나의 문자열로 바꾸어 반환해줌
    return answer
```



##### 다른 풀이 1

```py
def solution(s):
    return ''.join(sorted(s, reverse=True))
    # answer 변수 지정 없이 바로 return
```

