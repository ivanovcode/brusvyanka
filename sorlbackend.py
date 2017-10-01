# coding: utf-8
from sorl.thumbnail.base import ThumbnailBackend, EXTENSIONS
from sorl.thumbnail.conf import settings
from sorl.thumbnail.compat import smart_text


def tokey(*args):
    salt = '_'.join([smart_text(arg) for arg in args])
    return salt


class EliseevBackend(ThumbnailBackend):

    def _get_thumbnail_filename(self, source, geometry_string, options):
        """
        Computes the destination filename.
        """
        name = source.name.split("/")[-1].replace('.jpg', '')
        key = tokey(name, geometry_string)
        # make some subdirs
        path = '%s/%s/%s' % (key[:2], key[2:4], key)
        return '%s%s.%s' % (settings.THUMBNAIL_PREFIX, path, EXTENSIONS[options['format']])
