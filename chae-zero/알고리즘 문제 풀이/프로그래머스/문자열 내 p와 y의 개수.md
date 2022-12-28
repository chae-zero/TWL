### 문자열 내 p와 y의 개수



##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12916


##### 나의 풀이

```py
# p,p,y,Y가 있다면? 
# P, Y의 개수가 같은 경우: if p,P의 개수 == y,Y의 개수 이면 t
# P, Y의 개수가 다른 경우: if p,P의 개수 != y,Y의 개수 이면 f

# 둘 다 없다면?
    #return True

def solution(s):

    if 'p' or 'P' or 'y' or 'Y' in s:
        if s.count('p') + s.count('P') == s.count('y') + s.count('Y'):
            return True
        else:
            return False
    
    elif 'p' or 'P' or 'y' or 'Y' not in s:
        return True
```



##### 다른 풀이 1

```py
def solution(s):
    return s.lower().count('p') == s.lower().count('y')
    # 대소문자 구분 필요 없으므로 lower() 혹은 upper()로 대/소 통일
    # "s.lower().count('p') == s.lower().count('y')" 자체가 T/F 중 하나인 불리언이기에, 그 자체를 바로 return하면 됨
```



##### 다른 풀이 2

```py
from collections import Counter
# collections 모듈의 Counter 함수 활용: 리스트, 세트를 인자로 넘기면 각 항목을 키로 삼아 개수를 알려줌
def solution(s):
    c = Counter(s.lower())
    return c['y'] == c['p'] 
```
