---
title: "Lesson 19: Class Based Views"
description: "Notes and starter code: Lesson 19: Class Based Views."
tags: [sdev-2401, django]
sidebar:
  order: 19
---

So far in the course we've been using function based views to handle requests and return responses. In this lesson we're going to learn about class based views (CBVs) which provide an alternative way to define views using Python classes instead of functions.

Both function based views and class based views are valid approaches in Django, and each has its own advantages and use cases. Class based views can help organize code better, promote code reuse through inheritance and mixins, and provide built-in generic views for common patterns.

This will also prepare us for using Django Rest Framework later in the course, which heavily utilizes similar class based view concepts.

Please heavily refer to the official Django documentation on [class based views here](https://docs.djangoproject.com/en/5.2/topics/class-based-views/).

## Prerequisites
- Create a new virtual environment and install the packages from the `requirements.txt` file.

## Steps

### Step 1: Create a `View` for the homepage and add the url.

#### 1.1 Create a new app called `web`:

```bash
python manage.py startapp web
```

Add it to the `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    # ...other apps...
    'web',
]
```


#### 1.2 In `web/views.py`, create a `View` for the homepage, with a template.
In the past we've written function based views like this:

```python
from django.shortcuts import render

def home_page_view(request):
    return render(request, 'web/home.html')
```
This is fine, but with class based views we can write the same view using a class that inherits from `View` below.

In `web/views.py`, Create a view called `HomePageView` that inherits from `View` and override the `get` method to render a template:

```python
from django.views import View
from django.shortcuts import render


class HomePageView(View):
    def get(self, request):
        return render(request, 'web/home.html')
```

Copy the `home.html` template from the base of this example into `web/templates/web/home.html`:


#### 1.3 add the url for the homepage view in `web/urls.py` and include it in the main `urls.py`:

Create a `urls.py` file in the `web` app and add the following code:

```python
from django.urls import path

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
]
```
This is a bit different than how we used to add urls for function based views. For class based views, we need to call the `as_view()` method on the view class to get a callable view that can be used in the URL patterns.

Then, include the `web` app's urls in the main `announcements_projects/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('web.urls')),  # Include the web app urls
    # ...other urls...
]

# ...media urls...
```

You can see now that we have a base template for our simple lms system with a class based view!

#### 1.4 Let's modify the `base.html` template to add a link to the home page and modify the navbar to add a link to the `announcements_list` view.

Open the `templates/base.html` and modify the title so that it links to the home page:

```html
<!-- ... this inside the header block... -->

<!-- Title -->
<a href="{% url 'home' %}" class="flex text-white text-lg font-semibold">
    <!-- Added image -->
    <img src="{% static '/logo-sm.png' %}"
        class="px-2"
        width="50"
        height="50"
    >
</a>
```

Also in the `templates/base.html` file and modify the navbar to include a link to the home page and the announcements list page:

```html
<!-- ... this inside the header block... -->
<a href="{% url 'announcement_list' %}" class="px-4 py-2 mr-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
    Announcements
</a>
<!-- Rest of the app  -->
```

At the end of this step you should see something like this when you visit the homepage when you're logged in:
### Step 2: Let's refactor the views in `announcements/views.py` to use class based views instead of function based views.

#### 2.1 Let's refactor the `announcement_list` view to use a class based view.

Currently our function based view for the announcement list looks like this:

```python
# ... code above ...
@login_required
def announcement_list(request):
    announcements = Announcement.objects.all().order_by('-created_at')
    return render(
        request,
        'announcements/announcement_list.html',
        {'announcements': announcements}
    )
```

To refactor this in a class based view we're going to use `View` and override the `get` method to handle GET requests (we're going to add the login required decorator in the next step):

```python

from django.views import View

# ... is teacher function and other imports ...

class AnnouncementListView(View):
    template_name = 'announcements/announcement_list.html'

    def get(self, request):
        announcements = Announcement.objects.all().order_by('-created_at')
        return render(
            request,
            self.template_name,
            {'announcements': announcements}
        )
```
So note here:
- We define a class `AnnouncementListView` that inherits from `View`.
- We specify the template to be rendered using the `template_name` attribute.
- We override the `get` method to handle GET requests. Inside the `get` method, we retrieve the announcements and render the template with the context.
- We haven't added the login required decorator yet, we'll add that in the next step.


Then we need to update the url for the announcement list view in `announcements/urls.py` to use the new class based view:

```python
from django.urls import path
from .views import AnnouncementListView, create_announcement

urlpatterns = [
    path('', AnnouncementListView.as_view(), name='announcement_list'),
    path('create/', create_announcement, name='create_announcement'),
]
```

#### 2.2 Let's add the login required decorator to the `AnnouncementListView` class based view.

To add the login required decorator to a class based view, we can use the `method_decorator` from `django.utils.decorators` to apply the decorator to the `dispatch` method of the view. The `dispatch` method is called for every request and is responsible for dispatching the request to the appropriate handler method (like `get`, `post`, etc.).

Here's how we can modify the `AnnouncementListView` to require login:

```python
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

# ... other imports and is_teacher function ...

@method_decorator(login_required, name='dispatch')
class AnnouncementListView(View):
    template_name = 'announcements/announcement_list.html'

    def get(self, request, *args, **kwargs):
        announcements = Announcement.objects.all().order_by('-created_at')
        return render(
            request,
            self.template_name,
            {'announcements': announcements}
        )
```

### 3. Let's refactor the `create_announcement` view to use a class based view.

So far we've only refactored views that handle GET requests, but we can also refactor views that handle POST requests. The `create_announcement` view currently looks like this:

So far our `create_announcement` view looks like this:
```python
@login_required
@user_passes_test(is_teacher, login_url='login')
# @permission_required('announcements.add_announcement', raise_exception=True) # the optional section
def create_announcement(request):
    if request.method == 'POST':
        form = AnnouncementForm(request.POST)
        if form.is_valid():
            announcement = form.save(commit=False)
            # the commit false will prevent the form from saving to the database
            # set the created_by field to the current user
            announcement.created_by = request.user
            announcement.save()
            # save the announcement to the database.
            return redirect('announcement_list')
    else:
        form = AnnouncementForm()
    return render(request, 'announcements/create_announcement.html', {'form': form})
```

Let 's refactor this to use a class based view. Since this view handles both GET and POST requests, we can use the `View` class and override both the `get` and `post` methods

```python
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required, user_passes_test

@method_decorator(login_required, name='dispatch')
@method_decorator(user_passes_test(is_teacher, login_url='login'), name='dispatch')
class CreateAnnouncementView(View):
    template_name = 'announcements/create_announcement.html'
    form_class = AnnouncementForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            announcement = form.save(commit=False)
            announcement.created_by = request.user
            announcement.save()
            return redirect('announcement_list')
        return render(request, self.template_name, {'form': form})
```
Let's break down what's happening here:
- We define a class `CreateAnnouncementView` that inherits from `View`.
- We use the `method_decorator` to apply the `login_required` and `user_passes_test` decorators to the `dispatch` method of the view, which will ensure that all requests to this view require the user to be logged in and pass the teacher
- We specify the template to be rendered using the `template_name` attribute and the form class using the `form_class` attribute.
- We override the `get` method to handle GET requests. In the `get` method, we create an instance of the form and render the template with the form in the context.
- We override the `post` method to handle POST requests. In the `post` method, we create an instance of the form with the POST data, validate it, and if it's valid, we save the announcement and redirect to the announcement list. If the form is not valid, we render the template again with the form (which will include error messages).



Then we need to update the url for the create announcement view in `announcements/urls.py` to use the new class based view:

```python
from django.urls import path
from .views import AnnouncementListView, CreateAnnouncementView

urlpatterns = [
    path('', AnnouncementListView.as_view(), name='announcement_list'),
    path('create/', CreateAnnouncementView.as_view(), name='create_announcement'),
]
```

## Challenge/Exercise

Refactor all of the views in the `courses` app to use class based views instead of function based views. You can use the `View` class and override the appropriate methods (`get`, `post`, etc.) to handle the requests. Don't forget to add the necessary decorators for authentication and permissions.

We'll do this together after you try it on you own. You can refer to the official Django documentation on class based views for more details and examples: https://docs.djangoproject.com/en/5.2/topics/class-based-views/.


## Conclusion

In this lesson, we learned about class based views in Django and how to use them to handle requests and return responses. We refactored our existing function based views to use class based views.

## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `announcements_project/announcements/views.py`

```python title="announcements_project/announcements/views.py"
from django.shortcuts import render, redirect
# import login_required decorator
from django.contrib.auth.decorators import login_required, user_passes_test, permission_required

# Create your views here.
from .models import Announcement
from .forms import AnnouncementForm

# our test function here.
def is_teacher(user):
    # the user object is passed in here by the decorator
    return user.role == 'teacher'

@login_required
def announcement_list(request):
    announcements = Announcement.objects.all().order_by('-created_at')
    return render(
        request,
        'announcements/announcement_list.html',
        {'announcements': announcements}
    )

# this will restrict access to only users that pass the is_teacher test
# it will redirect to the login page if the user does not have permission.
@login_required
@user_passes_test(is_teacher, login_url='login')
# @permission_required('announcements.add_announcement', raise_exception=True) # the optional section
def create_announcement(request):
    if request.method == 'POST':
        form = AnnouncementForm(request.POST)
        if form.is_valid():
            announcement = form.save(commit=False)
            # the commit false will prevent the form from saving to the database
            # set the created_by field to the current user
            announcement.created_by = request.user
            announcement.save()
            # save the announcement to the database.
            return redirect('announcement_list')
    else:
        form = AnnouncementForm()
    return render(request, 'announcements/create_announcement.html', {'form': form})
```

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

# Email backend (for development, using console backend)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

### `announcements_project/courses/admin.py`

```python title="announcements_project/courses/admin.py"
from django.contrib import admin
from .models import Assignment, Submission, Course

admin.site.register(Assignment)
admin.site.register(Submission)
admin.site.register(Course)
```

### `announcements_project/courses/management/commands/export_courses.py`

```python title="announcements_project/courses/management/commands/export_courses.py"
import csv
from django.core.management.base import BaseCommand
from courses.models import Course

class Command(BaseCommand):
    help = 'Export courses to a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('output_path', type=str, help='The path to the output CSV file')

    def handle(self, *args, **kwargs):
        output_path = kwargs.get('output_path')
        if not output_path:
            self.stdout.write(self.style.ERROR('Please provide an output file path'))
            return

        output_file = F"{output_path}/exported_courses.csv"

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

### `announcements_project/courses/management/commands/import_courses.py`

```python title="announcements_project/courses/management/commands/import_courses.py"
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

        number_of_created_courses = 0
        with open(csv_file, newline='') as file:
            reader = csv.DictReader(file)
            for row in reader:
                course, created = Course.objects.get_or_create(
                    title=row['title'],
                    description=row['description']
                )
                if created:
                    number_of_created_courses += 1

        self.stdout.write(
            self.style.SUCCESS(
                F'Successfully created {number_of_created_courses} courses from {csv_file}'
            )
        )
```

### `announcements_project/courses/management/commands/notify_instructors_new_submissions.py`

```python title="announcements_project/courses/management/commands/notify_instructors_new_submissions.py"
from django.core.management.base import BaseCommand
# import send_mail
from django.core.mail import send_mail

# import the Submission model
from courses.models import Submission


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

### `announcements_project/courses/models.py`

```python title="announcements_project/courses/models.py"
import csv

from django.db import models
from django.conf import settings

from django.utils import timezone
from datetime import datetime

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


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

    # our new field.
    instructor_notified = models.BooleanField(default=False)

    def __str__(self):
        return f"Submission by {self.student_name} for {self.assignment}"
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
                        <a href="{% url 'announcements_list' %}" class="px-4 py-2 mr-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                            Announcements
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

### `home.html`

```html title="home.html"
{% extends 'base.html' %}

{% block content %}

<div class="mt-20 relative isolate pt-14">
  <div class="py-24 sm:py-32 lg:pb-40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">Simple LMS</h1>
        <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">Our basic LMS system</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="{% url 'register' %}" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Get started</a>
        </div>
      </div>
  </div>
  <div aria-hidden="true" class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75 dark:opacity-20"></div>
  </div>
</div>


{% endblock %}
```
