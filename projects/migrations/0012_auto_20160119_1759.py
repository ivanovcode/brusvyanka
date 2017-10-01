# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0011_auto_20160118_2305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articletag',
            name='text',
            field=tinymce.models.HTMLField(verbose_name='\u0422\u0435\u043a\u0441\u0442'),
        ),
    ]
