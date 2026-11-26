from django.urls import path
from . import views

urlpatterns = [
    path('', views.loading, name='loading'),
    path('loading/', views.loading, name='loading-page'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('home/', views.home, name='home'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('universities/', views.universities, name='universities'),
    path('galerie/', views.galerie, name='galerie'),
    path('library/', views.library, name='library'),
]