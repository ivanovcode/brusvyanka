# -*- coding: utf-8 -*-
from django.shortcuts import (
    render,
    get_object_or_404,
    redirect,
)
from .models import (
    Project,
    Tag,
    ArticleTag
)
from pages.models import Page
from django.http import (
    Http404,
)
from django.core.urlresolvers import reverse
import copy


def view_projects(request):
    projects = Project.objects.order_by('order')
    try:
        url = reverse('projects')
        page = Page.objects.get(url=url.replace('/', ''))
    except:
        page = {}
    reasons = []
    response = {'projects': projects, "articles": "YES", "reasons": reasons}
    referer = request.META.get("HTTP_REFERER", "")
    if 'ilyaeliseev' in referer:
        response['articles'] = ""
    tags = Tag.objects.all()
    response['tags'] = tags
    response['page_projects'] = 1
    response['page'] = page
    if 'tag_id' in request.session:
        del request.session['tag_id']
    return render(request, "projects.html", response)


def view_tag(request, tag_id):
    tag = get_object_or_404(Tag, url=tag_id)
    projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')
    if not projects.exists():
        raise Http404
    reasons = []
    response = {'projects': projects, "articles": "YES", "reasons": reasons}
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
    response['page_projects'] = 1
    try:
        url = reverse('projects')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'] = u"Проекты"
    request.session['tag_id'] = tag.pk
    return render(request, "project_tag.html", response)


def view_project(request, id):
    projects = Project.objects.order_by('order')[:4]
    try:
        project = Project.objects.get(id=int(id))
    except:
        raise Http404
    if project.url:
        return redirect("/%s/" % project.url)
    if 'tag_id' in request.session:
        try:
            tag = Tag.objects.get(pk=int(request.session['tag_id']))
            projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')[:4]
        except:
            tag = None
    else:
        tag = None
    next_projects = Project.objects.filter(order__gt=project.order).order_by('order')
    prev_projects = Project.objects.filter(order__lt=project.order)
    if next_projects.exists():
        next_project = next_projects[0]
    if prev_projects.exists():
        prev_project = prev_projects[0]
    response = {'projects': projects, 'project': project, "tag": tag, "page_projects": 1, 'next_project': next_project, 'prev_project': prev_project}
    try:
        url = reverse('projects')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'] = u"Проекты"
    return render(request, "project.html", response)


def view_project_w(request, url):
    projects = Project.objects.order_by('order')[:4]
    try:
        project = Project.objects.get(url=url)
    except:
        raise Http404
    if 'tag_id' in request.session:
        try:
            tag = Tag.objects.get(pk=int(request.session['tag_id']))
            projects = Project.objects.filter(tags__in=[tag.pk]).order_by('tagproject__order')[:4]
        except:
            tag = None
    else:
        tag = None
    if tag and not project.tags.filter(pk=tag.pk):
        tag = None
    response = {'projects': projects, 'project': project, "hideOrderBtn": 1, "tag": tag}
    response['page'] = copy.copy(project)
    response['page_projects'] = 1
    next_projects = Project.objects.filter(order__gt=project.order).order_by('order')
    prev_projects = Project.objects.filter(order__lt=project.order)
    if next_projects.exists():
        response['next_project'] = next_projects[0]
    if prev_projects.exists():
        response['prev_project'] = prev_projects[0]
    try:
        url = reverse('projects')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u"Проекты"
    return render(request, "project.html", response)


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
    response['page_projects'] = 1
    tags = Tag.objects.all()
    response['tags'] = tags
    try:
        url = reverse('projects')
        page = Page.objects.get(url=url.replace('/', ''))
        response['page'].name = page.name
    except:
        response['page'].name = u"Проекты"
    return render(request, "article.html", response)
