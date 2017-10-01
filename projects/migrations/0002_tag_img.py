# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='img',
            field=sorl.thumbnail.fields.ImageField(upload_to=b'tag_img', verbose_name=b'\xd0\x9a\xd0\xb0\xd1\x80\xd1\x82\xd0\xb8\xd0\xbd\xd0\xba\xd0\xb0', blank=True),
        ),
    ]
