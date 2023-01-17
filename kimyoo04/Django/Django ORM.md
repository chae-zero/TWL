# Django ORM

### 공식문서

- [Querysets](https://docs.djangoproject.com/en/dev/ref/models/querysets/)
- [Expressions](https://docs.djangoproject.com/en/dev/ref/models/expressions/)
- [Aggregation](https://docs.djangoproject.com/en/dev/topics/db/aggregation/)
- [Functions](https://docs.djangoproject.com/en/dev/ref/models/database-functions/)

### Cheat Sheet

- [basic](https://velog.io/@aerialslash/Django-ORM-SQL-Cheat-Sheet)
- [relationship tips](https://medium.com/hackernoon/django-orm-relationships-cheat-sheet-14433d6cf68c)
- [optimization tips](https://gist.github.com/rg3915/91766c2de54233541f6743edba44732c)

### model 생성 예

```py
from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=99.99)
```

### db 적용

- python manage.py makemigrations

### db에 data CRUD

```py
Product.objects.create(title='hello world', content='this is amazing!', price=0.01)

product = Product(title='hello gentle man', content='another content', price=0.21) # 저장할 값 데이터베이스에 입력
product.save()

Product.objects.all().order_by("?").first() # 랜덤 쿼리 셋

Product.objects.get(pk=id)

Product.objects.get(pk=id).delete()
```
