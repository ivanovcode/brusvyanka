# coding: utf-8
from django.shortcuts import render, redirect
from projects.models import (
    Project,
    Tag,
    ArticleTag,
)
from buildhouse.models import (
    Project as Bproject,
    Tag as BTag,
)
from interior.models import (
    Project as Iproject,
    Tag as ITag,
)
from django.shortcuts import get_object_or_404
import importlib
from pages.models import (
    Url_Site,
    Page,
    ChunkLanding,
    url_pages,
    ParralaxImage,
    Slider,
    Price
)
from pages.forms import (
    OrderForm,
    RecallForm,
)
from django.http import (
    Http404,
    JsonResponse,
)
from urllib2 import urlopen, URLError, quote, unquote
from django.core.mail import send_mail
import requests
import rollbar
from django.conf import settings


def view_page(request, url="/"):
    try:
        page = Page.objects.get(url=url, is_draft=False)
    except:
        rollbar.report_message('no page found', 'warning')
        raise Http404
    response = {'page': page}
    chunks = ChunkLanding.objects.filter(page=page)
    response['chunks'] = {chunk.key: chunk for chunk in chunks}
    parralaxs = ParralaxImage.objects.filter(page=page)
    response['parralaxs'] = {parralax.key: parralax for parralax in parralaxs}
    sliders = Slider.objects.filter(page=page)
    response['sliders'] = sliders
    prices = Price.objects.filter(page=page)
    response['prices'] = prices
    if not url == 'services':
        if 'services/' in request.path and url in url_pages:
            raise Http404
        if 'services/' in request.path:
            response['service'] = 1
    if url == '/':
        projects = Project.objects.filter(visible_index=True).order_by('order')
        response['projects'] = projects
    if 'kontakty' in url:
        response['page_contacts'] = 1
    template = page.template
    return render(request, template, response)


def get_likes(request):
    url = request.POST.get('url', 'http://www.ilyaeliseev.ru')
    result = requests.get('http://vk.com/share.php?act=count&url=%s' % url)
    try:
        vk_count = result.content.split(',')[-1].split(')')[0]
        vk_count = int(vk_count)
    except:
        vk_count = 0
    result = requests.get('https://api.facebook.com/method/links.getStats?urls=%s&format=json' % url)
    try:
        fb_count = int(result.json()[0]['share_count'])
    except:
        fb_count = 0
    result = requests.get('http://ok.ru/dk?st.cmd=extOneClickLike&uid=odklocs0&ref=%s' % url)
    try:
        ok_count = result.content.split(',')[-1].split(')')[0]
        ok_count = int(ok_count)
    except:
        ok_count = 0
    return JsonResponse({'ok': True, 'result': {'vk': vk_count, 'ok': ok_count, 'fb': fb_count}})


redirect_urls = [
    ('proekty-domov-iz-gazobetona', '/proekty-domov/iz-gazobetona/'),
    ('proekty-domov-v-sovremennom-stile', '/proekty-domov/v-sovremennom-stile/'),
    ('proekty-domov-iz-kleenogo-brusa', '/proekty-domov/iz-kleenogo-brusa/'),
    ('proekty-domov-s-ploskoy-kryshey', '/proekty-domov/s-ploskoy-kryshey/'),
    ('proekty_odnoetazhnih_domov', '/proekty-domov/odnoetazhnie/'),
    ('proekty_domov_v_stile_minimalizm', '/proekty-domov/v-stile-minimalizm/'),
    ('proekty-monolitnyh-domov', '/proekty-domov/monolitnie/'),
    ('proekty-domov-iz-kirpicha', '/proekty-domov/iz-kirpicha/'),
    ('proekty-domov-iz-penoblokov', '/proekty-domov/iz-penoblokov/'),
    ('proekty-krasivyh-domov', '/proekty-domov/krasivie/'),
    ('proekty-domov-iz-brusa', '/proekty-domov/iz-brusa/'),
    ('proekty-domov-iz-blokov', '/proekty-domov/iz-blokov/'),
    ('proekty-karkasnyh-domov', '/proekty-domov/karkasnie/'),
    ('proekty-derevyannyh-domov', '/proekty-domov/derevyannie/'),

    ('stroitelstvo-domov-iz-gazobetona', '/stroitelstvo-domov/iz-gazobetona/'),
    ('stroitelstvo-domov-iz-kleenogo-brusa', '/stroitelstvo-domov/iz-kleenogo-brusa/'),
    ('stroitelstvo-domov-iz-blokov', '/stroitelstvo-domov/iz-blokov/'),
    ('stroitelstvo-derevyannyh-domov', '/stroitelstvo-domov/derevyannie/'),
    ('stroitelstvo-domov-v-sovremennom-stile', '/stroitelstvo-domov/v-sovremennom-stile/'),
    ('stroitelstvo-domov-iz-penoblokov', '/stroitelstvo-domov/iz-penoblokov/'),
    ('stroitelstvo-domov-v-stile-minimalizm', '/stroitelstvo-domov/v-stile-minimalizm/'),
    ('stroitelstvo-odnoetajnyh-domov', '/stroitelstvo-domov/odnoetazhnie/'),
    ('stroitelstvo-domov-iz-brusa', '/stroitelstvo-domov/iz-brusa/'),
    ('stroitelstvo-domov-iz-keramicheskih-blokov', '/stroitelstvo-domov/iz-keramicheskih-blokov/'),
    ('stroitelstvo-dvuhetazhnyh-domov', '/stroitelstvo-domov/dvuhetazhnie/'),
    ('stroitelstvo-elitnyh-domov', '/stroitelstvo-domov/elitnie/'),
    ('stroitelstvo-domov-v-stile-shale', '/stroitelstvo-domov/v-stile-shale/'),
    ('stroitelstvo-dorogih-domov', '/stroitelstvo-domov/dorogie/'),
    ('stroitelstvo-zagorodnyh-domov', '/stroitelstvo-domov/zagorodnie/'),
    ('stroitelstvo-fundamenta', '/stroitelstvo-domov/fundament/'),
    ('stroitelstvo-domov-v-amerikanskom-stile', '/stroitelstvo-domov/v-amerikanskom-stile/'),
    ('monolitnie', '/proekty-domov/monolitnie/'),
]

try:
    for project in Project.objects.all():
        if project.url:
            redirect_urls.append(("%s" % project.url, project.get_absolute_url()))
        else:
            redirect_urls.append(("project%s" % project.pk, project.get_absolute_url()))

    for project in Bproject.objects.all():
        if project.url:
            redirect_urls.append(("%s" % project.url, project.get_absolute_url()))
        else:
            redirect_urls.append(("bproject%s" % project.pk, project.get_absolute_url()))
except:
    pass


def view_url(request, url):
    urls = dict(redirect_urls)
    if url in urls:
        return redirect(urls[url], permanent=True)
    url_site = get_object_or_404(Url_Site, url="/%s/" % url)
    m = importlib.import_module(url_site.content_object.module)
    view = getattr(m, url_site.content_object.view)
    if 'page' in url_site.content_object.view:
        ret = view(request, url)
    else:
        ret = view(request, url.split('/')[-1])
    return ret


def free_recall(request):
    response = {'ok': True, 'result': ""}
    if request.method == "POST":
        form = RecallForm(request.POST)
        if form.is_valid():
            text = form.body_serialize(request)
            if not settings.DEBUG:
                form.send_email(text)   
                #form.send_sms(text) 
            response['result'] = u"Мы с вами свяжемся!"
            response['ok'] = True
        else:
            response['result'] = u"Заявка не отправлена, заполните все необходимые поля!"
            response['ok'] = False
        return JsonResponse(response)
    else:
        rollbar.report_message('no POST method', 'warning')
        raise Http404


def do_order(request):
    response = {'ok': True, 'result': ''}
    if request.method == "POST":
        form = OrderForm(request.POST)
        if form.is_valid():
            text = form.body_serialize(request)
            if not settings.DEBUG:
                form.send_email(text)  
                #form.send_sms(text)    
            response['result'] = u"Мы с вами свяжемся!"
            response['ok'] = True
        else:
            response['result'] = u"Заявка не отправлена, заполните все необходимые поля!"
            response['ok'] = False
        return JsonResponse(response)
    else:
        rollbar.report_message('no POST data', 'warning')
        raise Http404


def view_404_page(request, url="/", template="404.html"):
    page = {"url": "/", "get_absolute_url": "/", "404": True}
    response = {"page": page, "url": request.build_absolute_uri()}
    projects = Project.objects.filter(visible_index=True).order_by('order')
    response['projects'] = projects
    return render(request, template, response, status=404)


def search(request):
    if request.method == "POST":
        art = request.POST.get("art", "")
        if "10-" in art:
            p = Bproject.objects.filter(articul=art)
            if p.exists():
                return redirect(p[0].get_absolute_url())
        elif "03-" in art:
            p = IProject.objects.filter(articul=art)
            if p.exists():
                return redirect(p[0].get_absolute_url())
        else:
            p = Project.objects.filter(articul=art)
            if p.exists():
                return redirect(p[0].get_absolute_url())
        return redirect('/search?searchid=2248054&text=%s' % art)
    return render(request, "search.html")


def view_sitemap_page(request):
    pages = Page.objects.filter(is_draft=False, index_option=True)
    projects = Project.objects.all()
    tags = Tag.objects.all()
    build_tags = BTag.objects.all()
    buildings = Bproject.objects.all()
    interior_tags = ITag.objects.all()
    interiors = Iproject.objects.all()
    articles = ArticleTag.objects.filter(tag__isnull=True)
    response = {"projects": projects,
                "buildings": buildings,
                "pages": pages, "tags": tags,
                "interiors": interiors,
                "interior_tags": interior_tags,
                "articles": articles,
    }
    response['page'] = {"url": 'sitemap'}
    response['build_tags'] = build_tags
    return render(request, "sitemap.html", response)


def stub(request, templ2016):
    context = {}
    projects = Project.objects.filter(visible_index=True).order_by('order')
    context['projects'] = projects
    return render(request, "2016/%s" % templ2016, context)
