# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_load_data'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TypeProject2',
        ),
    ]
