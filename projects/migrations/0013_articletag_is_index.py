# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0012_auto_20160119_1759'),
    ]

    operations = [
        migrations.AddField(
            model_name='articletag',
            name='is_index',
            field=models.BooleanField(default=True, verbose_name='\u0418\u043d\u0434\u0435\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u0442\u044c?'),
        ),
    ]
