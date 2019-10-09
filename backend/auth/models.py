import operator
from functools import reduce

from django.conf import settings
from django.db.models import Q
from django.db import models
from django.contrib.auth.models import User



import logging


class AccountManger(models.Manager):
    def search(self, **kwargs):
        search = kwargs['search'].strip().split(" ")
        query_first_name = reduce(operator.or_, (Q(user__first_name__contains=item)
                                                 for item in search))
        query_last_name = reduce(operator.or_, (Q(user__last_name__contains=item)
                                                for item in search))
        return super(AccountManger, self).filter(
            Q(query_first_name) |
            Q(query_last_name)
        ).distinct()


class Role(models.Model):
    name = models.CharField(max_length=100)
    readCategories = models.CharField(max_length=100)
    writeCategories = models.CharField(max_length=100)
    acceptMembers = models.BooleanField()
    modifyRoles = models.BooleanField()
    rank = models.IntegerField()


class Account(models.Model):

    user = models.OneToOneField(
        User, related_name="account", on_delete=models.CASCADE)

    created_at = models.DateTimeField(null=False, auto_now_add=True)
    roles = models.CharField(max_length=100)

    objects = AccountManger()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.user.username

    @property
    def username(self):
        return self.user.username

    @property
    def full_name(self):
        return self.user.get_full_name()

    @property
    def email(self):
        return self.user.email

