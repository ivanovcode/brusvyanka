from settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'ilya',
        'USER': 'pipeline',
        'PASSWORD': 'pipeline',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}

DEBUG = True

MEDIA_ROOT = os.path.join(BASE_DIR, "media/")
MEDIA_URL = '/media/'

STATICFILES_DIRS = ()
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
