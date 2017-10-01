# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import migrations
import os
from django.core import serializers
from django.conf import settings


fixture_dir = os.path.join(settings.BASE_DIR, 'news/')
fixture_filename = 'dump_news.json'


def load_fixture(apps, schema_editor):
    fixture_file = os.path.join(fixture_dir, fixture_filename)
    fixture = open(fixture_file, 'rb')
    objects = serializers.deserialize('json', fixture, ignorenonexistent=True)
    for obj in objects:
        try:
            obj.save()
        except:
            pass
    fixture.close()


def unload_fixture(apps, schema_editor):
    for name in ('News', 'Article'):
        model = apps.get_model("news", name)
        model.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code=unload_fixture),
    ]
