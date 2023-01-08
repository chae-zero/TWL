## 최소 설정법

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
from django.http import JsonResponse
from .models import Project
from .serializer import ProjectSerializer

def project_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
```
