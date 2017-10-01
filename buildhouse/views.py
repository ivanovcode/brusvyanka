# -*- coding: utf-8 -*-
from django.shortcuts import (
    render,
    get_object_or_404,
)
from .models import Project, Tag, ArticleTag
from pages.models import Page
from django.http import Http404
from django.core.urlresolvers import reverse
import copy


def view_projects(request):
    projects = Project.objects.order_by("order")
    response = {'projects': projects, "page_builds": 1, "page": {"url": "builds"}, "articles": "YES"}
    try:
        url = reverse('builds')
        page = Page.objects.get(url=url.replace('/', ''))
    except:
        page = {}
    referer = request.META.get("HTTP_REFERER", "")
    if 'ilyaeliseev' in referer:
        response['articles'] = ""
        response['reasons'] = []
    tags = Tag.objects.all()
    response['tags'] = tags
    response['page'] = page
    if 'build_tag_id' in request.session:
        del request.session['build_tag_id']
    return render(request, "bprojects.html", response)


def view_tag(request, tag_id):
    tag = get_object_or_404(Tag, url=tag_id)
    projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')
    if not projects:
        raise Http404
    response = {'projects': projects, "articles": "YES"}
    referer = request.META.get("HTTP_REFERER", "")
    if 'ilyaeliseev' in referer:
        response['articles'] = ""
        response['reasons'] = []
    tags = Tag.objects.all()
    response['tags'] = tags
    response['tag_id'] = tag_id
    response['tag_cur'] = tag.name
    response['page'] = tag
    response['page'].index_option = tag.is_index
    response['page'].body = tag.descr
    response['page_builds'] = 1
    try:
        url = reverse('builds')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u'Строительство'
    request.session['build_tag_id'] = tag.pk
    return render(request, "bproject_tag.html", response)


def view_project(request, id):
    projects = Project.objects.order_by('order')[:4]
    try:
        project = Project.objects.get(id=int(id))
    except:
        raise Http404
    response = {'projects': projects, 'project': project}
    response['page'] = copy.copy(project)
    response['page_builds'] = 1
    if 'build_tag_id' in request.session:
        try:
            tag = Tag.objects.get(pk=int(request.session['build_tag_id']))
            projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')[:4]
        except:
            tag = None
    else:
        tag = None
    response['tag'] = tag
    response['projects'] = projects
    next_projects = Project.objects.filter(order__gt=project.order).order_by('order')
    prev_projects = Project.objects.filter(order__lt=project.order)
    if next_projects.exists():
        response['next_project'] = next_projects[0]
    if prev_projects.exists():
        response['prev_project'] = prev_projects[0]
    try:
        url = reverse('builds')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u'Строительство'
    return render(request, "bproject.html", response)


def view_project_url(request, url):
    projects = Project.objects.order_by('order')[:4]
    try:
        project = Project.objects.get(url=url)
    except:
        raise Http404
    if 'build_tag_id' in request.session:
        try:
            tag = Tag.objects.get(pk=int(request.session['build_tag_id']))
            projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')[:4]
        except:
            tag = None
    else:
        tag = None
    response = {'projects': projects, 'project': project}
    response['tag'] = tag
    response['page'] = copy.copy(project)
    response['page_builds'] = 1
    next_projects = Project.objects.filter(order__gt=project.order).order_by('order')
    prev_projects = Project.objects.filter(order__lt=project.order)
    if next_projects.exists():
        response['next_project'] = next_projects[0]
    if prev_projects.exists():
        response['prev_project'] = prev_projects[0]
    try:
        url = reverse('builds')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u'Строительство'
    return render(request, "bproject.html", response)


def view_article(request, url):
    try:
        article_id = int(url)
    except:
        article_id = 0
    if article_id:
        article = get_object_or_404(ArticleTag, pk=article_id)
    else:
        article = get_object_or_404(ArticleTag, url=url)
    response = {'article': article, "tag": article.tag, 'url_s': url}
    response['page'] = copy.copy(article)
    response['page_builds'] = 1
    tags = Tag.objects.all()
    response['tags'] = tags
    try:
        url = reverse('builds')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u"Строительство"
    return render(request, "barticle.html", response)
