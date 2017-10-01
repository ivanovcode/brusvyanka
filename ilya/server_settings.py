from settings import *

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = '/media/'

STATICFILES_DIRS = ()
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

DEBUG = False

X_FRAME_OPTIONS = ""

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/errors.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}

ROLLBAR = {
    'access_token': '9d205dc5e78b459dafdaa756bb7c9c0e',
    'environment': 'development' if DEBUG else 'production',
    'root': BASE_DIR,
}
