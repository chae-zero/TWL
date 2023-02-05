# reverse()

```py
from rest_framework import serializers

from rest_framework.reverse import reverse
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    my_discount = serializers.SerializerMethodField(read_only=True)
    edit_url = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
            view_name='project-detail',
            lookup_field='pk'
    )
    class Meta:
        model = Project
        fields = [
            'url',
            'edit_url',
            'pk',
            'title',
            'content',
            'price',
            'sale_price',
            'my_discount',
        ]

    def get_edit_url(self, obj):
        request = self.context.get('request') # self.request
        if request is None:
            return None
        return reverse("project-edit", kwargs={"pk": obj.pk}, request=request)

    def get_my_discount(self, obj):
        if not hasattr(obj, 'id'):
            return None
```

```py
urlpatterns = [
    path('', views.project_list_create_view, name='project-list'),
    path('<int:pk>/update/', views.project_update_view.as_view(), name='project-edit'),
    path('<int:pk>/delete/', views.project_destroy_view.as_view())
    path('<int:pk>/', views.project_destroy_view.as_view(), name='project-detail') # 이름을 지정해주기
]
```

```py
# def create(self, validated_data):
#     # return Project.obejcts.create(**validated_data)
#     # email = validated_data.pop('email')
#     obj = super().create(validated_data)
#     # print(email, obj)
#     return obj

# def update(self, instance, validated_data):
#     email = validated_data.pop('email')
#     return super().update(instance, validated_data)
```
