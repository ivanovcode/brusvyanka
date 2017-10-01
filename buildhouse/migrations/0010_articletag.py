# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('buildhouse', '0009_remove_tag_tag_root'),
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
                ('text', tinymce.models.HTMLField(verbose_name='\u0422\u0435\u043a\u0441\u0442')),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('url', models.CharField(max_length=255, blank=True)),
                ('order', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
                ('is_index', models.BooleanField(default=True, verbose_name='\u0418\u043d\u0434\u0435\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u0442\u044c?')),
                ('tag', models.ForeignKey(verbose_name=b'\xd1\x82\xd0\xb5\xd0\xb3', to='buildhouse.Tag')),
            ],
            options={
                'ordering': ('order',),
                'verbose_name': '\u0421\u0442\u0430\u0442\u044c\u044f',
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u044c\u0438',
            },
        ),
    ]
