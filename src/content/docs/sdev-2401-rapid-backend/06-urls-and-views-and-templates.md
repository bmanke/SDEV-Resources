---
title: "Lesson 06: URLs and Views and Templates"
description: "Notes and starter code: Lesson 06: URLs and Views and Templates."
tags: [sdev-2401, django]
sidebar:
  order: 6
---

In this example we'll be learning how views and urls work togother.

Throughout the course we'll be using an architecture pattern called Model-View-Template (which is very closesly related to Model-View-Controller) that allows us to connect all of our code together while still being organized.

Note these architecture patterns are used for almost every backend framework.

A url is a path to your website that will link to a "view" which is a special django function that you will take in a request and provide a response which will be data passed into a template which will be rendered with that data.


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


### 3. Navigate inside the `urls_views_fundamentals` directory, run the migrations and run the server.
- Migrate all of the changes that we've done so far.
`python manage.py migrate`
- Run the server with the command:
`python manage.py runserver`


### 4. Let's talk about base templates, blocks, inheritance, and how to use them in Django.
- You can see in the templates that we've been using in our project, and any project that has dynamic content, there's a lot of repeated html code.
- Below is a conceptual diagram of the pieces of html that will always be in our templates.
- What we're going to do is create a base template that will have all of the repeated html code, and then we'll create other templates that will extend this base template and fill in the blocks with the content that we want to display.
  - This will allow us to have a consistent look and feel across our website, and also make it easier to update the look and feel of our website in the future.

- Here's the process that we can use to do this with Jinja
  - Create a `base.html` template that will have boilerplate html code.
  - Inside of the `base.html` template, we'll create blocks that will be filled in by the other templates.
    - the syntax is `{% block block_name %}{% endblock %}`.
  - Then inside of our apps when we create a template we will "extend" this base template by using the `{% extends "base.html" %}` tag at the top of the template.
    - Then we can fill in the blocks that we created in the base template by using the `{% block block_name %}{% endblock %}` tag.

### 5. Let's Create a base template and extend it to our templates in the `pet_adoption` app.
- Inside of our project create a new directory called `templates` and inside of that directory create a file called `base.html`.
- Inside of the `base.html` file, add the following code:
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Note we're keeping this out so that it won't get overwritten -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    {% block css_styles %}{% endblock %}
    {% block js_scripts %}{% endblock %}
    <title>
        {% block title %}Pet Adoption App{% endblock %}
    </title>
  </head>
  <body>
    <header>
        {% block header %}{% endblock %}
    </header>
    <main>
        {% block content %}{% endblock %}

    </main>
    <footer>
        {% block footer %}
            <p class="text-center text-gray-500">
                &copy; 2023 Pet Adoption App
            </p>
        {% endblock %}
    </footer>
  </body>
</html>
```
- This has the following blocks:
  - `css_styles`: for adding css styles to the page.
  - `js_scripts`: for adding javascript scripts to the page.
  - `title`: for setting the title of the page.
  - `header`: for adding a header to the page.
  - `content`: for adding the main content of the page.
  - `footer`: for adding a footer to the page.
- Inside of the `urls_views_fundamentals/settings.py` file, add the following line to the `TEMPLATES` setting:
```python
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": ["templates"], # add this line so that our base template can be found
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

```
- Now we can use this template, and we won't need to repeat the same html in every template that we create.


### 6. Let's change our templates in the `pet_adoption` app to extend the base template.
- Open the `pet_adoption/templates/pet_adoption/home_page.html` file and change it to the following:
```html
{% extends "base.html" %}

{% block title %}Welcome to Pet Adoption Matcher{% endblock %}

{% block content %}
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Welcome to the Pet Adoption Matcher!
        </h1>
        <p class="text-lg mb-2">Find your perfect pet match today!</p>
        <!-- New section using jinja templates -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Available Pet Types</h2>
            <ul class="list-disc pl-5">
            {% for pet_type, pet in pet_types.items %}
                <li class="mb-2">
                    <!-- This is the key-->
                    <strong>{{ pet_type }}</strong>
                    <div>
                        <!-- This is the whic hsi a dictionary itself -->
                        {{pet.traits}}
                    </div>
                </li>
            {% endfor %}
            </ul>

        </section>
    </div>
{% endblock %}
```
- Note you can see the change that we've just removed the repeated html code and replaced it with the blocks that we created in the base template.
- Note: if you're getting into an error make sure you have the `base.html` file in the `templates` directory and that the `DIRS` setting in the `TEMPLATES` setting in the `urls_views_fundamentals/settings.py` file is set to `["templates"]`.

- **IMPORTANT NOTE**: If you ever want to keep the contents of a block and then override part of it below you can use the `{{ block.super }}` tag. This will keep the contents of the block and then you can add more content below it. For example:_
```html
{% block content %}
    {{ block.super }}
    <p>This is some additional content that will be added to the content block.</p>
{% endblock %}
```

### 7. Let's change the `pet_adoption/templates/pet_adoption/pet_details.html` template to extend the base template.

- Let's open the `pet_adoption/templates/pet_adoption/pet_details.html` file and change it to the following:
```html
{% extends "base.html" %}

{% block title %}Pet Details - {{ pet.name }}{% endblock %}

{% block content %}
<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold underline">
        Is a {{pet_type}} the right match for you?
    </h1>
    <section>
        {% if pet_data %}
        <h2 class="text-2xl font-semibold mb-4">Pet Details</h2>
        <p class="text-lg mb-2">
            The traits of a {{pet_type}} are: {{pet_data.traits}}
        </p>
        {% else %}
        <p class="text-lg mb-2">
            Sorry, we don't have any information about this pet type.
        </p>
        {% endif %}
    </section>
</div>

{% endblock %}
```

### 8. Let's add a nav bar to the base template and see how the child templates behave.

- Open the `base.html` file and add the following code inside the `<header>` block:
```html
    <!-- ... boilerplate code above ... -->
    <header>
        {% block header %}
            <nav class="bg-gray-800 p-4">
                <div class="max-w-2xl mx-auto flex justify-between items-center">
                    <a href="/" class="text-white text-lg font-semibold">Pet Adoption App</a>
                </div>
            </nav>
        {% endblock %}
    </header>
    <!-- ... boilerplate code below ... -->
```
- This adds a small navbar to the to the page with that links to the home page.
  - if you navigate to the home page you should see the navbar at the top of the page.
  - if you navigate to the pet details page you should see the navbar at the top of the page as well.
  - Hopefully this gives you a better idea what you can do with the base templates.

### 9. Let's add some links using the `url` template tag to the navbar and in our code.
- jinja has a special template tag called `url` that allows us to create links to our views, this is based on the `name` of the views that we create in the `urls.py` file.
- If you open `pet_adoption/urls.py` you can see that we have a view called `home_page` and a view called `pet_type_details`.
```python
from django.urls import path
from .views import home_page, pet_type_details

urlpatterns = [
    path("", home_page, name="home_page"),
    # detail page
    path("pet_type/<str:pet_type>/", pet_type_details, name="pet_type_details"),
]
```
- We can use the `url` template tag to create links to these views in our templates.
- Let's open the `base.html` file and change the `<nav>` block to the following:
```html
{% block header %}
    <nav class="bg-gray-800 p-4">
        <div class="max-w-2xl mx-auto flex justify-between items-center">
            <!-- Jinja URL used!-->
            <a href="{% url 'home_page' %}" class="text-white text-lg font-semibold">Pet Adoption App</a>
        </div>
    </nav>
{% endblock %}
```
- You can see that we've used the `url` template tag to create a link to the `home_page` view, if you test it.

### 10. Let's add a link to the pet details pages in the home page template and add the pet type to the link.
- Remember from the previous step that in `pet_adoption/urls.py` you can see that we have a view called `home_page` and a view called `pet_type_details`.
- Open the `pet_adoption/templates/pet_adoption/home_page.html` file and change the `content` block to the following:
```html
{% block content %}
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Welcome to the Pet Adoption Matcher!
        </h1>
        <p class="text-lg mb-2">Find your perfect pet match today!</p>
        <!-- New section using jinja templates -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Available Pet Types</h2>
            <ul class="list-disc pl-5">
            {% for pet_type, pet in pet_types.items %}
                <li class="mb-2">
                    <!-- Let's add the link-->
                    <a href="{% url 'pet_type_details' pet_type=pet_type %}">
                        <strong>{{ pet_type }}</strong>
                        <div>
                            <!-- This is the whic hsi a dictionary itself -->
                            {{pet.traits}}
                        </div>
                    </a>

                </li>
            {% endfor %}
            </ul>

        </section>
    </div>
{% endblock %}
```
- In the gif below you can see how you can click between links and navigate to the pet details page back and forth.
## Challenge/Exercise
- Create a new template called `about_page.html` that extends the base template and has a title of "About Us" and a content block that has a paragraph about the pet adoption app.
- Add a link to the about page in the navbar in the base template.


## Conclusion
In this example, we learned how to use urls and views together to create a dynamic website. We also learned how to use templates to render data and how to use the `url` template tag to create links to our views.
We also learned how to use base templates to avoid repeating code and how to extend them in our templates. This is a fundamental concept in Django and will be used throughout the course.


## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `home_page.html`

```html title="home_page.html"
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Pet Details</title>
  </head>
  <body>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Welcome to the Pet Adoption Matcher!
        </h1>
        <p class="text-lg mb-2">Find your perfect pet match today!</p>
    </div>
  </body>
</html>
```

### `pet_details.html`

```html title="pet_details.html"
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Pet Details</title>
  </head>
  <body>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Is a PET_TYPE_HERE the right match for you?
        </h1>
    </div>
  </body>
</html>
```

### `urls_views_fundamentals/manage.py`

```python title="urls_views_fundamentals/manage.py"
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "urls_views_fundamentals.settings")
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

### `urls_views_fundamentals/pet_adoption/apps.py`

```python title="urls_views_fundamentals/pet_adoption/apps.py"
from django.apps import AppConfig


class PetAdoptionConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "pet_adoption"
```

### `urls_views_fundamentals/pet_adoption/templates/pet_adoption/home_page.html`

```html title="urls_views_fundamentals/pet_adoption/templates/pet_adoption/home_page.html"
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Django, posts app</title>
  </head>
  <body>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Welcome to the Pet Adoption Matcher!
        </h1>
        <p class="text-lg mb-2">Find your perfect pet match today!</p>
        <!-- New section using jinja templates -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Available Pet Types</h2>
            <ul class="list-disc pl-5">
            <!--
                Last class we saw how to loop through a list.
                Below we loop through a dictionary using the items property.
                The items property returns a list of tuples, where each tuple is a key-value pair.
            -->
            {% for pet_type, pet in pet_types.items %}
                <li class="mb-2">
                    <!-- This is the key-->
                    <strong>{{ pet_type }}</strong>
                    <div>
                        <!-- This is the whic hsi a dictionary itself -->
                        {{pet.traits}}
                    </div>
                </li>
            {% endfor %}
            </ul>

        </section>
    </div>
  </body>
</html>
```

### `urls_views_fundamentals/pet_adoption/templates/pet_adoption/pet_details.html`

```html title="urls_views_fundamentals/pet_adoption/templates/pet_adoption/pet_details.html"
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Pet Details</title>
  </head>
  <body>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold underline">
          Is a {{pet_type}} the right match for you?
        </h1>
        <section>
            {% if pet_data %}
            <h2 class="text-2xl font-semibold mb-4">Pet Details</h2>
            <p class="text-lg mb-2">
                The traits of a {{pet_type}} are: {{pet_data.traits}}
            </p>
            {% else %}
            <p class="text-lg mb-2">
                Sorry, we don't have any information about this pet type.
            </p>
            {% endif %}
        </section>
    </div>
  </body>
</html>
```

### `urls_views_fundamentals/pet_adoption/urls.py`

```python title="urls_views_fundamentals/pet_adoption/urls.py"
from django.urls import path
from .views import home_page, pet_type_details

urlpatterns = [
    path("", home_page, name="home_page"),
    # detail page
    path("pet_type/<str:pet_type>/", pet_type_details, name="pet_type_details"),
]
```

### `urls_views_fundamentals/pet_adoption/views.py`

```python title="urls_views_fundamentals/pet_adoption/views.py"
from django.shortcuts import render

PET_TYPES = {
    'dog': {
        'name': 'Dog',
        'traits': 'Loyal, energetic, needs space and exercise.',
        'lifestyle_fit': 'active'
    },
    'cat': {
        'name': 'Cat',
        'traits': 'Independent, cuddly, low-maintenance.',
        'lifestyle_fit': 'quiet'
    },
    'rabbit': {
        'name': 'Rabbit',
        'traits': 'Gentle, small, requires calm environment.',
        'lifestyle_fit': 'quiet'
    },
    'parrot': {
        'name': 'Parrot',
        'traits': 'Social, intelligent, needs stimulation.',
        'lifestyle_fit': 'social'
    }
}

# Create your views here.
def home_page(request):
    return render(request, "pet_adoption/home_page.html", {"pet_types": PET_TYPES})


# Let's add a new view to handle the pet type details
def pet_type_details(request, pet_type):
    # context
    context = {
        "pet_type": pet_type,
    }
    # let's get the data from the PET_TYPES dictionary or return none if not found
    pet_data = PET_TYPES.get(pet_type, None)

    context["pet_data"] = pet_data

    return render(request, "pet_adoption/pet_details.html", context)
```

### `urls_views_fundamentals/urls_views_fundamentals/asgi.py`

```python title="urls_views_fundamentals/urls_views_fundamentals/asgi.py"
"""
ASGI config for urls_views_fundamentals project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "urls_views_fundamentals.settings")

application = get_asgi_application()
```

### `urls_views_fundamentals/urls_views_fundamentals/settings.py`

```python title="urls_views_fundamentals/urls_views_fundamentals/settings.py"
"""
Django settings for urls_views_fundamentals project.

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
SECRET_KEY = "django-insecure-4&&l!95j28gl)z@i3sfr#0eoapr&xltz)9($&o^wkxk@2@^-qu"

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

    # Custom apps
    "pet_adoption",
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

ROOT_URLCONF = "urls_views_fundamentals.urls"

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

WSGI_APPLICATION = "urls_views_fundamentals.wsgi.application"


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

### `urls_views_fundamentals/urls_views_fundamentals/urls.py`

```python title="urls_views_fundamentals/urls_views_fundamentals/urls.py"
"""
URL configuration for urls_views_fundamentals project.

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

urlpatterns = [
    path("admin/", admin.site.urls),

    # Include the pet_adoption app's URLs
    path("", include("pet_adoption.urls"))
]
```

### `urls_views_fundamentals/urls_views_fundamentals/wsgi.py`

```python title="urls_views_fundamentals/urls_views_fundamentals/wsgi.py"
"""
WSGI config for urls_views_fundamentals project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "urls_views_fundamentals.settings")

application = get_wsgi_application()
```
