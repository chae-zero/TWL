### Users & Groups Permissions with DjangoModelPermissions

- admin 페이지에서 superuser 계정을 통해 user 생성
- 계정 수정 창에서 Permissions 칸에서 Staff status를 체크 유무로 staff 유무 조절
- 계정 수정 창에서 Groups 와 User Permissions에서 Chosen 창으로 추가하면 권한 추가됨
- Add Group 하면서 Available permissions에서 권한을 Chosen 창으로 추가하면 특정 권한을 가진 그룹이 생성됨 (유저가 그 그룹에 속하고 안속하게 하면서 권한 관리)
- permissions.DjangoModelPermissions 로 교체 (이것은 GET 요청을 제외하여 허가를 부여하기 때문에 GET 요청을 바꾸려면 custom 해야한다.)

### Custom Permission

- BlockListPermission 추가 가능 (아이피 추적후 blocklist에 있는 아이피를 차단하는 기능)
- IsOwnerOrReadOnly 추가 가능 (obj.owner == request.user 확인으로 수정, 삭제 권한 부여)

```py
# staff 계정의 권한을 조절하는 custom permission 클래스 정의 ()
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 아래와 같은 방식은 거의 필요없음. 가능하다는 것만 파악해둘 것
    def has_permission(self, request, view):
        user = request.user
        print(user.get_all_permissions()) # 유저의 권한 확인
        if user.is_staff:
            if user.has_perm('projects.add_project'): # 'app_name.verb_model_name'
                return True
            if user.has_perm('projects.delete_project'):
                return True
            if user.has_perm('projects.change_project'):
                return True
            if user.has_perm('projects.view_project'):
                return True
            return False
        return False
```

```py
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 아래와 같은 방식은 permissions.isAdminUser 와 거의 동일한 것임.
    def has_permissions(self, request, view):
        if not request.user.is_staff:
            return False
        return super().has_permission(request, view)
```

```py
# permissions.py 파일 새로 생성 (커스텀한 permissions 파일 -> permission_classes 변수에 리스트로 감싸서 넣어줄 것)
from rest_framework import permissions


# staff 계정의 권한을 조절하는 custom permission 클래스 정의 ()
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 실제 DjangoModelPermissions 의 코드를 보면 perms_map이 있음
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'], # GET은 빈 리스트인 것을 재정의
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    def has_permissions(self, request, view):
        # 특정 유저 이름을 제외, 포함시키는 방법
        if not request.user.username == "adminname":
            return False
        # 특정 유저가 staff 유무 확인하는 방법
        if not request.user.is_staff:
            return False
        return super().has_permission(request, view)
```

```py
class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authencation_classes = [authentication.SessionAuthentication]
    # perms_map 만 커스텀한 후 IsAdminUser와 같이 permission_classes에 저장
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
```

### Using Mixins for Permissions

- 모든 클래스기반 뷰에 permission_classes를 재정의하기보다 mixin으로 permission_classes를 정의 후 mixin을 상속하는 것이 효율적임

```py
# api/mixins.py
from rest_framework import permissions
from .permissions import IsStaffEditorPermission

class StaffEditorPermissionMixin():
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
```
