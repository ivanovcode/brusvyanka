# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-11-17 13:06
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0016_auto_20161117_1512'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(blank=True, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('video_url', models.CharField(max_length=255, verbose_name='\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0432\u0438\u0434\u0435\u043e')),
                ('sort', models.IntegerField(default=200, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
            ],
            options={
                'ordering': ('sort',),
                'verbose_name': '\u041e\u0442\u0437\u044b\u0432',
                'verbose_name_plural': '\u041e\u0442\u0437\u044b\u0432\u044b',
            },
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='\u0424\u0418\u041e')),
                ('position', models.CharField(max_length=255, verbose_name='\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c')),
                ('descr', models.TextField(blank=True, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('photo', sorl.thumbnail.fields.ImageField(upload_to=b'images_staff/', verbose_name='\u0424\u043e\u0442\u043e')),
                ('sort', models.IntegerField(default=200, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
            ],
            options={
                'ordering': ('sort',),
                'verbose_name': '\u0420\u0430\u0431\u043e\u0442\u043d\u0438\u043a',
                'verbose_name_plural': '\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u043b',
            },
        ),
    ]
