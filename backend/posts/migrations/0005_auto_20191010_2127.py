# Generated by Django 2.2.6 on 2019-10-10 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20191010_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_time',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='updated_time',
            field=models.DateTimeField(),
        ),
    ]
