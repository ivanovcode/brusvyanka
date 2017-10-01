from django.conf.urls import include, url
from django.contrib import admin
from pages.models import RegularPageSitemap
from projects.models import ProjectSitemap, TagsSitemap, ArticleSitemap
from interior.models import ProjectSitemap as InteriorSitemap
from buildhouse.models import BProjectSitemap, BTagsSitemap, ArticleSitemap as BArticleSitemap
from django.contrib.sitemaps.views import sitemap
import pages.views
import projects.views
import buildhouse.views
import interior.views
from django.conf import settings
import rollbar


rollbar.init(**settings.ROLLBAR)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^g/', include('googleauth.urls', namespace='google-auth')),
    url(r'^$', pages.views.view_page),
]

urlpatterns += [
    url(r'^proekty-domov/$', projects.views.view_projects, name='projects'),
    url(r'^stroitelstvo-domov/$', buildhouse.views.view_projects, name='builds'),
    url(r'^rekonstrukciya-domov/$', interior.views.view_projects, name='interior'),
    url(r'^likes/$', pages.views.get_likes, name='likes'),
]


sitemaps = {
    'pages': RegularPageSitemap,
    'projects': ProjectSitemap,
    'bprojects': BProjectSitemap,
    'interiors': InteriorSitemap,
    'tag_projects': TagsSitemap,
    'tag_builds': BTagsSitemap,
    'article_projects': ArticleSitemap,
    'article_builds': BArticleSitemap,
}


urlpatterns += [
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}),
    url(r'^tinymce/', include('tinymce.urls')),
    url(r'^recall$', pages.views.free_recall),
    url(r'^order$', pages.views.do_order),
    url(r'^search$', pages.views.search),
    url(r'^sitemap/$', pages.views.view_sitemap_page),
]


urlpatterns += [
    # url(r'', include('pages.urls_stub', namespace='stub')),
    url(r'^proekty-domov/(\d+)/$', projects.views.view_project),
    url(r'^stroitelstvo-domov/(\d+)/$', buildhouse.views.view_project),
    url(r'^rekonstrukciya-domov/(\d+)/$', interior.views.view_project),
    url(r'^([\w\d_\/-]+)/$', pages.views.view_url),
    url(r'^proekty-domov/([\w\d_-]+)/$', projects.views.view_tag, name='tag_project'),
    url(r'^stroitelstvo-domov/([\w\d_-]+)/$', buildhouse.views.view_tag, name='tag_builds'),
    url(r'^rekonstrukciya-domov/([\w\d_-]+)/$', interior.views.view_tag, name='tag_interior'),
]

handler404 = 'pages.views.view_404_page'
