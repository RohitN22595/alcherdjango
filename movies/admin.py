from django.contrib import admin
from .models import Movies, Cast

# Register your models here.

class CastInline(admin.TabularInline):
    model = Cast
    extra = 1

class MovieAdmin(admin.ModelAdmin):
    inlines = [CastInline]

admin.site.register(Movies, MovieAdmin)