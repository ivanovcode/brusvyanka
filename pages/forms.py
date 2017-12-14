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
        send_mail('Заявка с сайта: brusvyanka.ru', text, 'development@ivanov.site', ['info@brusvyanka.ru'], fail_silently=False)

    def send_sms(self, text):
        url = "https://sms.ru/sms/send?api_id=fa5cbf1c-3a4a-f2a4-3122-365973dd3b2c&to=79164401342&msg=%s" % quote(text)        
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
        send_mail('Заявка с сайта: brusvyanka.ru', 'test', 'development@brusvyanka.ru', ['info@brusvyanka.ru'], fail_silently=False)
        #send_mail("Заявка с сайта: brusvyanka.ru", text, 'mailbox@brusvyanka.ru', ['info@brusvyanka.ru'], fail_silently=False)

    def send_sms(self, text):
        url = "https://sms.ru/sms/send?api_id=fa5cbf1c-3a4a-f2a4-3122-365973dd3b2c&to=79164401342&msg=test"
        try:
            urlopen(url, timeout=60)
        except URLError:
            pass
