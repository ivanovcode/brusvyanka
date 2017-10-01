# -*- coding: utf-8 -*-
from projects.models import Project
from projects.models import Tag, TagProject, ArticleTag
from projects.models import PhotoProject, PlanProject
from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin
from sorl.thumbnail import get_thumbnail
from django.conf import settings
from django.utils.safestring import mark_safe


class PlanInline(AdminImageMixin, admin.TabularInline):
    model = PlanProject


class ArticleTagInline(AdminImageMixin, admin.TabularInline):
    model = ArticleTag
    fields = ('preview_image_url', 'title', 'name', 'h1', 'order', 'edit_link')
    readonly_fields = ('preview_image_url', 'edit_link')
    extra = 0
    # show_change_link = True

    def preview_image_url(self, obj):
        try:
            if not obj.img:
                return ""
            image_path = "%s" % obj.img.file
            t = get_thumbnail(image_path, '120x120')
            return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)
        except:
            return "Нету изображения"

    preview_image_url.short_description = 'Фото'
    preview_image_url.allow_tags = True

    def edit_link(self, obj):
        return mark_safe(u'<a href="/admin/projects/articletag/%s/" target="_blank">Редактировать</a>' % obj.pk)

    edit_link.short_description = 'Ссылка'


class PhotoInline(AdminImageMixin, admin.TabularInline):
    model = PhotoProject
    template = "admin/projects/edit_inline/tabular.html"


class ProjectInline(admin.TabularInline):
    model = TagProject
    fields = ('preview_url', 'project', 'tag', 'order')
    readonly_fields = ('preview_url',)
    extra = 0

    def preview_url(self, obj):
        if not obj.project.mainphoto.file:
            return ""
        image_path = "%s" % obj.project.mainphoto.file
        t = get_thumbnail(image_path, '120x120')
        return mark_safe(u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t))

    preview_url.short_description = 'Фото'


@admin.register(Tag)
class TagOptions(AdminImageMixin, admin.ModelAdmin):
    inlines = [ProjectInline, ArticleTagInline]
    list_display = ('preview_image_url', 'name', 'sort')
    list_editable = ('sort',)

    def preview_image_url(self, obj):
        try:
            if not obj.img:
                return ""
            image_path = "%s" % obj.img.file
            t = get_thumbnail(image_path, '120x120')
            return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)
        except:
            return "Нету изображения"

    preview_image_url.short_description = 'Фото'
    preview_image_url.allow_tags = True

    # def get_queryset(self, request):
    #     qs = super(TagOptions, self).get_queryset(request)
    #     return qs.filter(tag_root__isnull=True)


    class Media:
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list_b.js', '/static/js/sortable_list_inline_a.js', '/static/js/sortable_list_inline_t.js', '/static/js/admin.js')
        css = {'all': ('/static/css/admin.css',)}


class TypeOptions(admin.ModelAdmin):
    list_display = ('name', 'sort')
    list_editable = ('sort',)
    # inlines = [ProjectInline]

    class Media:
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list_b.js')


class TagInline(admin.TabularInline):
    model = Project.tags.through


@admin.register(Project)
class ProjectOptions(AdminImageMixin, admin.ModelAdmin):
    list_display = ('preview_image_url', 'name', 'sq', 'order', 'visible_index', 'url')
    list_editable = ("sq", 'order', 'visible_index', 'url')
    inlines = [PhotoInline, PlanInline, TagInline]
    list_per_page = 1000

    def preview_image_url(self, obj):
        if not obj.mainphoto:
            return ''
        image_path = "%s" % obj.mainphoto.file
        t = get_thumbnail(image_path, '120x120')
        return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)

    preview_image_url.short_description = 'Фото'
    preview_image_url.allow_tags = True

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for obj in instances:
            try:
                if obj.text.replace("<p>", "").replace("</p>", "").strip() or obj.photo:
                    obj.save()
            except:
                pass

            try:
                if obj.tag:
                    obj.save()
            except:
                pass

    class Media:
        js = ('https://yandex.st/jquery/1.4.4/jquery.min.js', 'https://yandex.st/jquery-ui/1.8.11/jquery-ui.min.js',
              '/static/js/sortable_list.js', '/static/js/sortable_list_inline_n.js', '/static/js/admin.js')
        css = {'all': ('/static/css/admin.css?2',)}
        # '/static/js/sortable_list_inline.js'


@admin.register(ArticleTag)
class ArticleOptions(AdminImageMixin, admin.ModelAdmin):
    list_display = ('preview_image_url', 'title', 'name', 'h1', 'order')
    list_editable = ('order',)

    def preview_image_url(self, obj):
        try:
            if not obj.img:
                return ""
            image_path = "%s" % obj.img.file
            t = get_thumbnail(image_path, '120x120')
            return u'<img src="%s%s" alt=""/>' % (settings.MEDIA_URL, t)
        except:
            return "Нету изображения"

    preview_image_url.short_description = 'Фото'
    preview_image_url.allow_tags = True

    class Media:
        css = {'all': ('/static/css/admin.css',)}
        js = ('/static/js/admin.js?1', )
