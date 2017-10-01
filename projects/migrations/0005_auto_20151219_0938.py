# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_delete_typeproject2'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='planproject',
            options={'ordering': ['photo'], 'verbose_name': '\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430 \u043f\u0440\u043e\u0435\u043a\u0442\u0430', 'verbose_name_plural': '\u041f\u043b\u0430\u043d\u044b \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432'},
        ),
    ]
