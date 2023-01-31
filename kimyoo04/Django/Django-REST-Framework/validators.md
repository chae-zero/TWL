```py
from rest_framework import serializers

from core.models import Project

def validate_title(value):
	qs = Project.objects.filter(title__iexact=value)
	if qs.exists():
		raise serializers.ValidationError(f'{value} is already a product name.')
	return value
```

```py
from core.validators import validate_title

class ProjectSerializer(serializers.ModelSerializer):
	title = serializers.CharField(validators=[validate_title])
```

### 외부로 validator를 두는 경우는 잘 안한다. 그래도 알아두자

- 보통은 serializer로 self.context.get('request') 후 user 정보를 받아서 user를 validate할 때 쓰는 경우가 많다.
