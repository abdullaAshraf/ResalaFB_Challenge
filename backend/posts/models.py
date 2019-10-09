from datetime import datetime
from django.db import models

# Create your models here.


class Category(models.Model):
	name = models.CharField(max_length=80)

class Post(models.Model):

    link = models.CharField(max_length=100)
    content = models.TextField()
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
    )
    createDate = models.DateTimeField(null=False, auto_now_add=True)
    editDate = models.DateTimeField(null=False, auto_now_add=True)
    deleted = models.BooleanField(default=False)
    seen = models.BooleanField(default=False)
    working = models.BooleanField(default=False)
    notes = models.TextField()
    assignedRoles = models.CharField(max_length=200)


