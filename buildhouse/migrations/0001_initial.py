# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PhotoProject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', sorl.thumbnail.fields.ImageField(upload_to=b'photoprojectb/', verbose_name='\u0444\u043e\u0442\u043e', blank=True)),
                ('title', models.CharField(max_length=255, null=True, verbose_name='\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a', blank=True)),
                ('alt', models.CharField(default=b'', max_length=255, verbose_name='Alt', blank=True)),
                ('text', tinymce.models.HTMLField(default=b' ', verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435', blank=True)),
                ('order', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
            ],
            options={
                'ordering': ['order'],
                'verbose_name': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430',
                'verbose_name_plural': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432',
            },
        ),
        migrations.CreateModel(
            name='PlanProject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', sorl.thumbnail.fields.ImageField(upload_to=b'planprojectb/', verbose_name='\u0444\u043e\u0442\u043e')),
            ],
            options={
                'verbose_name': '\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430 \u043f\u0440\u043e\u0435\u043a\u0442\u0430',
                'verbose_name_plural': '\u041f\u043b\u0430\u043d\u044b \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('mainphoto', sorl.thumbnail.fields.ImageField(upload_to=b'photoprojectb/', verbose_name=b'\xd0\x93\xd0\xbb\xd0\xb0\xd0\xb2\xd0\xbd\xd0\xbe\xd0\xb5 \xd1\x84\xd0\xbe\xd1\x82\xd0\xbe \xd0\xbf\xd1\x80\xd0\xbe\xd0\xb5\xd0\xba\xd1\x82\xd0\xb0')),
                ('descr', tinymce.models.HTMLField(verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('sq', models.IntegerField(help_text=b'\xd0\xbd\xd0\xb0\xd0\xbf\xd1\x80\xd0\xb8\xd0\xbc\xd0\xb5\xd1\x80: 700', verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u044c')),
                ('order', models.IntegerField(default=0, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0')),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('index_option', models.BooleanField(default=True, verbose_name=b'\xd0\x98\xd0\xbd\xd0\xb4\xd0\xb5\xd0\xba\xd1\x81\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xb0\xd1\x82\xd1\x8c \xd1\x81\xd1\x82\xd1\x80\xd0\xb0\xd0\xbd\xd0\xb8\xd1\x86\xd1\x83?')),
                ('articul', models.CharField(max_length=255, blank=True)),
                ('url', models.CharField(max_length=255, blank=True)),
            ],
            options={
                'ordering': ['order'],
                'verbose_name': '\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u0434\u043e\u043c\u043e\u0432',
                'verbose_name_plural': '\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u0434\u043e\u043c\u043e\u0432',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xd0\x9d\xd0\xb0\xd0\xb8\xd0\xbc\xd0\xb5\xd0\xbd\xd0\xbe\xd0\xb2\xd0\xb0\xd0\xbd\xd0\xb8\xd0\xb5')),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('h1', models.CharField(max_length=255, verbose_name=b'h1')),
                ('url', models.CharField(max_length=255)),
                ('descr', models.TextField(verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('sort', models.IntegerField(default=0)),
                ('keyword', models.CharField(max_length=255, blank=True)),
                ('description', models.CharField(max_length=255, blank=True)),
                ('is_index', models.BooleanField(default=True, verbose_name='\u0418\u043d\u0434\u0435\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u0442\u044c?')),
            ],
            options={
                'ordering': ['sort'],
                'verbose_name': '\u0422\u0435\u0433',
                'verbose_name_plural': '\u0422\u0435\u0433\u0438',
            },
        ),
        migrations.CreateModel(
            name='TagProject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('project', models.ForeignKey(to='buildhouse.Project')),
                ('tag', models.ForeignKey(to='buildhouse.Tag')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='tags',
            field=models.ManyToManyField(to='buildhouse.Tag', through='buildhouse.TagProject'),
        ),
        migrations.AddField(
            model_name='planproject',
            name='project',
            field=models.ForeignKey(verbose_name='\u043f\u0440\u043e\u0435\u043a\u0442', to='buildhouse.Project'),
        ),
        migrations.AddField(
            model_name='photoproject',
            name='project',
            field=models.ForeignKey(verbose_name='\u043f\u0440\u043e\u0435\u043a\u0442', to='buildhouse.Project'),
        ),
    ]
