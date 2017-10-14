# -*- coding: utf-8 -*-
from django.db import models
from sorl.thumbnail import ImageField
from django.contrib.sitemaps import Sitemap
from django.db.models.signals import post_save, post_delete
from django.contrib.contenttypes.models import ContentType
from pages.models import Url_Site
from tinymce.models import HTMLField


class Tag(models.Model):
    name = models.CharField('Наименование', max_length=100)
    title = models.CharField('Title', max_length=255)
    img = ImageField('Картинка', upload_to='tag_img', blank=True)
    h1 = models.CharField('h1', max_length=255)
    url = models.CharField(max_length=255)
    # descr = models.TextField(u"Описание")
    descr = HTMLField(u"Описание")
    sort = models.IntegerField(default=0)
    keyword = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    is_index = models.BooleanField(u"Индексировать?", default=True)
    module = "interior.views"
    view = "view_tag"

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"
        ordering = ['sort']

    def get_absolute_url(self):
        return "/rekonstrukciya-domov/%s/" % self.url


class Project(models.Model):
    name = models.CharField(u"Название проекта",max_length=255)
    title = models.CharField('Title', max_length=255)
    h1 = models.CharField('h1', max_length=255)
    url = models.CharField(max_length=255, blank=True)
    mainphoto = ImageField("Главное фото проекта", upload_to="photoproject/")
    # descr = models.TextField(u"Описание", blank=True)
    descr = HTMLField(u"Описание", blank=True)
    sq = models.IntegerField(u"Площадь", help_text="например: 700")
    order = models.IntegerField("Сортировка", default=0)
    visible_index = models.BooleanField("Показывать на главной?", default=False)
    keyword = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    is_index = models.BooleanField(u"Индексировать?", default=True)
    articul = models.CharField(max_length=255, blank=True)
    alt = models.CharField(u"Alt", max_length=255, blank=True, default="")
    tags = models.ManyToManyField(Tag, through='TagProject')
    module = "interior.views"
    view = "view_project_w"

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = "Реконструкция"
        verbose_name_plural = 'Реконструкция'
        ordering = ['order']

    def get_absolute_url(self):
        if self.url:
            return "/rekonstrukciya-domov/%s/" % self.url
        else:
            return "/rekonstrukciya-domov/%s/" % self.pk


class TagProject(models.Model):
    project = models.ForeignKey(Project)
    tag = models.ForeignKey(Tag)

    def __unicode__(self):
        return self.tag.name

    class Meta:
        ordering = ['project__order']


class PhotoProject(models.Model):
    project = models.ForeignKey(u"Project", verbose_name=u"проект")
    photo = ImageField(u"фото", upload_to="photoproject/", blank=True)
    flash = models.FileField("Заголовки", upload_to="flashobjects/", help_text="размеры флеш объекта должны быть 602px × 427px", blank=True, null=True)
    title = models.CharField(u"Заголовок", max_length=255, blank=True, null=True)
    text = HTMLField(u"Описание", blank=True, default=" ")
    alt = models.CharField(u"Alt", max_length=255, blank=True, default="")
    order = models.IntegerField("Сортировка", default=0)

    def __unicode__(self):
        return u"%s" % self.photo

    class Meta:
        verbose_name = "Фото проекта"
        verbose_name_plural = "Фото проектов"
        ordering = ['order', 'pk']


class PlanProject(models.Model):
    project = models.ForeignKey("Project", verbose_name=u"проект")
    photo = ImageField(u"фото", upload_to="planproject/")
    alt = models.CharField(u"Alt", max_length=255, blank=True, default="")

    def __unicode__(self):
        return u"%s" % self.photo

    class Meta:
        verbose_name = u"Планировка проекта"
        verbose_name_plural = u"Планы проектов"
        ordering = ['photo']


class ProjectSitemap(Sitemap):
    changefreq = "always"

    def items(self):
        return Project.objects.filter(is_index=True)


class ArticleTag(models.Model):
    tag = models.ForeignKey(Tag, verbose_name="тег", blank=True, null=True,
                            help_text="Если не выбрать тег, то статья появится в проектах")
    title = models.CharField(u"Title", max_length=255)
    h1 = models.CharField('h1', max_length=255)
    name = models.CharField('Наименование', max_length=255)
    img = ImageField(u"Картинка", upload_to="articles/", blank=True, null=True)
    text = HTMLField(u"Текст")
    keyword = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)
    order = models.IntegerField("Сортировка", default=0)
    is_index = models.BooleanField(u"Индексировать?", default=True)
    module = "interior.views"
    view = "view_article"

    class Meta:
        ordering = ('order',)
        verbose_name_plural = u"Статьи"
        verbose_name = u"Статья"

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        if self.url:
            if self.tag:
                return "/stroitelstvo-domov/%s/%s/" % (self.tag.url, self.url)
            else:
                return "/stroitelstvo-domov/%s/" % self.url
        else:
            return "/articles/%s/" % self.pk


class ArticleSitemap(Sitemap):
    changefreq = "always"

    def items(self):
        return ArticleTag.objects.filter(is_index=True)


def add_url(sender, instance, created, **kwargs):
    url = Url_Site.objects.filter(content_id=instance.pk, content_type=ContentType.objects.get_for_model(instance))
    if not url:
        url = Url_Site.objects.create(url=instance.get_absolute_url(), content_object=instance)
    else:
        url = url[0]
        url.url = instance.get_absolute_url()
    if not url.url:
        url.delete()
    else:
        url.save()

for model in (Project, Tag, ArticleTag):
    post_save.connect(add_url, sender=model)


def del_url(sender, instance, **kwargs):
    url = Url_Site.objects.filter(content_id=instance.pk, content_type=ContentType.objects.get_for_model(instance))
    if url:
        url.delete()

for model in (Project, Tag, ArticleTag):
    post_delete.connect(del_url, sender=model)
