# coding: utf-8
from django import template
import re
from pages.models import (
    Banner,
    ChunkLanding,
    ParralaxImage,
    Feedback,
    Staff,
    Settings,
    Page
)
from django.conf import settings
from projects.models import ArticleTag, Project
from buildhouse.models import ArticleTag as BArticleTag, Project as BProject
from interior.models import Project as IProject
from django.utils.safestring import mark_safe
register = template.Library()
link_pattern = re.compile(r'/(.*?)/')


@register.inclusion_tag('inc_banner_list.html')
def show_banner_list():
    try:
        banner_list = Banner.objects.filter(position='right')
    except:
        msg = 'Roottype not found '
        raise template.TemplateSyntaxError(msg)
    return {'banner_list': banner_list, 'media_url': settings.MEDIA_URL}


@register.simple_tag
def bold_banner(title):
    title = title.replace(u"Проекты домов", u"Проекты домов <strong>")
    title += "</strong>"
    return title


@register.simple_tag
def remove_project(title):
    title = title.replace(u"Проекты домов", u"")
    return title


@register.simple_tag
def remove_bproject(title):
    title = title.replace(u"Строительство", u"")
    return title


@register.inclusion_tag('inc_articles_list_index.html')
def show_banner_list_left():
    try:
        banner_list = Banner.objects.filter(position='left')
    except:
        msg = 'Roottype not found '
        raise template.TemplateSyntaxError(msg)
    return {'banner_list': banner_list, 'media_url': settings.MEDIA_URL}


@register.inclusion_tag('inc_articles_tag.html')
def show_article_tag(tag_id, article_id=None):
    article_list = ArticleTag.objects.filter(tag__url=tag_id)
    if article_id:
        article_list = article_list.exclude(id=int(article_id))
    banner_list = Banner.objects.filter(position='left')
    return {'article_list': article_list, 'media_url': settings.MEDIA_URL, 'banner_list': banner_list, }


@register.inclusion_tag('inc_articles_tag.html')
def show_article_tag_build(tag_id, article_id=None):
    article_list = BArticleTag.objects.filter(tag__url=tag_id)
    if article_id:
        article_list = article_list.exclude(id=int(article_id))
    banner_list = Banner.objects.filter(position='left')
    return {'article_list': article_list, 'media_url': settings.MEDIA_URL, 'banner_list': banner_list, }


@register.inclusion_tag('inc_articles_tag.html')
def show_articles(article_id=None):
    article_list = ArticleTag.objects.filter(tag__isnull=True)
    if article_id:
        article_list = article_list.exclude(id=int(article_id))
    banner_list = Banner.objects.filter(position='left')
    return {'article_list': article_list, 'media_url': settings.MEDIA_URL, 'banner_list': banner_list, }


@register.inclusion_tag('inc_articles_tag.html')
def show_articles_build(article_id=None):
    article_list = BArticleTag.objects.filter(tag__isnull=True)
    if article_id:
        article_list = article_list.exclude(id=int(article_id))
    banner_list = Banner.objects.filter(position='left')
    return {'article_list': article_list, 'media_url': settings.MEDIA_URL, 'banner_list': banner_list, }


@register.simple_tag
def slider_projects():
    projects = Project.objects.filter(visible_index=True).order_by('order')
    return projects


@register.simple_tag
def slider_builds():
    projects = BProject.objects.order_by('order')[:10]
    return projects


@register.simple_tag
def slider_interiors():
    projects = IProject.objects.filter(is_index=True).order_by('order')
    return projects


@register.simple_tag
def get_chunk_h2(key):
    try:
        chunk = ChunkLanding.objects.get(key=key)
        return chunk.h2
    except ChunkLanding.DoesNotExist:
        return ''


@register.simple_tag
def get_chunk_body(key):
    try:
        chunk = ChunkLanding.objects.get(key=key)
        return chunk.body
    except ChunkLanding.DoesNotExist:
        return ''


@register.simple_tag
def get_parralax(key):
    try:
        chunk = ParralaxImage.objects.get(key=key)
        return chunk.img.url
    except ParralaxImage.DoesNotExist:
        return None


@register.simple_tag
def get_settings(key, value):
    try:
        chunk = Settings.objects.get(key=key)
        return chunk.value if chunk.value else value
    except Settings.DoesNotExist:
        return value


@register.simple_tag
def get_flash(key, value):
    try:
        chunk = Settings.objects.get(key=key)
        return chunk.flash.url if chunk.flash else value
    except Settings.DoesNotExist:
        return value


@register.simple_tag
def love_banners():
    banner_list = Banner.objects.filter(position='love')
    return banner_list


@register.simple_tag
def feedback_list(l=4):
    if l:
        feedbacks = Feedback.objects.all()[:int(l)]
    else:
        feedbacks = Feedback.objects.all()
    return feedbacks


@register.simple_tag
def staff_list(page_id):
    try:
        staffs = Staff.objects.filter(page__id=int(page_id))
    except:
        return
    return staffs


@register.simple_tag
def class_active(current, urls):
    if current in urls:
        return mark_safe('class="active"')


@register.simple_tag
def href_active(current, url, t='1'):
    if t == '2':
        url = '/%s/' % url
    res = link_pattern.search(url)
    if res:
        url_ = res.group(1)
        if not current == url_:
            return mark_safe('href="{}"'.format(url, url_))
    return ''


@register.simple_tag
def o_nas_list():
    try:
        pages = Page.objects.filter(url__contains='o-nas/').exclude(url__contains='novosti')
    except:
        return []
    return pages


@register.simple_tag
def get_articles():
    articles = Page.objects.filter(url__contains='stati/')
    return articles
