# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_load_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='body',
            field=tinymce.models.HTMLField(verbose_name=b'\xd0\xa2\xd0\xb5\xd0\xba\xd1\x81\xd1\x82'),
        ),
    ]
