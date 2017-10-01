# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import migrations
import os
from django.core import serializers
from django.conf import settings


fixture_dir = os.path.join(settings.BASE_DIR, 'projects/')
fixture_filename = 'dump_projects.json'


def load_fixture(apps, schema_editor):
    fixture_file = os.path.join(fixture_dir, fixture_filename)
    fixture = open(fixture_file, 'rb')
    objects = serializers.deserialize('json', fixture, ignorenonexistent=True)
    for obj in objects:
        break
        # obj.save()
    fixture.close()


def unload_fixture(apps, schema_editor):
    for name in ('TypeProject2', 'Tag', 'Project', 'TagProject', 'PhotoProject', 'PlanProject'):
        model = apps.get_model("projects", name)
        model.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_tag_img'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code=unload_fixture),
    ]
