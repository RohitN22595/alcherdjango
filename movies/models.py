from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Movies(models.Model):
    title = models.CharField(max_length=75)
    description = models.TextField()
    release_date = models.DateField()
    poster = models.ImageField()
    background = models.ImageField()
    votes = models.PositiveBigIntegerField()
    rating = models.DecimalField(max_digits=10, decimal_places=1)
    
    def __str__(self):
        return self.title

class Cast(models.Model):
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name='cast_members')
    role_name = models.CharField(max_length=100)  # character name in movie
    real_name = models.CharField(max_length=100)  # actor real name
    image = models.ImageField(upload_to='cast_images/')

    def _str_(self):
        return f"{self.real_name} as {self.role_name}"    
    