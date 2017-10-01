# coding: utf-8
"""
Запускать:
fab develop deploy


На сервере нужен fabric

"""


from fabric.api import env, task, run, hide, cd, local, put, prefix
from contextlib import contextmanager
from fabric import colors
import os.path
import functools

TAR_FILE_NAME = 'tmp.tar.gz'
DATE_FORMAT = '%y_%m_%d_%H_%M'


@task
def master():
    env.colorize_errors = True
    env.user = 'root'
    env.host_string = 'ilyaeliseev.ru'
    env.server_title = 'ilya master'
    env.git_branch = 'master'

    env.venv_dir = '/home/ilyaeliseev/venv/'
    env.code_dir = '/home/ilyaeliseev'

    env.django_stop = '/etc/init.d/apache2 stop'
    env.django_start = '/etc/init.d/apache2 start'

    env.web_user = 'www-data'
    env.web_group = 'www-data'


@task
def develop():
    env.colorize_errors = True
    env.user = 'root'
    env.host_string = 'test.soda.house'
    env.server_title = 'ilya dev'
    env.git_branch = 'dev'

    env.venv_dir = '/home/ilyaeliseev/venv/'
    env.code_dir = '/home/ilyaeliseev'

    env.django_stop = '/etc/init.d/apache2 stop'
    env.django_start = '/etc/init.d/apache2 start'

    env.web_user = 'www-data'
    env.web_group = 'www-data'


@task
def deploy(migrate_db=False, branch=None):
    run('whoami')

    if branch:
        env.git_branch = branch

    print colors.blue('Deploy on %(server_title)s, %(hosts)s, git:%(git_branch)s,' % env),
    print colors.blue('migrate:%s' % migrate_db)

    with hide('running', 'stdout'):
        env.date = run('date +%s' % DATE_FORMAT)

    try:
        with hide('running', 'stdout'):
            run(env.django_stop)
    except:
        pass

    create_work_dir()
    upload_tar_from_git()
    install_dependencies()
    migrate_django()

    update_symlink()
    with cd('%s/src' % env.code_dir):
        run(env.django_start)

    if env.git_branch == 'master':
        with cd('%s/src' % env.code_dir):
            run('mv static/robots_master.txt static/robots.txt')


def message(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        print colors.green(fn.__name__.replace('_', ' ').strip().capitalize())
        return fn(*args, **kwargs)
    return wrapper


@message
def migrate_django():
    with cd(env.work_dir):
        with source_virtualenv():
            run('python manage.py migrate --settings=ilya.server_settings')
            run('python manage.py collectstatic  -l --noinput --settings=ilya.server_settings')
            run('python manage.py clear_urls --settings=ilya.server_settings')
            # run('css-html-js-minify.py --overwrite static/css/')
            # run('css-html-js-minify.py --overwrite static/js/')


@message
def create_work_dir():
    env.work_dir = os.path.join(env.code_dir, env.date)
    run('mkdir -p %(work_dir)s' % env)


@message
def upload_tar_from_git():
    local('git archive --format=tar %s | gzip > %s' % (env.git_branch, TAR_FILE_NAME))
    put(TAR_FILE_NAME, '%(work_dir)s' % env)
    local('rm %s' % TAR_FILE_NAME)
    with cd(env.work_dir):
        run('tar zxf %s' % TAR_FILE_NAME)
        run('rm %s' % TAR_FILE_NAME)
    if env.host_string == 'test.soda.house':
        run('chown -R soda:soda %s' % env.work_dir)


@message
def test():
    local('python manage.py test')


@message
def install_dependencies():
    with cd(env.work_dir):
        with source_virtualenv():
            run('pip install -r requirements.txt')


@message
def update_symlink():
    with cd(env.code_dir):
        run('ln -sfn %s src' % env.work_dir)
        run('chmod 755 src')


@contextmanager
def source_virtualenv():
    with prefix('source ' + os.path.join(env.venv_dir, 'bin/activate')):
        yield
