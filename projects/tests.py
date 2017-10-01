# coding: utf-8
from django.test import (
    TestCase,
    Client,
    override_settings,
)
from .models import (
    Project,
    Tag,
    ArticleTag,
    TagProject
)
from pages.models import Page
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User


class BaseTestCase(TestCase):
    def setUp(self):
        USERNAME = 'admin'
        PASSWORD = 'admin'
        User.objects.create_superuser(USERNAME, '', PASSWORD)
        self.client = Client()
        self.client_auth = Client()
        self.client_auth.login(username=USERNAME, password=PASSWORD)
        Page(name="Главная страница1", h1="Главная1", title="Главная", body="Описание", url='/').save()
        self.tag = Tag(name="Тэг1", h1="Заголовок1", title="Тэг1", url='tag', descr="Описание")
        self.tag.save()
        project = Project(name="Проект1", h1="Заголовок1", title="Титл1", descr="текст какой-то", sq=500,
                          articul='01-01', url='proekt')
        project.save()
        TagProject.objects.create(tag=self.tag, project=project)


class PageTestCase(BaseTestCase):
    def test_main_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.tag.get_absolute_url())
        self.assertEqual(response.status_code, 200)

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend', EMAIL_FILE_PATH='test_emails', DEBUG=True)
    def test_free_call(self):
        response = self.client.post('/recall', {'name': 'test', 'phone': '89061505083'})
        self.assertJSONEqual(response.content, {'ok': True, 'result': u"Мы с вами свяжемся!"})
        response = self.client.post('/recall', {'phone': '89061505083', 'name': ''})
        self.assertJSONEqual(response.content, {'ok': True, 'result': u"Мы с вами свяжемся!"})
        response = self.client.post('/recall', {'phone': '', 'name': ''})
        self.assertJSONEqual(response.content, {'ok': False, 'result': u"Заявка не отправлена, заполните все необходимые поля!"})

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend', EMAIL_FILE_PATH='test_emails', DEBUG=True)
    def test_do_order(self):
        response = self.client.post('/order', {'name': 'test', 'phone': '89061505083', 'email': '', 'proj': 'test'})
        self.assertJSONEqual(response.content, {'ok': True, 'result': u"Мы с вами свяжемся!"})
        response = self.client.post('/order', {'phone': '', 'email': 'gasoid@gmail.com', 'proj': 'test', 'name': ''})
        self.assertJSONEqual(response.content, {'ok': True, 'result': u"Мы с вами свяжемся!"})
        response = self.client.post('/order', {'phone': '', 'name': ''})
        self.assertJSONEqual(response.content, {'ok': False, 'result': u"Заявка не отправлена, заполните все необходимые поля!"})
        response = self.client.post('/order', {'phone': '', 'email': 'gasoid@gmail.com', 'proj': 'test', 'name': '', 'text': 'text'})
        self.assertJSONEqual(response.content, {'ok': True, 'result': u"Мы с вами свяжемся!"})


class ProjectTestCase(BaseTestCase):
    def test_projects(self):
        project = Project(name="Проект1", h1="Заголовок1", title="Титл1", descr="текст какой-то", sq=500,
                          articul='01-01', url='proekt1')
        tag = Tag(name="Тэг1", h1="Заголовок1", title="Тэг1", url='tag1', descr="Описание")
        project.save()
        tag.save()
        TagProject(project=project, tag=tag).save()
        response = self.client.get(project.get_absolute_url())
        self.assertEqual(response.status_code, 200)
        response = self.client.get(reverse('projects'))
        self.assertEqual(response.status_code, 200)

    def test_article_tag(self):
        article = ArticleTag(tag=self.tag, title="Статья1", h1="Статья1", name="Статья1", url="article",
                             text="текст с картинкой <img src='../../../media/cache/test.jpg' alt>")
        article.save()
        response = self.client.get(article.get_absolute_url())
        self.assertEqual(response.status_code, 200)
        article = ArticleTag(title="Статья2", h1="Статья2", name="Статья2", url="article2",
                             text="текст с картинкой <img src='../../../media/cache/test.jpg' alt>")
        article.save()
        response = self.client.get(article.get_absolute_url())
        self.assertEqual(response.status_code, 200)


class AdminTestCase(BaseTestCase):
    def test_admin_index(self):
        response = self.client.get(reverse('admin:index'))
        self.assertEqual(response.status_code, 302)
        response = self.client_auth.get(reverse('admin:index'))
        self.assertEqual(response.status_code, 200)

    def test_admin_projects(self):
        data = (
            ('projects', ('project', 'tag',)),
            ('pages', ('page', 'banner', 'feedback', 'staff', 'settings')),
        )
        trails = (
            ('changelist', False),
            ('add', False),
        )
        for app in data:
            for model in app[1]:
                for trail in trails:
                    if trail[1]:
                        url = reverse('admin:%s_%s_%s' % (app[0], model, trail[0]), args=trail[1])
                    else:
                        url = reverse('admin:%s_%s_%s' % (app[0], model, trail[0]))
                    response = self.client_auth.get(url)
                    self.assertEqual(response.status_code, 200)
