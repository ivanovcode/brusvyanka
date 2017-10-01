# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_auto_20151212_2317'),
    ]

    operations = [
        migrations.AddField(
            model_name='banner',
            name='position',
            field=models.CharField(default=b'right', max_length=10, verbose_name=b'\xd0\x9f\xd0\xbe\xd0\xbb\xd0\xbe\xd0\xb6\xd0\xb5\xd0\xbd\xd0\xb8\xd0\xb5', choices=[(b'left', b'\xd0\xa1\xd0\xbb\xd0\xb5\xd0\xb2\xd0\xb0'), (b'right', b'\xd0\xa1\xd0\xbf\xd1\x80\xd0\xb0\xd0\xb2\xd0\xb0')]),
        ),
    ]
