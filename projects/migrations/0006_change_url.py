# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


def change_urls(apps, schema_editor):
    for app_name in ('projects', 'buildhouse', 'interior'):
        for name in ('Tag', 'Project'):
            model = apps.get_model(app_name, name)
            objects = model.objects.all()
            for obj in objects:
                obj.save()


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20151219_0938'),
    ]

    operations = [
        migrations.RunPython(change_urls),
    ]
