# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import migrations
import os
from django.core import serializers
from django.conf import settings


fixture_dir = os.path.join(settings.BASE_DIR, 'pages/')
fixture_filename = 'dump_pages.json'


def load_fixture(apps, schema_editor):
    fixture_file = os.path.join(fixture_dir, fixture_filename)
    fixture = open(fixture_file, 'rb')
    objects = serializers.deserialize('json', fixture, ignorenonexistent=True)
    for obj in objects:
        break
        # obj.save()
    fixture.close()


def unload_fixture(apps, schema_editor):
    model_page = apps.get_model("pages", "Page")
    model_page.objects.all().delete()
    model_banner = apps.get_model("pages", "Banner")
    model_banner.objects.all().delete()
    model_logo = apps.get_model("pages", "Logo")
    model_logo.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_banner_title2'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code=unload_fixture),
    ]
