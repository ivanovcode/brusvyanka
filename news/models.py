# -*- coding: utf-8 -*-
from django.db import models
from django.utils import timezone
from sorl.thumbnail import ImageField
from django.contrib.sitemaps import Sitemap


class News(models.Model):
    title = models.CharField(u"Заголовок", max_length=255)
    date = models.DateTimeField(u"Дата публикации", default=timezone.now)
    img = ImageField(u"Картинка", upload_to="news/", blank=True, null=True)
    anons = models.TextField(u"Анонс")
    text = models.TextField(u"Текст")
    is_draft = models.BooleanField(u"Черновик?", default=False)
    index_option = models.BooleanField("Индексировать страницу?", default=True)

    class Meta:
        ordering = ['-date']
        get_latest_by = 'date'
        verbose_name_plural = u"Новости"
        verbose_name = u"Новость"

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        return "/news/%s" % self.pk


class Photonews(models.Model):
    title = models.CharField(u"Заголовок для фото",max_length=255, blank=True, null=True)
    img = ImageField(u"Картинка", upload_to="photonews/")
    news = models.ForeignKey('News', verbose_name=u'Новость')
    order = models.IntegerField(u"сортировка", default=0)

    class Meta:
        verbose_name_plural = u"Фотки для новостей"
        verbose_name = u"Фото для новости"
        ordering = ['order']

    def __unicode__(self):
        return self.title


class Articles(models.Model):
    title = models.CharField(u"Title", max_length=255)
    h1 = models.CharField('h1', max_length=255)
    name = models.CharField('Наименование', max_length=255)
    date = models.DateTimeField(u"Дата публикации", default=timezone.now)
    img = ImageField(u"Картинка", upload_to="articles/", blank=True, null=True)
    anons = models.TextField(u"Анонс")
    text = models.TextField(u"Текст")
    is_draft = models.BooleanField(u"Черновик?", default=False)
    index_option = models.BooleanField("Индексировать страницу?", default=True)
    keyword = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)
    module = "news.views"
    view = "show_articles_url"

    class Meta:
        ordering = ['-date']
        get_latest_by = 'date'
        verbose_name_plural = u"Публикации"
        verbose_name = u"Публикация"

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        if self.url:
            return "/%s/" % self.url
        else:
            return "/articles%s/" % self.pk


class Photoarticles(models.Model):
    title = models.CharField(u"Заголовок для фото", max_length=255, blank=True, null=True)
    img = ImageField(u"Картинка", upload_to="photoarticles/")
    news = models.ForeignKey('Articles', verbose_name=u'Публикация')
    order = models.IntegerField(u"сортировка", default=0)

    class Meta:
        verbose_name_plural = u"Фотки для публикаций"
        verbose_name = u"Фото для публикации"
        ordering = ['order']

    def __unicode__(self):
        return self.title


class NewsSitemap(Sitemap):
    changefreq = "always"

    def items(self):
        return News.objects.all()


class ArticlesSitemap(Sitemap):
    changefreq = "always"

    def items(self):
        return Articles.objects.all()
