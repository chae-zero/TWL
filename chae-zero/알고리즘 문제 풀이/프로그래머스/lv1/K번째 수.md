### K번째 수



##### 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42748



##### 나의 풀이

```py
def solution(array, commands):
    answer = []
    # 2차원 리스트 꺼내주기
    for i in commands:
        # array[i[0]-1] 이상 array[i[1]] 미만
        slicing = sorted(array[i[0]-1:i[1]])
        answer += [slicing[i[2]-1]]

    return answer
```



##### 다른 풀이 1

```py
def solution(numbers):
    answer = []
    for i in range(len(numbers)):
        for j in range(i+1, len(numbers)):
            # 따로 변수 지정 안 하고 바로 더해주기
            answer.append(numbers[i] + numbers[j])
    # set로 변환 -> 다시 리스트화 -> 다시 sorted
    # 다만, sorted()가 세트를 자동으로 리스트형으로 변환시켜주므로 굳이 또 list화 안 해도 됨
    return sorted(list(set(answer)))
```



##### 다른 풀이 2

```py
def solution(array, commands):
    return list(map(lambda x:sorted(array[x[0]-1:x[1]])[x[2]-1], commands))
    # commands 라는 2차원 리스트의 요소를 키로 삼아, 배열 array를 [x[0]-1 : x[1]]까지 인덱싱한 값을 정렬한 후, 정렬된 값의 인덱스 [x[2]-1] 값을 list(map())으로 반환
```



##### 다른 풀이 3

```py
def solution(array, commands):
    answer = []
    for command in commands:
        i,j,k = command
        # command 내 요소들을 차례로 변수 i,j,k에 할당
        answer.append(list(sorted(array[i-1:j]))[k-1])
    return answer
```
