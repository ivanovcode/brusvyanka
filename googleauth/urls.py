from django.conf.urls import url
import views


urlpatterns = [
    url(r'^$', views.login_view, name='login'),
    url(r'^callback', views.callback, name='callback'),
]
