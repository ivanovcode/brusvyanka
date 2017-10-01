# coding: utf-8
from requests_oauthlib import OAuth2Session
from django.conf import settings
import os
from django.shortcuts import (
    redirect,
    render,
)
from django.core.urlresolvers import reverse
from django.contrib.auth import login, get_user_model


TOKEN_URL = 'https://accounts.google.com/o/oauth2/token'
AUTH_URL = 'https://accounts.google.com/o/oauth2/auth'
SCOPE = ['https://www.googleapis.com/auth/userinfo.email',
         'https://www.googleapis.com/auth/userinfo.profile']
USER_INFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo'


def make_redirect_uri(request):
    if request.is_secure():
        redirect_uri = 'https://%s' % request.get_host()
    else:
        os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
        redirect_uri = 'http://%s' % request.get_host()
    redirect_uri += reverse('google-auth:callback')
    return redirect_uri


def login_view(request):
    oauth = OAuth2Session(settings.GOOGLE_OAUTH_ID, redirect_uri=make_redirect_uri(request),
                          scope=SCOPE)
    authorization_url, state = oauth.authorization_url(AUTH_URL)
    request.session['oauth_state'] = state
    return redirect(authorization_url)


def callback(request):
    oauth = OAuth2Session(settings.GOOGLE_OAUTH_ID,
                          state=request.session['oauth_state'],
                          redirect_uri=make_redirect_uri(request)
                          )
    make_redirect_uri(request)
    token = oauth.fetch_token(TOKEN_URL,
                              client_secret=settings.GOOGLE_OAUTH_SECRET,
                              code=request.GET.get('code'),
                              )
    response = oauth.get(USER_INFO_URL).json()
    email = response['email'].lower()
    try:
        user = get_user_model().objects.get(email=email, is_active=True)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
    except get_user_model().DoesNotExist:
        return render(request, 'error.html', {'email': email})
    return redirect(settings.OAUTH_REDIRECT_URL)
