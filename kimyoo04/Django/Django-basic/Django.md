# Django

- [cheat sheet](https://dev.to/ericchapman/my-beloved-django-cheat-sheet-2056)

### Model, View, Template

- Model: representation data
- View: what accepts and takes requests
- Template: visual page the structure of that data being sent

```py
# views.py


def movies(request):
    data = {
        'movies': [
        {
            'id':5,
            'title': 'Javs',
            'year': 1669,
        },
        {
            'id':6,
            'title': 'Jane',
            'year': 1902,
        },
        {
            'id':7,
            'title': 'Hove',
            'year': 2012,
        },
        ]
    }

  return render(request, 'movies/movies.html', data)

def home(request):
  return HttpResponse("Home page")
```

```py
# settings.py
# app을 추가했을 시 아래 영역에 추가!

INSTALLED_APPS = [
    'movies',
    'django.contrib~'
    '...',
]
```

### Object Relational Mapper (ORM)

```py
from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()

    # admin page에 보여질 레코드들의 표시 방법 설정
    def __str__(self):
        return f'{self.title} from {self.year}'
```

```py
from django.shortcuts import render
from .models import Movie

def movies(request):
    data = Movie.objects.all()
    return render(request, 'movies/movies.html', {'data': data})
```

### Admin

- 어떤 테이블을 admin page에 보여지게 할지 설정하는 파일 -> admin.py

```py
# admin.py
from django.contrib import admin
from .models import Movie

admin.site.register(Movie)

# urls.py
urlpatterns = [
  path('admin/', admin.site.urls)
]
```

### Detail page

```py
# urls.py
urlpatterns = [
    path('movies/<int:id>', views.detail)
]

# views.py
def detail(request, id):
    data = Movie.objects.get(pk=id)
    return render(request, 'movies/detail.html', {'movie': data})
```

### Add page

```py
# urls.py
urlpatterns = [
    path('movies/add', views.add)
]

# views.py
# request.POST[title] 도 가능하지만 예외처리를 따로 해줘야함
def add(request):
    title = request.POST.get('title')
    year = request.POST.get('year')

    if title and year:
        movie = Movie(title=title, year=year) # 저장할 값 데이터베이스에 입력
        movie.save() # 데이터베이스 저장
        return HttpResponseRedirect('/movies') # 리다이렉팅

    return render(request, 'movies/add.html')
```

### Delete button

```py
# html
# <a href="/movies/delete/{{movie.id}}">delete button</a>

# urls.py
urlpatterns = [
  path('movies/delete/<int:id>', views.delete)
]

# views.py
def delete(request, id):
    try:
        # Movie.objects.get(pk=id).delete()
        movie = Movie.objects.get(pk=id) # 데이터베이스에서 제거
    except:
        raise Http404('Movie does not exist')
    movie.delete()
    return HttpResponseRedirect('/movies')

# 404 페이지를 보려면 settings.py의 DEBUG 변수를 False 로 바꾸고, ALLOWED_HOSTS를 ['127.0.0.1']로 설정할 것
```

### Namespacing URL names

### JsonResponse()

- json 객체 반환용 함수
- return JsonResponse({"message": "Hi there, this is your Django API response!!"})
- 인자로 dict 를 받음!

### HttpResponse()

- 응답을 줄 때 헤더 설정, 데이터 설정 등을 수동으로 상세하게 설정하고 싶을 때 사용. (안 사용할 듯)

### include()

- url path 설정시 nested 된 공통 부분을 생략하게 해주는 함수
- path('api/', include('앱폴더이름.urls'))
  - path('', views.함수명)

### request.body

- 요청의 body의 데이터 타입은 JSON임. 따라서 json 패키지를 사용할 것

```py
import json

def api_home(request, *args, **kwargs):
    body = request.body
    data = {}
    try:
        data = json.loads(body)
    except:
        pass
    print(data)

    # 요청의 설정들을 추가 가능
    data['headers'] = dict(request.headers) # JSON serializable 위해서 dict로 감쌈
    data['content_type'] = request.content_type

    return JsonResponse(data)
```

### Query Parameter and Path Variable

- ex) id가 12인 user를 가져온다.
- /users?id=12
- /users/12

- 보통 정렬, 필터링을 할 때 Query Parameter가 사용된다.
- ex) tag id가 5이면서 title에 house가 들어가며 오름차순으로 post를 가져온다.
- /post?tagid=5&decs=false&title=house

- resource를 식별, 에러 헨들링 힘든 경우는 Path Variable가 더 적합
  (Path Variable 404에러 응답 Query Parameter는 빈 결과 응답)

### model_to_dict()

- model의 값을 GET 후 dict 자료로 적절하게 변환해주는 함수 (안 쓰면 번거로움)

```py
from django.form.models import model_to_dict
from django.http import JsonResponse

from products.models import Product

def api_home(request, *args, **kwards):
    model_data = Product.objects.all().order_by("?").first()
    data = {}
    if model_data:
        data = model_to_dict(model_data, fields=['id', 'title']) # fields 값으로 선택적으로 값 저장 가능
    return JsonResponse(data)
    # 불편한 사례
    # data = dict(data)
    # json_data_str = json.jumps(data)
    # return HttpResponse(json_data_str, headers={"content-type": "application/json"})
```
