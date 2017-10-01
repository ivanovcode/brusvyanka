# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildhouse', '0008_tag_tag_root'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='tag_root',
        ),
    ]
