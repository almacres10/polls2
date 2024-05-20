from django.urls import path

from . import views

app_name = "polls"

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path("login/", views.UserLogin, name="login"),
    path("signup/", views.UserSignUp, name="signup"),
    path("logout/", views.UserLogout, name="logout"),
]   