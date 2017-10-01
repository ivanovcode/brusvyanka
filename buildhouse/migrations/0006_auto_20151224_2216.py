# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildhouse', '0005_auto_20151219_0938'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tagproject',
            options={'ordering': ['project__order']},
        ),
    ]
