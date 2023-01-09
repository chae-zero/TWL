## 최소 설정법

### 공식문서

- [status code](https://www.django-rest-framework.org/api-guide/status-codes/)

### 시작 전 세팅

- 환경 변수 설정
- C:/tools/Anaconda3/Scripts/activate
- conda update -n base -c defaults conda
- conda install django
- django-admin version

### docker 관련 설정

- .dockerignore
- docker-compose.yml
- Dockerfile
- requirements.dev.txt
- requirements.txt
- app 폴더 생성

```
<!-- 복붙용도모음 -->
docker-compose run --rm app sh -c "flake8"
docker-compose run --rm app sh -c "python manage.py startproject 프로젝트명"
docker-compose run --rm app sh -c "python manage.py startapp 앱명"
docker-compose run --rm app sh -c "python manage.py runserver"
docker-compose run --rm app sh -c "python manage.py test"
docker-compose run --rm app sh -c "python manage.py createsuperuser"
docker-compose run --rm app sh -c "python manage.py migrate"
docker-compose run --rm app sh -c "python manage.py makemigrations"
docker-compose run --rm app sh -c "python manage.py makemigrations 폴더명"
docker-compose run --rm app sh -c "python manage.py sqlmigrate foldername filenumber"
```

### 프로젝트 시작

- docker build .
- docker-compose run --rm app sh -c 앞에 붙이기 " 이 안에 넣기 "
- django-admin startproject 파일이름 파일경로
- django-admin startapp 앱이름
- python manage.py migrate
- python manage.py makemigrations 폴더이름
- python manage.py runserver (바꿀 포트번호)

### admin 계정 생성

- python manage.py createsuperuser

### 예시. model 생성 및 적용

```py
class Project(models.Model):
    year = models.IntegerField()
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=300)

    # admin page에 보여질 레코드들의 표시 방법 설정
    def __str__(self):
        return f'{self.title} from {self.year}'
```

- python manage.py makemigrations 프로젝트명
- python manage.py migrate
- admin.py 생성

```py
from django.contrib import admin
from .models import 모델명

admin.site.register(모델명)
```

### serializers.py 생성

```py
from rest_framework import serializers
from .model import Project

class ProjectSerializer(serializer.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'content', 'year']
```

### views.py 수정

```py
from .models import Project
from .serializer import ProjectSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def project_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)

    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data, status=status.HTTP_200_OK)
```

### urls.py 수정

```py
# urls.py
urlpatterns = [
    path('projects/', views.project_list)
]
```

### .json 지원 설정

```py
# urls.py
from rest_framewokr.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('projects/', views.project_list)
    path('projects/<int:id>', views.project_detail)
]

urlpatterns = format_suffix_patterns(urlpatterns)


# views.py
# 파라메터 중 format 을 None으로 해놓기
@api_view(['GET'])
def project_list(request, format=None):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)

    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data, status=status.HTTP_200_OK)
```