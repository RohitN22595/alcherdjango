from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib import messages

@login_required
def change_password_view(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Password changed successfully')
            return redirect('movies:home')  # ✅ Redirects to URL `/`
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'users/changepassword.html', {'form': form})


# Create your views here.

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            login(request, form.save())
            return redirect("movies:home")
    else:    
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data = request.POST)
        if form.is_valid():
            login(request, form.get_user())
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect("movies:home")
    else:
        form = AuthenticationForm()
    return render(request, 'users/login.html', {'form': form})

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect("movies:home")
    

@login_required
def dashboard(request):
    user = request.user  # This is the logged-in user
    # Or send user to template:
    return render(request, 'home/home.html', {'user': user})

@login_required
def dashboard(request):
    user = request.user  # This is the logged-in user
    # Or send user to template:
    return render(request, 'home/details.html', {'user': user})

@login_required
def change_password_view(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            # Keep the user logged in after password change
            update_session_auth_hash(request, user)
            messages.success(request, 'Password changed successfully')
            return redirect("movies:home")
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'users/changepassword.html', {'form': form})   

# @login_required
# def password_change_done_view(request):
#     return render(request, 'users/password_change_done.html')
