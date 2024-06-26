from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.urls import reverse
from django.db.models import F
from . models import Question, Choice
from django.utils import timezone
from .forms import SignUpForm, LoginForm
from django.contrib.auth import authenticate, login, logout


# Create your views here.
def UserSignUp(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect ('tickets:index')
    else:
        form = SignUpForm()
    return render(request, 'tickets/signup.html', {'form':form})

def UserLogin(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('tickets:index')
    else:
        form = LoginForm()
    return render(request, 'tickets/login.html', {'form':form})

# logout page
def UserLogout(request):
    logout(request)
    return redirect('UserLogin')

class IndexView(generic.ListView):
    template_name = "tickets/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        return Question.objects.order_by("-pub_date")[:5]

# belum selesai
    
def Ticket(request):
    return render(request, 'tickets/ticket.html')


class DetailView(generic.DetailView):
    model = Question
    template_name =  "tickets/detail.html"

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())

class ResultsView(generic.DetailView):
    model = Question
    template_name = "tickets/results.html"

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "tickets/detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes = F("votes") + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("tickets:results", args=(question.id,)))