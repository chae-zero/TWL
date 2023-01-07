# Django

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

### JsonResponse
