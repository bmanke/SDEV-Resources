---
title: "Lesson 04: Intro to Templates"
description: "Notes and starter code: Lesson 04: Intro to Templates."
tags: [sdev-2401, django]
sidebar:
  order: 4
---

In this example we'll take a look at some of the fundamentals of Jinja2 templating.

Although we're using Jinja2 the concepts are similar to most of the templating engines that are used in backend web development.

Jinja2 is not only use for django but is also used in other languages and frameworks like Flask, FastAPI, etc.
It's also used in other areas of development like devops/infrastructure as code, email, and document generation.

## Steps

### 1. Create a virtual envirnment and install Django
`python -m venv ./venv`

activate the virtual environment:
- linux/mac: `source ./venv/bin/activate`
- windows: `.\venv\Scripts\activate`

### 2. Install the requirements for the project from the requirements.txt file:
- check that you don't have the requirements installed already:
`pip freeze` this should show nothing if you just created the virtual environment.
- install the requirements:
`pip install -r requirements.txt`
- check that you have the requirements installed:
`pip freeze` this should show the requirements that are installed in the virtual environment.

### 3. Navigate inside the `templateintro` directory and render variables in a template in the shell.
- Templates are what we use to render the data to the user, we're using jinja2 for this. There's a few core concepts that we need to understand for this example:
  - Variable rendering done like so: `{{ variable_name }}`
  - Script actions, conditionals and loops:
    - `{% if condition %}` and `{% endif %}` for conditionals.
    - `{% for item in list %}` and `{% endfor %}` for loops.
    - `{% debug %}` to see all context variables available in the template, note this will be handy for debugging.
  - Filters. For example: `{{ variable_name | filter_name }}`.
    - Filters are used to modify the data before rendering it, this would be like modifying date formats, or modifying strings (to uppercase, etc.)
  - Comments, these are used to add comments to the template that won't be rendered to the user. For example: `{# this is a comment #}`.
  - (In a future examples) we'll talk about template inheritance and how to use blocks to extend templates.
- Open the shell with `python manage.py shell` and create a template in the shell:
```python
# Import the Template class and Context from django.
from django.template import Template, Context

data = {
    "rating_topic": "movie",
    "best_rating": 10,
    "worst_rating": 0,
}
# template using jinja2 syntax to render a single variable
template = Template("""
{{ rating_topic }} ratings from {{ worst_rating }} to {{ best_rating }}

""")
# the data we're passing to the template
context = Context(data)

# render the template
print(template.render(context))
```
- This should print out `movie ratings from 0 to 10` to the console.
- Note: change the `data` dictionary to the following and see what happens:
```python
data = {
    "rating_topic": "book",
    "best_rating": 5,
    "worst_rating": 1,
}
```
- This should print out `book ratings from 1 to 5` to the console.

### 4. Let's add an array to our data and render it in the template.
- We're going to add a list of books, with a rating, title and author to the data dictionary.
```python
data = {
    "rating_topic": "Book",
    "best_rating": 5,
    "worst_rating": 1,
    "items": [
        {"title": "Brave New World", "rating": 4},
        {"title": "1984",  "rating": 5},
        {"title": "The Great Gatsby", "rating": 4},
        {"title": "Twilight", "rating": 1},
    ]
}
```
- Let's expand our template to render the list of books.
```python
# ... data dictionary from above ...
# template using jinja2 syntax to render a single variable
template = Template("""
{{ rating_topic }} ratings from {{ worst_rating }} to {{ best_rating }}

{% for item in items %}
    {{ item.title }} - {{ item.rating }}
{% endfor %}
""")

context = Context(data)

# render the template
print(template.render(context))
```
- You can observe that the output of the template is now a list of books with their title, author and rating.
```
book ratings from 1 to 5


    Brave New World - 4

    1984 - 5

    The Great Gatsby - 4

    Twilight - 1
```

- Note: change the `data` dictionary to the following and see what happens:
```python
data = {
    "rating_topic": "movie",
    "best_rating": 10,
    "worst_rating": 0,
    "items": [
        {"title": "The Matrix", "rating": 9},
        {"title": "Inception", "rating": 8},
        {"title": "The Godfather", "rating": 10},
        {"title": "Twilight", "rating": 1},
    ]
}
```
- This should print out `movie ratings from 0 to 10` to the console.
```
Movies Ratings from 0 to 10


    The Matrix - 9

    Inception - 8

    The Godfather - 10

    Twilight - 1
```
- There's a couple of other things we can add to our templates because for loops have special variables that are available to us.
  - `forloop.counter` is the index of the current item in the loop, starting at 1. `forloop.revcounter` is the reverse index of the current item in the loop, starting at 1.
  - `forloop.counter0` is the index of the current item in the loop, starting at 0. `forloop.revcounter0` is the reverse index of the current item in the loop, starting at 0.
  - `forloop.first` is a boolean that is true if the current item is the first item in the loop. `forloop.last` is a boolean that is true if the current item is the last item in the loop.
- Below we can see an example of how to use these variables in the template
```python
template = Template("""
{{ rating_topic }} ratings from {{ worst_rating }} to {{ best_rating }}

{% for item in items %}
   {{forloop.counter}}. {{ item.title }} - {{ item.rating }}
{% endfor %}
""")
```
- This should print out the following:
```
Movies ratings from 0 to 10


   1. The Matrix - 9

   2. Inception - 8

   3. The Godfather - 10

   4. Twilight - 1
```
### Let's add some conditionals to our template.
- We're going to add a contional to our template to see if `rating_topic` is well reviewed or not.
- We'll be using the template tags `{% if %}`, `{% elif %}`, and `{% else %}` to do this.
```python
template = Template("""
{{ rating_topic }} ratings from {{ worst_rating }} to {{ best_rating }}

{% for item in items %}
   {% if item.rating == best_rating %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Well Reviewed
   {% elif item.rating == worst_rating %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Poorly Reviewed
   {% else %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Reviews we're not bad.
   {% endif %}
{% endfor %}
""")
```
- This should print out the following (except with a lot more whitespace between the lines):
```
Movies ratings from 0 to 10
    1. The Matrix - 9 - Reviews we're not bad.
    2. Inception - 8 - Reviews we're not bad.
    3. The Godfather - 10 - Well Reviewed
    4. Twilight - 1 - Reviews we're not bad.
```
- Note the whitespace in the output, this is because of the whitespace in the template, because all of the lines are taken into account when rendering the template. This is less important when you're using html, but is a consideration when you're using other formats.
  - You can fix this by making this on a single line, or by using the `strip` filter to remove the whitespace from the template.

### 5. Debugging the template when you're stuck.
- If you're ever stuck when debugging a template you can use the `{% debug %}` tag to see all of the context variables that are available in the template.
- Let's add this to our template and see what happens
```python
template = Template("""
{{ rating_topic }} ratings from {{ worst_rating }} to {{ best_rating }}

{% for item in items %}
   {% if item.rating == best_rating %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Well Reviewed
   {% elif item.rating == worst_rating %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Poorly Reviewed
   {% else %}
       {{forloop.counter}}. {{ item.title }} - {{ item.rating }} - Reviews we're not bad.
   {% endif %}
{% endfor %}

Debugging the template:
{% debug %}
""")
```
- The output of the template should have a lot of information about the context variables, this will be much more useful when you're using this in a web application, but is still useful in the shell.

## Conclusion

In this example we took a look at some of the fundamentals of Jinja2 templating.
  - We learned how to render variables in a template.
  - We learned how to use conditionals and loops in a template.

This is going to be critical in the next couple of classes once we these templates in the views, we'll go over more templating after learning some views and urls.


## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `requirements.txt`

```text title="requirements.txt"
asgiref==3.8.1
Django==5.2.1
sqlparse==0.5.3
tzdata==2025.2
```

### `templateintro/manage.py`

```python title="templateintro/manage.py"
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "templateintro.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
```

### `templateintro/templateintro/asgi.py`

```python title="templateintro/templateintro/asgi.py"
"""
ASGI config for templateintro project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "templateintro.settings")

application = get_asgi_application()
```

### `templateintro/templateintro/settings.py`

```python title="templateintro/templateintro/settings.py"
"""
Django settings for templateintro project.

Generated by 'django-admin startproject' using Django 5.2.1.

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
SECRET_KEY = "django-insecure-bm$%m8njp(o6q$2%!)$-pjt295@py^0rzz^x1avgs4swm9^ed="

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

ROOT_URLCONF = "templateintro.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

WSGI_APPLICATION = "templateintro.wsgi.application"


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


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
```

### `templateintro/templateintro/urls.py`

```python title="templateintro/templateintro/urls.py"
"""
URL configuration for templateintro project.

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
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
]
```

### `templateintro/templateintro/wsgi.py`

```python title="templateintro/templateintro/wsgi.py"
"""
WSGI config for templateintro project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "templateintro.settings")

application = get_wsgi_application()
```
