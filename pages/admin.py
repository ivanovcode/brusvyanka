# -*- coding: utf-8 -*-
from pages.models import (
    Page,
    Banner,
    Url_Site,
    ChunkLanding,
    ParralaxImage,
    Slider,
    Feedback,
    Staff,
    Price,
    Settings,
)
from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin
from sorl.thumbnail import get_thumbnail
from django.conf import settings
from django.utils.safestring import mark_safe
import logging
logger = logging.getLogger(__name__)


class ChunkInline(admin.TabularInline):
    model = ChunkLanding


class PriceInline(admin.TabularInline):
    model = Price


class ParralaxInline(admin.TabularInline):
    model = ParralaxImage
    fields = ('preview_url', 'img', 'page', 'key',)
    readonly_fields = ('preview_url',)

    def preview_url(self, obj):
        image_path = "%s" % obj.img.file
        t = get_thumbnail(image_path, '120x120')
        return mark_safe(u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t))

    preview_url.short_description = 'Фото'


class SliderInline(admin.TabularInline):
    model = Slider
    fields = ('preview_url', 'img', 'page', 'sort')
    readonly_fields = ('preview_url',)

    def preview_url(self, obj):
        image_path = "%s" % obj.img.file
        t = get_thumbnail(image_path, '120x120')
        return mark_safe(u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t))

    preview_url.short_description = 'Фото'


@admin.register(Staff)
class StaffOptions(AdminImageMixin, admin.ModelAdmin):
    list_display = ('preview_image_url', '__unicode__', 'sort')
    list_display_links = ('__unicode__', 'preview_image_url')
    list_editable = ('sort',)

    def preview_image_url(self, obj):
        try:
            if obj.photo:
                image_path = "%s" % obj.photo.file
                t = get_thumbnail(image_path, '120x120')
                return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)
            else:
                return "Нету изображения"
        except:
                return "Нету изображения"

    preview_image_url.short_description = 'Превью'
    preview_image_url.allow_tags = True

    class Media:
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list_b.js')


@admin.register(Page)
class PageOptions(AdminImageMixin, admin.ModelAdmin):
    list_display = ('name', 'title', 'url')
    inlines = [ParralaxInline, SliderInline, ChunkInline, PriceInline]
    extra = 1

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for obj in instances:
            try:
                if obj.img:
                    obj.save()
            except:
                pass
            try:
                if obj.key:
                    obj.save()
            except:
                pass
            try:
                if  obj.name:
                    obj.save()
            except:
                pass

    class Media:
        css = {'all': ('/static/css/admin.css',)}
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list_inline_s.js', '/static/js/admin.js', )


@admin.register(Banner)
class Options(AdminImageMixin, admin.ModelAdmin):
    list_display = ('preview_image_url', '__unicode__', 'sort')
    list_display_links = ('__unicode__', 'preview_image_url')
    list_editable = ('sort',)
    list_filter = ('position',)

    def preview_image_url(self, obj):
        try:
            if obj.img:
                image_path = "%s" % obj.img.file
                t = get_thumbnail(image_path, '120x120')
                return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)
            else:
                return "Нету изображения"
        except:
                return "Нету изображения"

    preview_image_url.short_description = 'Превью'
    preview_image_url.allow_tags = True

    class Media:
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list_b.js')


@admin.register(Url_Site, Feedback, Settings, ParralaxImage)
class StubAdmin(AdminImageMixin, admin.ModelAdmin):
    pass
