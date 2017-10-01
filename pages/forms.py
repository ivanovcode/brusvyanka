# coding: utf-8
from django import forms
from django.core.mail import send_mail
from urllib2 import urlopen, URLError, quote


class OrderForm(forms.Form):
    name = forms.CharField(required=False)
    email = forms.CharField(required=False)
    phone = forms.CharField(required=False)
    proj = forms.CharField(required=False)

    def clean(self):
        cleaned_data = super(OrderForm, self).clean()
        phone = cleaned_data.get('phone')
        email = cleaned_data.get('email')
        if not phone and not email:
            self.add_error("phone", "Заполните поле")
        return cleaned_data

    def body_serialize(self, request):
        name = u"Ф.И.О - %s" % self.cleaned_data['name']
        email = u"email - %s" % self.cleaned_data['email'] if self.cleaned_data['email'] else ""
        phone = u"Телефон - %s" % self.cleaned_data['phone']
        proj = u"Проект - %s" % self.cleaned_data['proj']
        text = request.POST.get('text', '')
        text = u'Текст - %s' % text if text else ''
        try:
            url = "url: %s" % request.META['HTTP_REFERER']
        except:
            url = ""
        body = '\n'.join((name, email, phone, proj, url, text))
        return body.encode('utf-8')

    def send_email(self, text):
        send_mail(u"Заявка с сайта: ilyaeliseev.ru", text, 'mailbox@ilyaeliseev.ru', ["ilyaeliseeff@ya.ru", 'info@brusvyanka.ru'],
                  fail_silently=False)

    def send_sms(self, text):
        url = "http://sms.ru/sms/send?api_id=a6b3607d-eb92-d9c4-1588-f793062dbcc6&to=79067998080&text=%s" % quote(text)
        try:
            urlopen(url, timeout=60)
        except URLError:
            pass


class RecallForm(forms.Form):
    name = forms.CharField(required=False)
    phone = forms.CharField()

    def body_serialize(self, request):
        name = u"Ф.И.О - %s" % self.cleaned_data['name']
        phone = u"Телефон - %s" % self.cleaned_data['phone']
        try:
            url = "url: %s" % request.META['HTTP_REFERER']
        except:
            url = ""
        body = '\n'.join((name, phone, url))
        return body.encode('utf-8')

    def send_email(self, text):
        send_mail(u"Заявка с сайта: ilyaeliseev.ru", text, 'mailbox@ilyaeliseev.ru', ["ilyaeliseeff@ya.ru", 'info@brusvyanka.ru'],
                  fail_silently=False)

    def send_sms(self, text):
        url = "http://sms.ru/sms/send?api_id=a6b3607d-eb92-d9c4-1588-f793062dbcc6&to=79067998080&text=%s" % quote(text)
        try:
            urlopen(url, timeout=60)
        except URLError:
            pass
