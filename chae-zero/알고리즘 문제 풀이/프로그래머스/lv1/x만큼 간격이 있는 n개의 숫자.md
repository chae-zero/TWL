### x만큼 간격이 있는 n개의 숫자


##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12954#



##### 문제 설명

함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.


##### 제한 조건
x는 -10000000 이상, 10000000 이하인 정수입니다.
n은 1000 이하인 자연수입니다.



##### 나의 풀이

```py
# 실패한 코드
def solution(x, n):
    answer = []
    s = abs(x)

    if x == 0:
        answer = [0]

    else:
        for i in range(s, s*n + 1, s):
            if x > 0:
                answer.append(i)
            else x < 0:
                answer.append(-i)

    return answer 
    # 런타임 에러 
    # 문제 잘못 이해: x = 0 일 때, 0 하나만 나와야 하는 것으로 착각. 0이 n개 나와야 함

# 성공한 코드
def solution(x, n):
    answer = []
    s = abs(x)

    if x == 0:
        for i in range(n):
            answer.append(0)

    else:
        for i in range(s, s*n + 1, s):
            if x > 0:
                answer.append(i)
            elif x < 0:
                answer.append(-i)

    return answer
    # list(reversed(리스트)) 순으로 불러줘야 함
```



##### 다른 풀이 1

```py
def solution(x, n):
    if x != 0:
        return [i for i in range(x, x * n + x, x)]
        # 리스트 컴프리헨션: "x*n + x"로 써주면, 굳이 절댓값으로 바꿔주지 않아도 됨
    else:
        return [0 for i in range(n)]
```



##### 다른 풀이 2

```py
def solution(x, n):
    return [i * x + x for i in range(n)]
    # 0 <= i < n 일 때의 x + x*i 값을 모아둔 리스트 
```
