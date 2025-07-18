# Generated by Django 5.2.4 on 2025-07-12 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=75)),
                ('description', models.TextField()),
                ('release_date', models.DateField()),
                ('poster', models.ImageField(upload_to='')),
                ('background', models.ImageField(upload_to='')),
            ],
        ),
    ]
