```py
# min 함수?
# 숫자 n만 사용해서 number 표현
# n/n, (10n+n)/n, (100n+10n+n)/n,...
# 해시테이블 : 순서 상관없을 때 효율적 (파이썬에선 set, dict)
# 리스트나 딕셔너리, 튜플, 세트 등 여러 자료를 지니는 애들은 참조가 일어나지 않도록 해야 함
# a를 바꿨는데 b도 바뀌어버리는...
# 참조를 막기 위해 b = a.copy() #시간복잡도는 n

N = 5 
number = 34
def solution(N, number):
    if number == 1:
        return 1
    set_list = [] # 빈 리스트
    
    for cnt in range(1, 9): # 1개부터 8개까지 확인
        partial_set = set() # 빈 세트
        partial_set.add(int(str(N) * cnt)) # 이어 붙여서 만드는 경우 넣기
        for i in range(cnt - 1): # (1, n-1) 부터 (n-1, 1)까지 사칙연산
            for op1 in set_list[i]:
                for op2 in set_list[-i - 1]:
                    partial_set.add(op1 + op2)
                    partial_set.add(op1 * op2)
                    partial_set.add(op1 - op2)
                    if op2 != 0:
                        partial_set.add(op1 / op2)
        # 만든 집합에 number가 처음 나오는지 확인
        if number in partial_set:
            return cnt
        set_list.append(partial_set)
    return -1

print(solution(N, number))
```
