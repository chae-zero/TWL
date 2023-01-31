# 라우팅이란?

라우트 = 경로

사용자가 접속한 각각의 경로를 누가 처리할 것인지를 지정하는 것이 라우팅

어떤 프로젝트를 하든지 제일 먼저 고려해야 하는 일

project > app > view > def 

project 의 urls.py가 가장 큰 틀의 라우팅을 하고, app 안의 urls.py가 그 다음 단계의 라우팅을 통해 적절한 view 안의 def를 찾아 위임하면 해당 def가 작업을 처리하게 되는 것

view 안의 def 예시)
```py
from django.shortcuts import render, HttpResponse
import random

# Create your views here.
def index(request):
    return HttpResponse('<h1>Random</h1>'+ str(random.random()))

def create(request):
    return HttpResponse('Create')

def read(request, id):
    return HttpResponse('Read!'+id)
```