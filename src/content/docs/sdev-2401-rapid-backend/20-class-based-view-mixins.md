---
title: "Lesson 20: Class Based View Mixins"
description: "Notes and starter code: Lesson 20: Class Based View Mixins."
tags: [sdev-2401, django]
sidebar:
  order: 20
---

Last class and example we took a look at the fundamentals of class based views in Django.

In this example we'll be converting our method decorators to use mixin classes instead. This is a more elegant way to handle authentication and permissions in class based views, and it allows us to reuse the same logic across multiple views without having to repeat ourselves.

We'll be using much of the [auth permission mixins here](https://docs.djangoproject.com/en/5.2/topics/auth/default/)

We'll also be refactoring our views to use some of the generic class based views that Django provides, which can help reduce boilerplate code and make our views more concise. This is a bit of a controversial topic in the Django community, but it's good to know how to use them and when to use them.

## Prerequisites
- Create a new virtual environment and install the packages from the `requirements.txt` file.

## Steps

### Step 1:Open the `views.py` file in the `announcements` app and modify the `AnnouncementListView` to use the `LoginRequiredMixin`.

So far in this course we've been using method decorators to handle authentication and permissions in our class based views. While this works, it's not the most elegant solution. It also doesn't allow us to reuse the same logic across multiple views without having to repeat ourselves.

Let's refactor the views in announcements app to use mixin classes instead.

So far we have in our view.
```python
from django.views import View
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect
# import login_required decorator
from django.contrib.auth.decorators import login_required, user_passes_test, permission_required

# ... other imports and is_teacher function ...

@method_decorator(login_required, name='dispatch')
class AnnouncementListView(View):
    template_name = 'announcements/announcement_list.html'

    def get(self, request):
        announcements = Announcement.objects.all().order_by('-created_at')
        return render(
            request,
            self.template_name,
            {'announcements': announcements}
        )

# ... other classes ...
```

Let's refactor this to use the `LoginRequiredMixin` instead of the `login_required` decorator, it does the same thing but this can be a bit cleaner and more reusable.

```python
from django.contrib.auth.mixins import LoginRequiredMixin

class AnnouncementListView(LoginRequiredMixin, View):
    template_name = 'announcements/announcement_list.html'

    def get(self, request):
        announcements = Announcement.objects.all().order_by('-created_at')
        return render(
            request,
            self.template_name,
            {'announcements': announcements}
        )
```
Let's breakdown the changes here:
- We've removed the `method_decorator` and the `login_required` decorator from the class.
- We've imported the `LoginRequiredMixin` from `django.contrib.auth.mixins` [docs for the item here](https://docs.djangoproject.com/en/5.2/topics/auth/default/#the-loginrequiredmixin-mixin)/

That's it really, they perform the exact same way.

Now if you try to access `http://localhost:8000/announcements/` without being logged in, you will be redirected to the login page. If you are logged in, you will see the list of announcements.


### Step 2: Refactor the `AnnouncementCreateView` to use a custom class `IsTeacherRoleMixin` that implements `UserPassesTestMixin` instead of the `user_passes_test` decorator.

So we want to create a mixin that checks to see if the user has a teacher role and if they do they can access the view, otherwise they will be redirected to the login page (the exact same behavior as the `user_passes_test` decorator).

First let's create a new file in the `core` app called `mixins.py` and add the following code to it:

```python
from django.contrib.auth.mixins import UserPassesTestMixin

class IsTeacherRoleMixin(UserPassesTestMixin):
    '''
    Mixin to check if the user has a teacher role. This can be used in any view that requires the user to be a teacher.
    '''

    def test_func(self):
        return self.request.user.is_authenticated and self.request.user.role == 'teacher'

```
So far in our `announcements/views.py` file, we have the following code for the `AnnouncementCreateView`:

```python
# ... imports, views functions ...
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

Now in the `announcements/views.py` file, we can import this mixin and use it in our `AnnouncementCreateView` like this:

```python
# ... other imports ...
from django.contrib.auth.mixins import LoginRequiredMixin
from core.mixins import IsTeacherRoleMixin

# ... other imports and views ...

class CreateAnnouncementView(LoginRequiredMixin, IsTeacherRoleMixin, View):
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
In this refactored code:
- We've removed the `method_decorator` and the `user_passes_test` decorator from
- We've imported the `IsTeacherRoleMixin` from our `core.mixins` module.
- We've added the `IsTeacherRoleMixin` and the `LoginRequiredMixin` to the list of base classes for `CreateAnnouncementView`

Now if you try to access `http://localhost:8000/announcements/create/` without being logged in, you will be redirected to the login page. If you are logged in but do not have a teacher role, you will also be redirected to the login page. If you are logged in and have a teacher role, you will see the create announcement form.

If you haven't already let's create a `403.html` page in the root of the projects `templates` directory with the following content:

```html
{% extends 'base.html' %}
{% block content %}
<div class="max-w-2xl mx-auto px-4 md:px-0">
  <div class="mb-4">

    <h1 class="text-3xl font-bold underline mb-4">
      You do not have permission for this page.
    </h1>
    <p class="display-block text-sm text-gray-500">
      Please contact the administrator if you believe this is a mistake.
    </p>
  </div>
{% endblock %}
```

### Step 3 (challenge): Refactor the `courses` app views to use these mixins as well.

This is to be done as a challenge/exercise for you to practice what you've learned so far. You can use the same mixins we created in the `core.mixins` module to refactor the views in the `courses` app as well.

### Step 4: Let's use some generic class based views so that we can understand how they work.

Generic class views are a bit of a debated topic in the Django community, but they can be very useful for quickly creating views that follow common patterns. They are essentially pre-built class based views that handle common use cases like displaying a list of objects, creating a new object, updating an existing object, etc.

Some folks like them and some don't but it's good to know how they work and how to use them. They can save you a lot of time and boilerplate code if used correctly.

#### 4.1 Let's refactor the `HomeView` to use the `TemplateView` generic class based view.

So far in our `web/views.py` file, we have the following code for the `HomeView`:

```python
from django.shortcuts import render

# Create your views here.
from django.views import View
from django.shortcuts import render

class HomePageView(View):
    template_name = 'web/home.html'

    def get(self, request):
        return render(request, self.template_name)
```

Let's change the `web/views.py` file and modify the `HomeView` to use the `TemplateView` generic class based view instead of the base `View` class.

```python
from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'web/home.html'
```
So basically for template views (no context data) we can just use the `TemplateView` and specify the `template_name` attribute. This will automatically render the specified template when the view is accessed.

#### 4.2 Let's refactor the `AnnouncementListView` to use the `ListView` generic class based view.

We just changed the `AnnouncementListView` to use the `LoginRequiredMixin`, now let's also change it to use the `ListView` generic class based view instead of the base `View` class.

```python
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

# ... other imports ...

class AnnouncementListView(LoginRequiredMixin, ListView):
    model = Announcement
    template_name = 'announcements/announcement_list.html'
    context_object_name = 'announcements'
    ordering = ['-created_at']
```
So Let's breakdown the changes here:
- We've changed the base class from `View` to `ListView`.
- We've specified the `model` attribute to tell the view which model to use for the list of objects.
- We've specified the `template_name` attribute to tell the view which template to use for rendering the list of objects.
- We've specified the `context_object_name` attribute to tell the view what name to use for the list of objects in the template context.
- We've specified the `ordering` attribute to tell the view how to order the list of objects. In this case, we want to order the announcements by their creation date in descending order (newest first).

You can see that there's a lot of implied behaviour here that we don't need to write. You can see here why some people dislike this format, but it can be very useful for quickly creating views that follow common patterns. It's up to you to decide when to use them and when not to use them.

#### 4.3 Let's refactor the `AnnouncementCreateView` to use the `FormView` generic class based view.

Sowe're going to change the behaviour of the `AnnouncementCreateView` to use the `FormView` generic class based view instead of the base `View` class.

We're going to redirect them back to the announcement list view after they create an announcement, so we'll need to specify the `success_url` attribute as well.

```python
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import FormView
# ... other imports ...

class CreateAnnouncementView(LoginRequiredMixin, IsTeacherRoleMixin, FormView):
    template_name = 'announcements/create_announcement.html'
    form_class = AnnouncementForm
    success_url = '/announcements/'

    def form_valid(self, form):
        announcement = form.save(commit=False)
        announcement.created_by = self.request.user
        announcement.save()
        return super().form_valid(form)
```
So you can see here that again there's a lot implied behaviour here that we don't need to write. The `FormView` will automatically handle the GET and POST requests for us, and it will also handle form validation and rendering the form in the template. We just need to specify the `form_class` attribute to tell the view which form to use, and we can override the `form_valid` method to add our custom logic for saving the announcement.

These generic based views are very powerful, but there's a ton of implied behaviour that you need to be aware of when using them. It's important to read the documentation and understand how they work before using them in your projects.

This is why some people dislike them, but they can be very useful for quickly creating views that follow common patterns. It's up to you to decide when to use them and when not to use them.


### Step 5. Let's the `PermissionRequiredMixin` to the `AnnouncementCreateView` so that only users with the `add_announcement` permission can create announcements.

In the admin let's create a `Teacher` group and add the `add_announcement` permission to that group (we did this in the authentication and permissions section). It should look like this:
Then add this permission to a specific user in the admin as shown below:
Note: this is done in the admin for simplicity, but in a real application you would probably want to handle this in your code when creating users and groups.

Now let's modify the `AnnouncementCreateView` to use the `PermissionRequiredMixin` and specify the required permission.

```python
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

# remove the IsTeacherRoleMixin since we're now using permissions instead
class CreateAnnouncementView(LoginRequiredMixin, PermissionRequiredMixin, FormView):
    template_name = 'announcements/create_announcement.html'
    form_class = AnnouncementForm
    success_url = '/announcements/'
    # specify
    permission_required = 'announcements.add_announcement'

    def form_valid(self, form):
        announcement = form.save(commit=False)
        announcement.created_by = self.request.user
        announcement.save()
        return super().form_valid(form)
```
In this refactored code:
- We've removed the `IsTeacherRoleMixin` since we're now using permissions instead.
- We've imported the `PermissionRequiredMixin` from `django.contrib.auth.mixins`.


## Challenge/Exercise

Challenge in step 3 to refactor the views in the `courses` app to use the `LoginRequiredMixin` and the `IsTeacherRoleMixin` that we created in the previous steps.

Create a new mixin called `IsStudentRoleMixin` that checks if the user has a student role and use it in the views that require the user to be a student, create a view that only students can access and test it out.


## Conclusion

In this lesson we refactored our class based views to:
- use mixin classes instead of method decorators for authentication and permissions.
- use generic class based views to reduce boilerplate code and quickly create views that follow common patterns.

This is going to set us up for the next section where we'll be building a REST API using Django Rest Framework, which heavily relies on class based views and mixins for handling authentication, permissions, and common API patterns.


## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `announcements_project/announcements/urls.py`

```python title="announcements_project/announcements/urls.py"
from django.urls import path
from .views import AnnouncementListView, CreateAnnouncementView

urlpatterns = [
    path('', AnnouncementListView.as_view(), name='announcement_list'),
    path('create/', CreateAnnouncementView.as_view(), name='create_announcement'),
]
```

### `announcements_project/announcements/views.py`

```python title="announcements_project/announcements/views.py"
from django.views import View
from django.utils.decorators import method_decorator
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


@method_decorator(login_required, name='dispatch')
class AnnouncementListView(View):
    template_name = 'announcements/announcement_list.html'

    def get(self, request):
        announcements = Announcement.objects.all().order_by('-created_at')
        return render(
            request,
            self.template_name,
            {'announcements': announcements}
        )



# this will restrict access to only users that pass the is_teacher test
# it will redirect to the login page if the user does not have permission.
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
    "courses",
    # new web app
    "web",
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
    path('', include('web.urls')),
    path("admin/", admin.site.urls),
    path('accounts/', include('core.urls')),  # registration view added!
    path('announcements/', include('announcements.urls')),  # announcements app urls
    path('profiles/', include('profiles.urls')),  # profiles app urls
    path('courses/', include('courses.urls')),  # courses app urls
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### `announcements_project/courses/urls.py`

```python title="announcements_project/courses/urls.py"
from django.urls import path

from .views import BulkAssignmentUploadView, AssignmentListView, AssignmentSubmissionView

urlpatterns = [
    path('bulk-assignment-upload/', BulkAssignmentUploadView.as_view(), name='bulk_assignment_upload'),
    path('assignments/', AssignmentListView.as_view(), name='assignment_list'),
    path('assignments/<int:assignment_id>/submit/', AssignmentSubmissionView.as_view(), name='assignment_submission'),
]
```

### `announcements_project/courses/views.py`

```python title="announcements_project/courses/views.py"
from django.views import View
from django.utils.decorators import method_decorator

from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .forms import BulkAssignmentUploadForm
from .models import Assignment


@method_decorator(login_required, name='dispatch')
class AssignmentListView(View):
    template_name = 'courses/assignment_list.html'

    def get(self, request, *args, **kwargs):
        assignments = Assignment.objects.all().order_by('-created_at')
        return render(request, self.template_name, {
            'assignments': assignments,
        })


@method_decorator(login_required, name='dispatch')
class AssignmentSubmissionView(View):
    template_name = 'courses/assignment_submission.html'

    def get(self, request, assignment_id, *args, **kwargs):
        return render(request, self.template_name, {
            'assignment_id': assignment_id,
        })

class BulkAssignmentUploadView(View):
    template_name = 'courses/bulk_assignment_upload.html'
    form_class = BulkAssignmentUploadForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        success = False
        assignments = []
        if form.is_valid():
            csv_file = form.cleaned_data['csv_file']
            assignments = Assignment.create_assignments_from_csv(csv_file, owner=request.user)
            success = True
        return render(request, self.template_name, {
            'form': form,
            'success': success,
            'assignments': assignments,
        })
```

### `announcements_project/profiles/models.py`

```python title="announcements_project/profiles/models.py"
from django.db import models
from django.conf import settings
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL , on_delete=models.CASCADE, related_name="profile"
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", blank=True, null=True
    )

    def __str__(self):
        return f"Profile of {self.user.username}"
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
                <a href="{% url 'home' %}" class="flex text-white text-lg font-semibold">
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
                        <a href="{% url 'announcement_list' %}" class="px-4 py-2 mr-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
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

### `announcements_project/web/admin.py`

```python title="announcements_project/web/admin.py"
from django.contrib import admin

# Register your models here.
```

### `announcements_project/web/apps.py`

```python title="announcements_project/web/apps.py"
from django.apps import AppConfig


class WebConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "web"
```

### `announcements_project/web/models.py`

```python title="announcements_project/web/models.py"
from django.db import models

# Create your models here.
```

### `announcements_project/web/templates/web/home.html`

```html title="announcements_project/web/templates/web/home.html"
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

### `announcements_project/web/urls.py`

```python title="announcements_project/web/urls.py"
from django.urls import path
from .views import HomePageView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
]
```

### `announcements_project/web/views.py`

```python title="announcements_project/web/views.py"
from django.shortcuts import render

# Create your views here.
from django.views import View
from django.shortcuts import render

class HomePageView(View):
    template_name = 'web/home.html'

    def get(self, request):
        return render(request, self.template_name)
```
