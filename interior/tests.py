# coding: utf-8
from django.test import TestCase
from django.test import Client
from .models import Project, Tag, TagProject
from django.core.urlresolvers import reverse


class BaseTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.tag = Tag.objects.create(name="Тэг1", h1="Заголовок1", title="Тэг1", url='tag', descr="Описание")
        project = Project(name="Проект1", h1="Заголовок1", title="Титл1", descr="текст какой-то", sq=500,
                          articul='01-01', url='proekt')
        project.save()
        TagProject.objects.create(tag=self.tag, project=project)


class PageTestCase(BaseTestCase):
    def test_tag_page(self):
        self.assertEqual(Tag.objects.filter(url='tag').count(), 1)
        response = self.client.get(self.tag.get_absolute_url())
        self.assertEqual(response.status_code, 200)


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
        response = self.client.get(reverse('interior'))
        self.assertEqual(response.status_code, 200)
