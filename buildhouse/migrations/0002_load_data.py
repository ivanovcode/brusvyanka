# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import migrations
import os
from django.core import serializers
from django.conf import settings


fixture_dir = os.path.join(settings.BASE_DIR, 'buildhouse/')
fixture_filename = 'dump_bprojects.json'


def load_fixture(apps, schema_editor):
    fixture_file = os.path.join(fixture_dir, fixture_filename)
    fixture = open(fixture_file, 'rb')
    objects = serializers.deserialize('json', fixture, ignorenonexistent=True)
    for obj in objects:
        break
        # obj.save()
    fixture.close()


def unload_fixture(apps, schema_editor):
    for name in ('Tag', 'Project', 'TagProject', 'PhotoProject', 'PlanProject'):
        model = apps.get_model("buildhouse", name)
        model.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
        ('buildhouse', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code=unload_fixture),
    ]
