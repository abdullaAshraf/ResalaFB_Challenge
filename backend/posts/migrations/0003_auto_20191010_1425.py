# Generated by Django 2.2.6 on 2019-10-10 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_configration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='createDate',
            new_name='created_time',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='content',
            new_name='message',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='link',
            new_name='permalink_url',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='editDate',
            new_name='updated_time',
        ),
        migrations.AlterField(
            model_name='configration',
            name='key',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
