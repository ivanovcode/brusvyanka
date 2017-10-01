# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_auto_20160112_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='tag_root',
            field=models.ForeignKey(verbose_name=b'\xd0\xa2\xd0\xb5\xd0\xb3', blank=True, to='projects.Tag', null=True),
        ),
    ]
