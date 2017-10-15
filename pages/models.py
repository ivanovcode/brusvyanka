# -*- coding: utf-8 -*-
from django.db import models
from sorl.thumbnail import ImageField
from django.contrib.sitemaps import Sitemap
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import fields
from tinymce.models import HTMLField

url_pages = ['/', 'prices', 'about', 'services', 'kontakty', 'kontakty-sankt-peterburg', 'kontakty-saratov', 'proekty-domov']


class Page(models.Model):
    title = models.CharField('Title', max_length=255)
    h1 = models.CharField('h1', max_length=255)
    name = models.CharField('Наименование', max_length=255)
    body = HTMLField('Текст')
    footer_body = models.TextField(blank=True)
    url = models.CharField(max_length=255)
    keyword = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    index_option = models.BooleanField("Индексировать страницу?", default=True)
    is_draft = models.BooleanField("Черновик?", default=False)
    template = models.CharField('Шаблон', max_length=255, blank=True, default='page.html')
    module = "pages.views"
    view = "view_page"

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"

    def get_absolute_url(self):
        if self.url == "/":
            return "/"
        else:
            return "/%s/" % self.url


class RegularPageSitemap(Sitemap):
    changefreq = "always"

    def items(self):
        return Page.objects.filter(is_draft=False, index_option=True)


class Banner(models.Model):
    Position_Choices = (
        ('love', u'То что мы любим'),
        ('left', u'Слева'),
        ('right', u'Справа'),
    )
    position = models.CharField(u'Положение', choices=Position_Choices, max_length=10, default='love')
    title = models.CharField(u'Название баннера', max_length=255)
    title2 = models.CharField(u'Название, вторая строка', max_length=255, default="", blank=True)
    img = ImageField(u"Картинка", upload_to="images_a/", blank=True, null=True, help_text=u'Высота 266px, ширина 380px')
    flash = models.FileField(u"флешка", upload_to="flash_a/", blank=True, null=True)
    flash_width = models.IntegerField(u"ширина флешки", default=242)
    flash_height = models.IntegerField(u"высота флешки", default=242)
    url = models.CharField("URL", max_length=255)
    sort = models.IntegerField(u'Сортировка', default=0)

    def __unicode__(self):
        if self.title2:
            return self.title2
        else:
            return self.title

    class Meta:
        verbose_name = u'То что мы любим/баннер'
        verbose_name_plural = u'То что мы любим/баннеры'
        ordering = ['sort']


class Logo(models.Model):
    title = models.CharField('Название лого', max_length=255, blank=True, null=True)
    img = ImageField(u"Картинка", upload_to="logos/")
    sort = models.IntegerField("Сортировка", default=0)

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = "Лого"
        verbose_name_plural = "Лого"
        ordering = ['sort']


def random_digit_challenge():
    import random
    ret = u''
    for i in range(4):
        ret += str(random.randint(0, 9))
    return ret, ret


class Url_Site(models.Model):
    url = models.CharField(max_length=255, db_index=True)
    content_type = models.ForeignKey(ContentType, null=True)
    content_id = models.PositiveIntegerField(null=True)
    content_object = fields.GenericForeignKey("content_type", "content_id")

    def __unicode__(self):
        return self.url

    class Meta:
        verbose_name = "URL"
        verbose_name_plural = "URL"


class ChunkLanding(models.Model):
    page = models.ForeignKey(Page, verbose_name=u'Страница')
    h2 = models.CharField(u'Заголовок', max_length=255, blank=True)
    body = HTMLField(u'Текст')
    key = models.CharField(u'Ключ', max_length=255, unique=True)

    def __unicode__(self):
        return '%s %s' % (self.h2, self.key)

    class Meta:
        verbose_name = u'Островок текста'
        verbose_name_plural = u'Островки текста'
        ordering = ('key',)


class ParralaxImage(models.Model):
    page = models.ForeignKey(Page, verbose_name=u'Страница')
    img = ImageField(u'Картинка', upload_to='images_p/')
    key = models.CharField(u'Ключ', max_length=255, unique=True)

    def __unicode__(self):
        return '%s' % self.key

    class Meta:
        verbose_name = u'Параллакс'
        verbose_name_plural = u'Параллакс'
        ordering = ('key',)


class Slider(models.Model):
    page = models.ForeignKey(Page, verbose_name=u'Страница')
    img = ImageField(u'Картинка', upload_to='images_s/')
    title = models.CharField(max_length=255, blank=True, default='')
    alt = models.CharField(max_length=255, blank=True, default='')
    sort = models.IntegerField("Сортировка", default=200)

    def __unicode__(self):
        return '%s' % self.img

    class Meta:
        verbose_name = u'Слайдер'
        verbose_name_plural = u'Слайдер'
        ordering = ('sort',)


class Staff(models.Model):
    page = models.ManyToManyField(Page, verbose_name=u'Страница', default=(1,))
    name = models.CharField(u'ФИО', max_length=255)
    position = models.CharField(u'Должность', max_length=255)
    descr = models.TextField(u'Описание', blank=True)
    photo = ImageField(u'Фото', upload_to='images_staff/')
    sort = models.IntegerField("Сортировка", default=200)

    def __unicode__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = u'Работник'
        verbose_name_plural = u'Персонал'
        ordering = ('sort',)


class Feedback(models.Model):
    img = ImageField(u'Картинка', upload_to='images_feedback/')
    video_url = models.CharField(u'Имя', max_length=255)
    title = models.TextField(u'Текст', blank=True)
    date = models.DateTimeField(u'Дата', blank=True)
    sort = models.IntegerField("Сортировка", default=200)

    def iframe_hash(self):
        trail = ''
        if '=' in self.video_url:
            trail = self.video_url.split('=')
        elif 'be/' in self.video_url:
            trail = self.video_url.split('be/')
        return trail[-1]

    def __unicode__(self):
        return '%s' % self.title

    class Meta:
        verbose_name = u'Отзыв'
        verbose_name_plural = u'Отзывы'
        ordering = ('-date',)


class Price(models.Model):
    page = models.ForeignKey(Page, verbose_name=u'Страница')
    name = models.CharField(u'Название', max_length=255)
    descr = models.TextField(u'Описание', blank=True)
    price = models.IntegerField(u'Цена', default=0)
    sort = models.IntegerField(u'Сортировка', default=0)

    def __unicode__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = u'Цена'
        verbose_name_plural = u'Цены'
        ordering = ('sort',)


class Settings(models.Model):
    KEY_CHOICES = (
        ('flash1', u'Флешка для проектирования домов'),
        ('flash2', u'Флешка для интерьеров'),
        ('50px', u'Параллакс 50px'),
        ('-50px', u'Параллакс -50px'),
        ('11.2653px', u'Параллакс 11.2653px'),
    )
    descr = models.CharField(u'Описание', max_length=255, blank=True)
    key = models.CharField(u'Ключ', max_length=20, choices=KEY_CHOICES)
    value = models.CharField(u'Значение', max_length=255, blank=True)
    flash = models.FileField(u'Флешка', upload_to='flash_settings', blank=True)

    def __unicode__(self):
        return '%s' % self.key

    class Meta:
        verbose_name = u'Настройка'
        verbose_name_plural = u'Настройки'
        ordering = ('key',)
