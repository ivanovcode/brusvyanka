from django.conf.urls import url
from views import stub


urlpatterns = [
    url(r'why-we/$', stub, {'templ2016': 'why-we.html'}, name='why-we'),
    url(r'architectural-design/$', stub, {'templ2016': 'architectural-design.html'}, name='arh-design'),
]
