from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.home, name='home'),
    path('details', views.details, name='details'),
    path('discover', views.discover, name='discover'),
    path('get-data/', views.get_data, name='get_data'),
]
