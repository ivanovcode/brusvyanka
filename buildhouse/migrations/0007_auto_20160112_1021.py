# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildhouse', '0006_auto_20151224_2216'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tagproject',
            options={'ordering': ['order']},
        ),
        migrations.AddField(
            model_name='tagproject',
            name='order',
            field=models.IntegerField(default=300, verbose_name=b'\xd0\xa1\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd0\xb0'),
        ),
    ]
