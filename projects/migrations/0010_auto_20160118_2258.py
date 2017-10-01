# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_tag_tag_root'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('name', models.CharField(max_length=255, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb8\xd0\xbc\xd0\xb5\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5')),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'articles/', null=True, verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430', blank=True)),
                ('text', models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442')),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('url', models.CharField(max_length=255, blank=True)),
            ],
            options={
                'verbose_name': '\u0421\u0442\u0430\u0442\u044c\u044f',
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u044c\u0438',
            },
        ),
        migrations.RemoveField(
            model_name='tag',
            name='tag_root',
        ),
        migrations.AddField(
            model_name='articletag',
            name='tag',
            field=models.ForeignKey(verbose_name=b'\xd1\x82\xd0\xb5\xd0\xb3', to='projects.Tag'),
        ),
    ]
