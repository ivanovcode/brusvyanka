# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('buildhouse', '0002_load_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='descr',
            field=tinymce.models.HTMLField(verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435'),
        ),
    ]
