# coding: utf-8
from django.core.management.base import BaseCommand, CommandError
from pages.models import Url_Site, Page
from projects.models import Project, Tag, ArticleTag
from buildhouse.models import Project as BProject, Tag as BTag, ArticleTag as BArticleTag
from interior.models import Project as IProject, Tag as ITag


class Command(BaseCommand):
    help = u'Очищает и заново создает ссылки'

    # def add_arguments(self, parser):
    #     parser.add_argument('poll_id', nargs='+', type=int)

    def handle(self, *args, **options):
        Url_Site.objects.all().delete()
        models = (Project, Tag, BProject, BTag, Page, IProject, ITag, ArticleTag, BArticleTag)
        for model in models:
            objects = model.objects.all()
            for o in objects:
                o.save()
        self.stdout.write(u'Команда успешно выполнена')
