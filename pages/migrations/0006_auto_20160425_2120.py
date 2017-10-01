# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0005_banner_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url_site',
            name='url',
            field=models.CharField(max_length=255, db_index=True),
        ),
    ]
