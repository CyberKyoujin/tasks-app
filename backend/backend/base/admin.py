from django.contrib import admin
from base.models import CustomUser, Task


admin.site.register(CustomUser)
admin.site.register(Task)

