# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-11-23 20:16
from __future__ import unicode_literals

from django.db import migrations


def forwards(apps, schema_editor):
    urls = ['ceny', 'arhitektor']
    Page = apps.get_model("pages", "Page")
    Page.objects.filter(url__in=urls).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0030_auto_20161123_2245'),
    ]

    operations = [
        migrations.RunPython(forwards, reverse_code=migrations.RunPython.noop),
    ]
