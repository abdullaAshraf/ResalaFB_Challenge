from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Configration(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.key} = {self.value}"


class Category(models.Model):
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class Post(models.Model):

    permalink_url = models.CharField(max_length=100)
    message = models.TextField()
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    created_time = models.DateTimeField(null=False)
    updated_time = models.DateTimeField(null=False)
    deleted = models.BooleanField(default=False)
    seen = models.BooleanField(default=False)
    working = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)
    alt_text = models.CharField(max_length=500, null=True, blank=True)
    assignedRoles = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"content: {self.message[:15]}, created_time: {self.created_time}"
