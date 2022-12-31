# Django

- Web Application Server: 동적임
- Python Web Framework

## django-admin 명령어

- check
- compilemessages
- createcachetable
- dbshell
- diffsettings
- dumpdata
- flush
- inspectdb
- loaddata
- makemessages
- makemigrations
- migrate
- runserver
- sendtestemail
- shell
- showmigrations
- sqlflush
- sqlmigrate
- sqlsequencereset
- squashmigrations
- startapp
- startproject
- test
- testserver

## 최소 설정법

- 환경 변수 설정
- C:/tools/Anaconda3/Scripts/activate
- conda update -n base -c defaults conda
- conda install django
- django-admin version
- django-admin startproject 파일이름 파일경로
- python manage.py runserver (바꿀 포트번호)
- django-admin startapp 앱이름

## 5/14 Routing URLConf

- Routing 순서: myproject의 url.py -> myapp의 url.py <- myapp의 views.py
- urlpatterns 이름의 리스트를 꼭 정의 해야하며, 리스트 안에 라우팅과 관련된 정보가 저장된다.
- admin/ 는 장고가 기본으로 가진 관리자 화면으로 이동하기 위한 라우팅 설정임
- 다른 URL로 위임하는 방법 - include 함수 호출

```py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls'))
]
```

- myapp의 urls.py 파일에서는 아래처럼 views.py의 함수를 호출한다.
- dynamic routing은 아래처럼

```py
urlpatterns = [
    path('read/<id>/',  views.read)
]
```

- dynamic routing의 id 값은 아래처럼

```py
from django.shortcuts import HttpResponse

def read(request, id):
    return HttpResponse('Read!'+id)
```
