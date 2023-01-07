### 체육복


##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42862



##### 나의 풀이

```py
# 실패한 코드: 테스트 1만 통과, 접근 방법이 잘못됨
def solution(n, lost, reserve):
    s = set()
    
    for i in range(1, n+1):
        # 1. i번이 도난 당하지 않았고 체육복이 1 벌인 학생이라면
        if i not in set(lost)|set(reserve):
            s.add(i)
        # 2. i번이 도난 당하지 않았고 체육복이 2 벌인 학생이라면
        elif i in set(reserve) - set(lost):
            s.add(i)
        # 3. i번이 도난 당했으나 여벌 1 벌이 남은 경우:
        elif i in set(lost) & set(reserve):
            s.add(i)
        # 4. i가 체육복이 0개지만 동시에 i+1 혹은 i-1이 체육복이 2개인 경우
        elif i in set(lost) - set(reserve) and i-1 or i+1 in set(reserve) - set(lost):
            s.add(i)
    return len(s)
```



##### 다른 풀이 1

```py
# 그리디의 특성을 고려
def solution(n, lost, reserve):
  # 여벌이 있었지만 도난을 당해서 더 빌려줄 수 없는 학생들부터 제외
    set_reserve = set(reserve) - set(lost)
    set_lost = set(lost) - set(reserve)
 
  # greedy: 더 많은 학생이 체육 수업을 듣게 하라
  
  # reserve에 속하는 학생 번호가 x라면, x-1부터 탐색할지 x+1부터 탐색할지 결정해야 함
  
  # 이때, x-1부터 탐색해야 x-1이 체육복 여벌을 빌릴 수 있었음에도 불구하고 받지 못하며, x+1은 x가 빌려주지 않아도 x+2에게 받을 수 있었기에 여벌 체육복이 낭비되는 상황 발생

  # 따라서 x-1번부터 탐색해야 낭비를 줄일 수 있음을 알 수 있음

    # set_reserve를 하나씩 i에 대입해보기
    for i in set_reserve:
        # 만일 i-1이 set_lost라면, 해당 값을 set_lost에서 삭제
        if i-1 in set_lost:
            set_lost.remove(i-1)
        # 만일 i+1이 set_lost라면, 해당 값을 set_lost에서 삭제
        elif i+1 in set_lost:
            set_lost.remove(i+1)
    # set_lost에 남은 것은 이제 체육 수업에 참가할 수 없는 학생의 최솟값
    # 따라서 n - (체육수업에 참가할 수 없는 학생의 최솟값)을 반환
    return n - len(set_lost)

```

##### 다른 풀이 2

```py
def solution(n, lost, reserve):
    _reserve = [r for r in reserve if r not in lost]
    _lost = [l for l in lost if l not in reserve]
    for r in _reserve:
        f = r - 1
        b = r + 1
        if f in _lost:
            _lost.remove(f)
        elif b in _lost:
            _lost.remove(b)
    return n - len(_lost)
```
