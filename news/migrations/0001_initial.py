# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('name', models.CharField(max_length=255, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb8\xd0\xbc\xd0\xb5\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5')),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='\u0414\u0430\u0442\u0430 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438')),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'articles/', null=True, verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430', blank=True)),
                ('anons', models.TextField(verbose_name='\u0410\u043d\u043e\u043d\u0441')),
                ('text', models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442')),
                ('is_draft', models.BooleanField(default=False, verbose_name='\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a?')),
                ('index_option', models.BooleanField(default=True, verbose_name=b'\xd0\x98\xd0\xbd\xd0\xb4\xd0\xb5\xd0\xba\xd1\x81\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xb0\xd1\x82\xd1\x8c \xd1\x81\xd1\x82\xd1\x80\xd0\xb0\xd0\xbd\xd0\xb8\xd1\x86\xd1\x83?')),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('url', models.CharField(max_length=255, blank=True)),
            ],
            options={
                'ordering': ['-date'],
                'get_latest_by': 'date',
                'verbose_name': '\u041f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f',
                'verbose_name_plural': '\u041f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438',
            },
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a')),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='\u0414\u0430\u0442\u0430 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438')),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'news/', null=True, verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430', blank=True)),
                ('anons', models.TextField(verbose_name='\u0410\u043d\u043e\u043d\u0441')),
                ('text', models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442')),
                ('is_draft', models.BooleanField(default=False, verbose_name='\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a?')),
                ('index_option', models.BooleanField(default=True, verbose_name=b'\xd0\x98\xd0\xbd\xd0\xb4\xd0\xb5\xd0\xba\xd1\x81\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xb0\xd1\x82\xd1\x8c \xd1\x81\xd1\x82\xd1\x80\xd0\xb0\xd0\xbd\xd0\xb8\xd1\x86\xd1\x83?')),
            ],
            options={
                'ordering': ['-date'],
                'get_latest_by': 'date',
                'verbose_name': '\u041d\u043e\u0432\u043e\u0441\u0442\u044c',
                'verbose_name_plural': '\u041d\u043e\u0432\u043e\u0441\u0442\u0438',
            },
        ),
        migrations.CreateModel(
            name='Photoarticles',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, null=True, verbose_name='\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0434\u043b\u044f \u0444\u043e\u0442\u043e', blank=True)),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'photoarticles/', verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430')),
                ('order', models.IntegerField(default=0, verbose_name='\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430')),
                ('news', models.ForeignKey(verbose_name='\u041f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f', to='news.Articles')),
            ],
            options={
                'ordering': ['order'],
                'verbose_name': '\u0424\u043e\u0442\u043e \u0434\u043b\u044f \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438',
                'verbose_name_plural': '\u0424\u043e\u0442\u043a\u0438 \u0434\u043b\u044f \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0439',
            },
        ),
        migrations.CreateModel(
            name='Photonews',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, null=True, verbose_name='\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0434\u043b\u044f \u0444\u043e\u0442\u043e', blank=True)),
                ('img', sorl.thumbnail.fields.ImageField(upload_to=b'photonews/', verbose_name='\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430')),
                ('order', models.IntegerField(default=0, verbose_name='\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430')),
                ('news', models.ForeignKey(verbose_name='\u041d\u043e\u0432\u043e\u0441\u0442\u044c', to='news.News')),
            ],
            options={
                'ordering': ['order'],
                'verbose_name': '\u0424\u043e\u0442\u043e \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0441\u0442\u0438',
                'verbose_name_plural': '\u0424\u043e\u0442\u043a\u0438 \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0441\u0442\u0435\u0439',
            },
        ),
    ]
