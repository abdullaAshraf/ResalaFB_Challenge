from django.db import models

# Create your models here.


class Role(models.Model):
    name = models.CharField(max_length=100)
    readCategories = models.CharField(max_length=100)
    writeCategories = models.CharField(max_length=100)
    acceptMembers = models.BooleanField()
    modifyRoles = models.BooleanField()
    rank = models.IntegerField()
