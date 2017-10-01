# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_change_url'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tagproject',
            options={'ordering': ['project__order']},
        ),
    ]
