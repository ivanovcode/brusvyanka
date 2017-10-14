# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2017-10-14 22:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import sorl.thumbnail.fields
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('interior', '0004_auto_20171008_1924'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('name', models.CharField(max_length=255, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb8\xd0\xbc\xd0\xb5\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5')),
                ('img', sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to=b'articles/', verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430')),
                ('text', tinymce.models.HTMLField(verbose_name='\u0422\u0435\u043a\u0441\u0442')),
                ('keyword', models.CharField(blank=True, max_length=255)),
                ('description', models.CharField(blank=True, max_length=255)),
                ('url', models.CharField(blank=True, max_length=255)),
                ('order', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
                ('is_index', models.BooleanField(default=True, verbose_name='\u0418\u043d\u0434\u0435\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u0442\u044c?')),
                ('tag', models.ForeignKey(blank=True, help_text=b'\xd0\x95\xd1\x81\xd0\xbb\xd0\xb8 \xd0\xbd\xd0\xb5 \xd0\xb2\xd1\x8b\xd0\xb1\xd1\x80\xd0\xb0\xd1\x82\xd1\x8c \xd1\x82\xd0\xb5\xd0\xb3, \xd1\x82\xd0\xbe \xd1\x81\xd1\x82\xd0\xb0\xd1\x82\xd1\x8c\xd1\x8f \xd0\xbf\xd0\xbe\xd1\x8f\xd0\xb2\xd0\xb8\xd1\x82\xd1\x81\xd1\x8f \xd0\xb2 \xd0\xbf\xd1\x80\xd0\xbe\xd0\xb5\xd0\xba\xd1\x82\xd0\xb0\xd1\x85', null=True, on_delete=django.db.models.deletion.CASCADE, to='interior.Tag', verbose_name=b'\xd1\x82\xd0\xb5\xd0\xb3')),
            ],
            options={
                'ordering': ('order',),
                'verbose_name': '\u0421\u0442\u0430\u0442\u044c\u044f',
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u044c\u0438',
            },
        ),
    ]
