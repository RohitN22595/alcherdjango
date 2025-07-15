from django.shortcuts import render
from .models import Movies
from django.http import JsonResponse
from django.http import HttpResponse

# Create your views here.

def home(request):
    movies = Movies.objects.all()
    return render(request, 'home/home.html', {'movies': movies})

def details(request):
    details = Movies.objects.all()
    return render(request, 'home/details.html', {'details': details})

def discover(request):
    movies = Movies.objects.all()
    return render(request, 'home/discover.html', {'movies': movies})

def get_data(request):
    movies = Movies.objects.all()
    data = []

    for movie in movies:
        moviedata = {
        'title': movie.title,
        'description': movie.description,
        'release_date': movie.release_date,
        'poster': movie.poster.url if movie.poster else '',
        'rating': movie.rating,
        'votes': movie.votes,
        'background': movie.background.url if movie.background else '',
        'cast_members': []
        }

        for cast in movie.cast_members.all():
            moviedata['cast_members'].append({
                'role_name': cast.role_name,
                'real_name': cast.real_name,
                'image': cast.image.url if cast.image else '',
            })

        data.append(moviedata)

    
    return JsonResponse(data, safe=False)


            
