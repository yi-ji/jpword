"""jpword URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from jpwordapp import views
import settings

urlpatterns = [
    #url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.home, name='home'),
    url(r'^test/', views.test, name='test'),
    url(r'^register/', views.register, name='register'),
    url(r'^login/', views.login, name='login'),
    url(r'^get_word/', views.get_word, name='get_word'),
    url(r'^set_word/', views.set_word, name='set_word'),
    #url(r'^dist/js/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"dist/js/",'show_indexes': True}),
    url(r'^css/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"css/",'show_indexes': True}),
    #url(r'^js/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"dist/js/",'show_indexes': True}),
    url(r'^js/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"js/",'show_indexes': True}),
    url(r'^fonts/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"fonts/",'show_indexes': True}),
    url(r'^mp3/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL+"mp3/",'show_indexes': True}),
    #url(r'^((mp3|css|js|fonts)/.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL,'show_indexes': True}),
]
