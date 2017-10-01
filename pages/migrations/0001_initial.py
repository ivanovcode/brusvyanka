# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb7\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5 \xd0\xb1\xd0\xb0\xd0\xbd\xd0\xbd\xd0\xb5\xd1\x80\xd0\xb0')),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'images_a/', null=True, verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430', blank=True)),
                ('flash', models.FileField(upload_to=b'flash_a/', null=True, verbose_name='\u0444\u043b\u0435\u0448\u043a\u0430', blank=True)),
                ('flash_width', models.IntegerField(default=242, verbose_name='\u0448\u0438\u0440\u0438\u043d\u0430 \u0444\u043b\u0435\u0448\u043a\u0438')),
                ('flash_height', models.IntegerField(default=242, verbose_name='\u0432\u044b\u0441\u043e\u0442\u0430 \u0444\u043b\u0435\u0448\u043a\u0438')),
                ('url', models.CharField(max_length=255, verbose_name=b'URL')),
                ('sort', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
            ],
            options={
                'ordering': ['sort'],
                'verbose_name': '\u0411\u0430\u043d\u043d\u0435\u0440',
                'verbose_name_plural': '\u0411\u0430\u043d\u043d\u0435\u0440\u044b',
            },
        ),
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, null=True, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb7\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5 \xd0\xbb\xd0\xbe\xd0\xb3\xd0\xbe', blank=True)),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'logos/', verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430')),
                ('sort', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
            ],
            options={
                'ordering': ['sort'],
                'verbose_name': '\u041b\u043e\u0433\u043e',
                'verbose_name_plural': '\u041b\u043e\u0433\u043e',
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('name', models.CharField(max_length=255, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb8\xd0\xbc\xd0\xb5\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5')),
                ('body', models.TextField(verbose_name=b'\xd0\xa2\xd0\xb5\xd0\xba\xd1\x81\xd1\x82')),
                ('footer_body', models.TextField(blank=True)),
                ('url', models.CharField(max_length=255)),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('index_option', models.BooleanField(default=True, verbose_name=b'\xd0\x98\xd0\xbd\xd0\xb4\xd0\xb5\xd0\xba\xd1\x81\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xb0\xd1\x82\xd1\x8c \xd1\x81\xd1\x82\xd1\x80\xd0\xb0\xd0\xbd\xd0\xb8\xd1\x86\xd1\x83?')),
                ('is_draft', models.BooleanField(default=False, verbose_name=b'\xd0\xa7\xd0\xb5\xd1\x80\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb8\xd0\xba?')),
            ],
            options={
                'verbose_name': '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430',
                'verbose_name_plural': '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b',
            },
        ),
        migrations.CreateModel(
            name='Url_Site',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.CharField(max_length=255)),
                ('content_id', models.PositiveIntegerField(null=True)),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType', null=True)),
            ],
            options={
                'verbose_name': 'URL',
                'verbose_name_plural': 'URL',
            },
        ),
    ]
