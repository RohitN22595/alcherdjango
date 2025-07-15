from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('register/', views.register_view,  name='register'),
    path('login/', views.login_view,  name='login'),
    path('logout/', views.logout_view,  name='logout'),
    path('passwordchange/', views.change_password_view, name='passwordchange'),
    # path('password_change/done/', views.password_change_done_view, name='password_change_done'),
]
