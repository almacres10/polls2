from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = "tickets"

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("ticket/", views.Ticket, name="ticket"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path("login/", views.UserLogin, name="login"),
    path("signup/", views.UserSignUp, name="signup"),
    path("logout/", views.UserLogout, name="logout"),
]   