---
title: "Lesson 18: Custom Management Commands"
description: "Notes and starter code: Lesson 18: Custom Management Commands."
tags: [sdev-2401, django]
sidebar:
  order: 18
---

So far in this course we've used several built-in django management commands such as `runserver`, `migrate`, `createsuperuser`, `makemigrations`, `collecstatic` and `shell`. In this lesson we're going to learn about creating our own custom management commands in our django apps.

Custom django Management commands can be run from the command line using the `manage.py` script. This is useful for automating tasks, such as data import/export, sending emails, or any other repetitive tasks that need to be performed, that is contained within your django project and a specific app.

These are great as one off scripts, or for tasks that need to be run on a schedule (e.g. via cron jobs).

## Prerequisites
- Create a new virtual environment and install the packages from the `requirements.txt` file.

## Steps

We're going to create a few custom management commands in our `courses` app.
1. A management command that is going to import courses from a CSV file (`import_courses` command).
2. A management command that is going to export all the courses to a CSV file (`export_courses` command).
3. A management command that will message instructors about new submissions to their assignments (`notify_instructors_new_submissions` command).

### 1. Create the management/commands directory structure

In your `courses` app, create the following directory structure:
```
courses/
    management/
        __init__.py
        commands/
            __init__.py

```
We're going to add our custom management commands in the `commands` directory, the commands will be named after the python files we create in this directory.
- For example, if we create a file named `import_courses.py`, we will be able to run the command using `python manage.py import_courses` (more on this below).

### 2. Create the `import_courses` command and create the `Course` model.

#### 2.1 Let's create the `Course` model first.

In the `courses/models.py` file, create a simple `Course` model with fields for `title`, `description`.

```python
from django.db import models

# ... other imports ...

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title

# ... other models ...
```

Again just like always you'll need to `makemigrations` and `migrate` to create the table in the database.

Also add this to the `admin.py` so we can see the courses in the admin interface:

```python
from django.contrib import admin
from .models import Assignment, Submission, Course

admin.site.register(Assignment)
admin.site.register(Submission)
admin.site.register(Course)
```

#### 2.2 Let's create the `import_courses` Management Command.

In the `courses/management/commands/` directory, create a new file named `import_courses.py`. This file will contain the logic for our custom management command.

```python
import csv
from django.core.management.base import BaseCommand
from courses.models import Course

class Command(BaseCommand):
    help = 'Import courses from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file to import courses from')

    def handle(self, *args, **kwargs):
        csv_file = kwargs.get('csv_file')
        if not csv_file:
            self.stdout.write(self.style.ERROR('Please provide a CSV file path'))
            return

        with open(csv_file, newline='') as file:
            reader = csv.DictReader(file)
            for row in reader:
                course, created = Course.objects.get_or_create(
                    title=row['title'],
                    description=row['description']
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported courses from "%s"' % csv_file))
```
Let's break down the code above here.
- The fundamentals:
  - We import the necessary modules, including `csv` for reading CSV files and `BaseCommand` from `django.core.management.base` to create our custom command.
  - We define a `Command` class that inherits from `BaseCommand`.
  - We provide a `help` attribute that describes what the command does.
- The `add_arguments` method:
  - This method allows us to define command-line arguments for our management command.
  - We add a required argument `csv_file` that specifies the path to the CSV file we want to import courses from.
- The `handle` method:
  - This is where the main logic of the command resides.
  - We retrieve the `csv_file` argument and check if it was provided.
  - We open the CSV file and use `csv.DictReader` to read its contents.
  - For each row in the CSV file, we create a new `Course` instance using the data from the CSV.
  - Finally, we print a success message indicating that the courses were imported successfully.

#### 2.3 Let's run the `import_courses` command in the terminal with

In the terminal you can now see the available management commands by running:

```
$ python manage.py
Type 'manage.py help <subcommand>' for help on a specific subcommand.

Available subcommands:

[auth]
    changepassword
    createsuperuser

[contenttypes]
    remove_stale_contenttypes

[courses]
    import_courses
```
You can see our `import_courses` command is now available under the `courses` app.


In the terminal you can get to the root of your django project (where `manage.py` is located) and run the command with "help"

```
$ python manage.py import_courses -h
usage: manage.py import_courses [-h] [--version] [-v {0,1,2,3}] [--settings SETTINGS]
                                [--pythonpath PYTHONPATH] [--traceback] [--no-color]
                                [--force-color] [--skip-checks]
                                csv_file

Import courses from a CSV file

positional arguments:
  csv_file              The path to the CSV file to import courses from

... other options ...
```

Lets run the command to import courses without a CSV file path to see the error handling:

```
$ python manage.py import_courses
usage: manage.py import_courses [-h] [--version] [-v {0,1,2,3}] [--settings SETTINGS]
                                [--pythonpath PYTHONPATH] [--traceback] [--no-color]
                                [--force-color] [--skip-checks]
                                csv_file
manage.py import_courses: error: the following arguments are required: csv_file
```


Let's run the command to import courses from a sample CSV file we have created in the `csv-to-use/new-courses.csv` file.

```
$ python manage.py import_courses path/to/csv-to-use/new-courses.csv
Successfully created 104 courses from path/to/csv-to-use/new-courses.csv
```

So you can see here that the command successfully imported the courses from the CSV file.

### 3. Create the `export_courses` command.

#### 3.1 Let's create the `export_courses` Management Command.

In the `courses/management/commands/` directory, create a new file named `export_courses.py`. This file will contain the logic for our custom management command to export courses to a CSV file.

```python
import csv
from django.core.management.base import BaseCommand
from courses.models import Course

class Command(BaseCommand):
    help = 'Export courses to a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('output_file', type=str, help='The path to the output CSV file')

    def handle(self, *args, **kwargs):
        output_file = kwargs.get('output_file')
        if not output_file:
            self.stdout.write(self.style.ERROR('Please provide an output file path'))
            return

        courses = Course.objects.all()
        with open(output_file, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['title', 'description'])  # Write header
            for course in courses:
                writer.writerow([course.title, course.description])

        self.stdout.write(
            self.style.SUCCESS(
                F'Successfully exported {courses.count()} courses to {output_file}'
            )
        )
```
You can see here that this command is similar to the `import_courses` command, but instead of reading from a CSV file, it writes all the courses in the database to a specified output CSV file.

#### 3.2 Let's run the `export_courses` command in the terminal.

In the terminal you can now see the available management commands by running:

```
$ python manage.py export_courses path/to/output-courses.csv
Successfully exported 104 courses to path/to/output-courses.csv
```

### 4. Create the `notify_instructors_new_submissions` command.

This is going to be a simple command that will send a message to instructors reminding them about new submissions to their assignments.

#### 4.1 Let's add a `instructor_notified` field to the `Submission` model.

In the `courses/models.py` file, add a new boolean field `instructor_notified` to the `Submission` model to track whether the instructor has been notified about the submission.

```python
from django.db import models
# ... other imports ...

class Submission(models.Model):
    # ... existing fields ...

    instructor_notified = models.BooleanField(default=False)  # New field

    def __str__(self):
        return f"Submission by {self.student_name} for {self.assignment}"
```

Now you'll need to `makemigrations` and `migrate` to apply the changes to the database.

#### 4.2 Let's set up email settings in `settings.py`.

In the `announcements_project/settings.py` file, add the following email backend settings for development purposes:

```python
# Email backend (for development, using console backend)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

This is to "fake" sending emails by printing them to the console instead.


#### 4.3 Let's create the `notify_instructors_new_submissions` Management Command.

In the `courses/management/commands/` directory, create a new file named `notify_instructors_new_submissions.py`. This file will contain the logic for our custom management command to remind instructors about new submissions.

```python
class Command(BaseCommand):
    help = 'Notify instructors about new submissions'

    def handle(self, *args, **kwargs):
        # Fetch submissions that have not been notified yet
        new_submissions = Submission.objects.filter(instructor_notified=False)

        # loop through submissions
        count = new_submissions.count()
        if count == 0:
            self.stdout.write(self.style.SUCCESS('No new submissions to notify instructors about.'))
            return

        for submission in new_submissions:
            instructor = submission.assignment.owner
            # Simulate sending notification (e.g., via email)
            send_mail(
                subject='New Submission Received',
                message=f'{submission.assignment.title} has a new submission from {submission.student_name}.',
                from_email="notifications@test.com",
                recipient_list=[instructor.email],
            )

            # Mark submission as notified
            submission.instructor_notified = True
            submission.save()
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully notified instructors about {count} new submissions.'
            )
        )
```
Let's break down the code above here.
- The fundamentals:
  - We define a `Command` class that inherits from `BaseCommand`.
  - We provide a `help` attribute that describes what the command does.
- The `handle` method:
  - We fetch all submissions that have not been notified yet using a filter on the `instructor_notified` field.
  - If there are no new submissions, we print a message and return.
  - For each new submission, we simulate sending an email notification to the instructor using Django's `send_mail` function.
  - After sending the notification, we mark the submission as notified by setting `instructor_notified` to `True` and saving the submission.
  - Finally, we print a success message indicating how many instructors were notified.

#### 4.4 Let's add a submission in the admin interface and run the `notify_instructors_new_submissions` command in the terminal.

Go to the admin interface and add a new submission for an assignment. Make sure to set the `instructor_notified` field to `False` (which is the default value).

In the terminal, run the command to notify instructors about new submissions:

```
$ python manage.py notify_instructors_new_submissions
Content-Type: text/plain; charset="utf-8"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Subject: New Submission Received
From: notifications@test.com
To: dan@test.com
Date: Thu, 05 Feb 2026 21:17:56 -0000
Message-ID: <177032627648.28168.10347483615740225785@W309-DMorr2.nait.ca>

Assignment 1 has a new submission from dan.
-------------------------------------------------------------------------------
Successfully notified instructors about 1 new submissions.
```
You'll see as well that if you run it again it will say there are no new submissions to notify about, since we marked the submission as notified in the previous step.

This is a really handy command to have in a real application, you can set it up to run on a schedule (e.g., every hour) using a cron job or a task scheduler like Celery Beat, to automatically notify instructors about new submissions without having to run the command manually.


## Challenge/Exercise

### Expand the import `import_courses` command to import courses that might have different names for the fields in the CSV file. For example, some CSV files might have a `course_title` field instead of `title`, or `course_description` instead of `description`. Update the command to handle these cases.
1. Go to https://www.kaggle.com/datasets/khusheekapoor/coursera-courses-dataset-2021 and download the dataset and extract the `coursera_courses.csv` file.
2. In the `import_courses` command add two new optional arguments `--title-field` and `--description-field` that allow the user to specify the field names for the title and description in the CSV file.
3. Update the command logic to use these optional arguments to read the correct fields from the CSV file when importing courses.
4. use the command to import courses from the `coursera_courses.csv` file, specifying the correct field names for the title and description.
5. Use the https://www.kaggle.com/datasets/khusheekapoor/edx-courses-dataset-2021 to import courses from the `EdX.csv` file, specifying the correct field names for the title and description.


## Conclusion

In this lesson we learned about creating custom management commands. Management commands are great and can be used for multiple purposes:
- Automating repetitive tasks.
- Running one-off scripts.
- Running tasks on a schedule (e.g., via cron jobs or Celery Beat).
- Interacting with your Django project and its data from the command line.




## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `announcements_project/announcements_project/settings.py`

```python title="announcements_project/announcements_project/settings.py"
"""
Django settings for announcements_project project.

Generated by 'django-admin startproject' using Django 5.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-dxpzv$qyn5j)f*@x@3+1lp6)ewpkd70)yqw5epp_544yi)w7&c"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # custom apps
    "core",
    "announcements",
    "profiles",
    # add the courses app
    "courses",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "announcements_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": ['templates'],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "announcements_project.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True




# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# you can add this at the bottom of the file
# as it's not created yet.
AUTH_USER_MODEL = 'core.User'


LOGIN_REDIRECT_URL = '/announcements/'  # after login original LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/accounts/login/'  # after logout
LOGIN_URL = '/accounts/login/' #

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static'
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### `announcements_project/announcements_project/urls.py`

```python title="announcements_project/announcements_project/urls.py"
"""
URL configuration for announcements_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('core.urls')),  # registration view added!
    path('announcements/', include('announcements.urls')),  # announcements app urls
    path('profiles/', include('profiles.urls')),  # profiles app urls
    path('courses/', include('courses.urls')),  # courses app urls
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### `announcements_project/courses/admin.py`

```python title="announcements_project/courses/admin.py"
from django.contrib import admin
from .models import Assignment, Submission

admin.site.register(Assignment)
admin.site.register(Submission)
```

### `announcements_project/courses/apps.py`

```python title="announcements_project/courses/apps.py"
from django.apps import AppConfig


class CoursesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "courses"
```

### `announcements_project/courses/forms.py`

```python title="announcements_project/courses/forms.py"
from django import forms


class BulkAssignmentUploadForm(forms.Form):
    csv_file = forms.FileField(label="Select a CSV file")

    # Let's add some validation to ensure the uploaded file is a CSV
    def clean_csv_file(self):
        file = self.cleaned_data.get('csv_file')
        # Validate file type extension
        if not file.name.endswith('.csv'):
            raise forms.ValidationError("Please upload a valid CSV file.")

        # Check the content type
        if file.content_type != 'text/csv':
            raise forms.ValidationError("File type is not CSV.")

        return file
```

### `announcements_project/courses/models.py`

```python title="announcements_project/courses/models.py"
import csv

from django.db import models
from django.conf import settings

from django.utils import timezone
from datetime import datetime

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="assignments",
    )

    @classmethod
    def create_assignments_from_csv(cls, csv_file, owner):
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        assignments = []
        for row in reader:
            # Parse date and time
            naive_dt = datetime.strptime(
                f"{row['date']} {row['time']}",
                "%Y-%m-%d %H:%M"
            )
            dt = timezone.make_aware(naive_dt)
            # create assignment
            new_assignment, created = Assignment.objects.get_or_create(
                title=row['title'],
                description=row['description'],
                due_date=dt,
                owner=owner
            )
            # keep track of created assignments
            assignments.append(new_assignment)
        return assignments

    def __str__(self):
        return self.title

class Submission(models.Model):
    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name="submissions",
    )

    student_name = models.CharField(max_length=100)

    file = models.FileField(upload_to='submissions/')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission by {self.student_name} for {self.assignment}"
```

### `announcements_project/courses/templates/courses/assignment_list.html`

```html title="announcements_project/courses/templates/courses/assignment_list.html"
{% extends 'base.html' %}
{% load static %}

{% block title %}Assignments{% endblock %}

{% block content %}
<div class="max-w-2xl mx-auto px-4 md:px-0">
  <div class="flex justify-between items-center mb-4">

    <h1 class="text-3xl font-bold underline">
      Assignments
    </h1>
  </div>
  <ul>
    {% for assignment in assignments %}
    <li class="mb-4 p-4 border border-gray-200 rounded">
      <h2 class="text-xl font-semibold">{{ assignment.title }}</h2>
      <p>{{ assignment.description }}</p>
      <p class="text-sm text-gray-600">Due: {{ assignment.due_date }}</p>
      <a href="{% url 'assignment_submission' assignment.id %}" class="text-blue-600 hover:underline">Submit Assignment</a>
    </li>
    {% empty %}
    <li>No assignments available.</li>
    {% endfor %}
  </ul>
</div>
{% endblock %}
```

### `announcements_project/courses/templates/courses/assignment_submission.html`

```html title="announcements_project/courses/templates/courses/assignment_submission.html"
{% extends 'base.html' %}
{% load static %}

{% block title %}Submit Assignment{% endblock %}

{% block content %}
<div class="max-w-2xl mx-auto px-4 md:px-0">
  <div class="flex justify-between items-center mb-4">

    <h1 class="text-3xl font-bold underline">
      Submission for Assignment {{ assignment_id }}
    </h1>
  </div>
    <p>This is a placeholder for the assignment submission form.</p>
</div>
{% endblock %}
```

### `announcements_project/courses/templates/courses/bulk_assignment_upload.html`

```html title="announcements_project/courses/templates/courses/bulk_assignment_upload.html"
{% extends 'base.html' %}
{% load static %}

{% block title %}Assignment Upload{% endblock %}

{% block content %}
<div class="max-w-2xl mx-auto px-4 md:px-0">
  <div class="flex justify-between items-center mb-4">

    <h1 class="text-3xl font-bold underline">
      Bulk Assignment Upload
    </h1>
  </div>
  {% if success %}
  <div class="mb-4 p-4 bg-green-100 text-green-800 border border-green-200 rounded">
    <p>Following Assignments uploaded successfully!</p>
    <ul>
        {% for assignment in assignments %}
        <li>{{ assignment.title }} - Due: {{ assignment.due_date }}</li>
        {% endfor %}

    </ul>
  </div>
  {% endif %}
  <!-- IMPORTANT: You need enctype="multipart/form-data  -->
  <form method="post" enctype="multipart/form-data">
    {% csrf_token %}
    {% for field in form %}
      <div>
        <label for="{{ field.id_for_label }}" class="block text-sm font-medium text-gray-700">
          {{ field.label }}
        </label>
        {{ field }}
        {% if field.errors %}
          <p class="text-sm text-red-500 mt-1">{{ field.errors|striptags }}</p>
        {% endif %}
      </div>
    {% endfor %}
    {% if form.non_field_errors %}
    <div class="mt-4 mb-4 p-4 bg-red-100 text-red-800 border border-red-200 rounded">
        <ul>
            {% for error in form.non_field_errors %}
            <li>{{ error }}</li>
            {% endfor %}
        </ul>
    </div>
    {% endif %}
    <button type="submit" class="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
      Upload Assignments
    </button>
  </form>
</div>
{% endblock %}
```

### `announcements_project/courses/urls.py`

```python title="announcements_project/courses/urls.py"
from django.urls import path

from .views import bulk_assignment_upload, assignment_list, assignment_submission

urlpatterns = [
    path('bulk-assignment-upload/', bulk_assignment_upload, name='bulk_assignment_upload'),
    path('assignments/', assignment_list, name='assignment_list'),
    path('assignments/<int:assignment_id>/submit/', assignment_submission, name='assignment_submission'),
]
```

### `announcements_project/courses/views.py`

```python title="announcements_project/courses/views.py"
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .forms import BulkAssignmentUploadForm
from .models import Assignment


@login_required
def assignment_list(request):
    assignments = Assignment.objects.all().order_by('-created_at')
    return render(request, 'courses/assignment_list.html', {
        'assignments': assignments,
    })

@login_required
def assignment_submission(request, assignment_id):
    # Placeholder for submission view
    return render(request, 'courses/assignment_submission.html', {
        'assignment_id': assignment_id,
    })

# Create your views here.
@login_required
def bulk_assignment_upload(request):
    success = False
    assignments = []
    if request.method == 'POST':
        form = BulkAssignmentUploadForm(request.POST, request.FILES)
        if form.is_valid():
            # Process the uploaded CSV file
            csv_file = form.cleaned_data['csv_file']
            # Create assignments from the CSV file
            assignments = Assignment.create_assignments_from_csv(csv_file, owner=request.user)
            # Note
            success = True
    else:
        form = BulkAssignmentUploadForm()

    return render(request, 'courses/bulk_assignment_upload.html', {
        'form': form,
        'success': success,
        'assignments': assignments,
    })
```

### `announcements_project/templates/base.html`

```html title="announcements_project/templates/base.html"
{% load static %}

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="{% static 'css/styles.css' %}" />
    {% block css_styles %}{% endblock %}
    {% block js_scripts %}{% endblock %}
    <title>
        {% block title %}Announcements App{% endblock %}
    </title>
  </head>
  <body>
    <header>
        {% block header %}
        <nav class="bg-gray-800 p-4">
            <div class="max-w-2xl mx-auto flex justify-between items-center">
                <!-- Title -->
                <a href="" class="flex text-white text-lg font-semibold">
                    <!-- Added image -->
                    <img src="{% static '/logo-sm.png' %}"
                        class="px-2"
                        width="50"
                        height="50"

                    >
                    Announcements App
                </a>
                <!--  Check if the user is authenticated -->
                {% if user.is_authenticated %}
                <div>
                    <!--  Add logout tag to action -->
                    <form method="post" action="{% url 'logout' %}">
                        <span class="text-gray-300 mr-4">
                            <!--  Add username and the role below -->
                            Hello, {{user.username}}, ({{user.role}})
                        </span>
                        <!-- Add the assignment list url. -->
                        <a href="{% url 'assignment_list' %}" class="px-4 py-2 mr-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            Assignments
                        </a>
                        <!--  Add CSRF Token -->
                        {% csrf_token %}
                        <button type="submit" class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Logout
                        </button>
                    </form>
                </div>
                <!--  Else if the user is not authenticated -->
                {% else %}
                <div>
                    <!--  Add login template tag -->
                    <a href="{% url 'login' %}" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</a>
                    <!--  Add register template tag -->
                    <a href="{% url 'login' %}" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Register</a>
                </div>
                <!--  Close the if statement. -->
                {% endif %}
            </div>
        </nav>
        {% endblock %}
    </header>
    <main>
        {% block content %}{% endblock %}

    </main>
    <footer>
        {% block footer %}
            <p class="text-center text-gray-500">
                &copy; Announcements App
            </p>
        {% endblock %}
    </footer>
  </body>
</html>
```
