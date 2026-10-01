---
title: "Lesson 10: ORM Views with Models Continued"
description: "Notes and starter code: Lesson 10: ORM Views with Models Continued."
tags: [sdev-2401, django]
sidebar:
  order: 10
---

So far we've learned a lot about the Object-Relational Mapping (ORM) in Django, including how to create models, define relationships, and perform basic CRUD operations.

In this example, we will continue exploring the ORM with a focus on views, advanced filtering, and data management.

## Prerequisites
- Create a new virtual environment and install the packages from the `requirements.txt` file.

- Review the last example and concepts.

## Steps

### 1. We're going to load data into a fresh database.
We deleted the database from the last few examples, but we have all of the data in the `clients_data.json` file. We can load this data into our database using the `loaddata` command.

Let's first create our new database by applying the migrations:
```bash
python manage.py migrate
```
Let's create a superuser to access the admin interface:
```bash
python manage.py createsuperuser
```
- Follow the prompts to create a superuser account.

Now we can load the data into our database:
```bash
python manage.py loaddata clients_data.json
```
- This is going to read the `clients_data.json` file and populate our database with the data from that file.

The `clients_data.json` file contains data for the models that we've created in the previous examples. If you want to create one of these files, you can use the `dumpdata` command to create a JSON file from your database:
```bash
python manage.py dumpdata clients > clients_data.json
```
Note you can use the `--indent 2` option to make the JSON file more readable:
```bash
python manage.py dumpdata clients --indent 2 > clients_data.json
```

This is a useful command to create a backup of your database or to share data with others.

### 2. Let's create a few views with our models.
So far in views we haven't fetched specific from the database we've just listed all of the objects in the database. Now we will create views that will fetch specific objects from the database.

Copy company detail `company_detail.html` template from the `templates` directory to your app's `templates/clients` directory.

Open the `views.py` file in your app directory and add the following code:

```python
from django.shortcuts import render, get_object_or_404

from .models import Company

# ... list_companies view ...


def company_detail(request, company_id):
    # fetching a specific company by its ID or returning a 404 error if not found
    company = get_object_or_404(Company, id=company_id)

    return render(request, 'clients/company_detail.html', {'company': company})

```

Let's update the `urls.py` file in your app directory to include the new view:

```python
from django.urls import path
from .views import list_companies, company_detail

urlpatterns = [
    path('companies/', list_companies, name='companies_list'),
    path('company/<int:company_id>/', company_detail, name='company_detail'),
]

```
This will make a view that we can access the company detail page by going to `/company/<company_id>/` in our browser.
- Next we're going to use our knowledge of the orm get the data

### 3. Let's add some data  to the template, using the `company` object we fetched in the view.
Open the `company_detail.html` template in your app's `templates/clients` directory and add the following code:

```html
{% extends "base.html" %}

{% block content %}

<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold underline">
        <!-- title here-->
        {{ company.name }}
    </h1>
    <!-- Information about the company below -->
    <section>
        <h2 class="text-2xl font-semibold mt-4">
            <!-- subtitle here -->
            About {{ company.name }}
        </h2>
        <p class="text-gray-700">
            <!-- description here -->
            {{company.description}}
        </p>
    </section>
</div>

{% endblock %}
```
You can see that we can use the company object from the database to display the company's name and description in the template.

Let's also list all of the employees that work for this company. We can do this by using the `related_name` we set in the `Employee` model.
```html

<section class="mt-6">
    <h2 class="text-2xl font-semibold">Employees</h2>
    <ul class="list-disc pl-5">
        <!-- Loop through the employees in the company -->
        {% for employee in company.employees.all %}
            <li>
                <!-- Display the name -->
                {{ employee.first_name }} {{ employee.last_name }}
                <!-- Display the role of the employee-->
                {% if employee.role %}
                <span class="text-gray-600 font-bold">({{ employee.role }})</span>
                {% else %}
                <span class="text-gray-600 font-bold">(role unknown)</span>
                {%endif %}

                <!-- Display the email -->
                <span class="text-gray-500">({{ employee.email }})</span>

            </li>
        {% empty %}
            <li>No employees found.</li>
        {% endfor %}
    </ul>
</section>
```
Let's breakdown what this does:
- We loop through all of the employees that are related to the company using `company.employees.all` (we don't use the () in the jinja template to call the method).
- We first display the employee's first name and last name. with `{{ employee.first_name }} {{ employee.last_name }}`.
- Next, we check if the employee has a role using `{% if employee.role %}`. If they do, we display their role in parentheses. If they don't have a role, we display "(role unknown)".
- Finally, we display the employee's email address in parentheses using `{{ employee.email }}`.

### 4. Let's add another company using the `loaddata` command so we can do a bit more filtering.

We have a company called "Quantum Solutions" in the the `clients_data_quantum.json` file. Let's load this data into our database using the `loaddata` command:
```bash
python manage.py loaddata clients_data_quantum.json
```

You can access this new company by going to the URL:
`http://localhost:8000/clients/company/10/`


### 5. Let's add a `employees_search_results` view to search for the employees by their first name

Open the `views.py` file in your app directory and add the following code:

```python
# Create your views here.
from .models import Company, Employee

# ... existing views ...

def employees_search_results(request, company_id):
    # this is going to handle the search query for employees
    query = request.GET.get('q', '')
    company = get_object_or_404(Company, id=company_id)

    if query:
        # If a query is provided, filter employees by first name
        # using icontains for case-insensitive search
        # company.employees is a queryset of employees related to the company
         # and we filter it by first_name__icontains=query
         # this will return all employees whose first name contains the query string
        employees = company.employees.filter(
            first_name__icontains=query
         )
    else:
        # If no query is provided, return an empty queryset
        employees = Employee.objects.none()
    # return
    return render(request, 'clients/employees_search_results.html', {'employees': employees, 'query': query})
```
Let's break down what this does:
- we get the search query from the request using `request.GET.get('q', '')`. If no query is provided, it defaults to an empty string.
- If a query is provided, we filter the employees of the company by their first name using `first_name__icontains=query`. This allows for case-insensitive searching.
  - *In SQL, this would translate to a query like `SELECT * FROM employees WHERE first_name LIKE '%query%'`*.
  - Note that There are other filters we can use such as `__exact`, `__iexact`, `__contains`, `__icontains`, `__gt`, `__gte`, `__lt`, `__lte`, and `__in` to filter the data in different ways. Here's a link to the [Django documentation on field lookups](https://docs.djangoproject.com/en/stable/ref/models/querysets/#field-lookups) for more details. Note we'll be using more of these in the future.
- If no query is provided, we return an empty queryset using `Employee.objects.none()`.
  - This is useful to avoid returning all employees when no search term is provided.

Let's update the `urls.py` file in your app directory to include the new view:

```python
from django.urls import path
from .views import list_companies, company_detail, employees_search_results
urlpatterns = [
    path('companies/', list_companies, name='companies_list'),
    path('company/<int:company_id>/', company_detail, name='company_detail'),
    path('company/<int:company_id>/employees/results/', employees_search_results, name='employees_search_results'),
]
```

Let's update the `employees_search_results.html` template in your app's `templates/clients` directory to display the search results:

```html
{% extends 'base.html' %}

{% block content %}
<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold underline">
        <!-- title here-->
        Employees of {{ company.name }}
    </h1>
    <div class="text-lg">search query: {{query}} </div>
    <section>
        <ul class="list-disc pl-5">
            {% for employee in employees %}
                <li class="mb-2">
                    <strong>{{ employee.first_name }} {{ employee.last_name }}</strong>
                    <div>
                        {{ employee.email }}
                    </div>
                    <p>Role: {{employee.role}}</p>

                </li>
            {% endfor %}
        </ul>
</div>

{% endblock %}
```
Now to test this out, you can go to the URL:
- `http://localhost:8000/clients/company/10/employees/results/?q=ma` which should return two results: "Mason Lee" and "Emma Martinez".
`http://localhost:8000/clients/company/10/employees/results/?q=liam` which should return one result: "Liam Nguyen"

### 6. Let's expand the `employees_search_results` view to search for employees by their last name as well.
In django there's a special `Q` object that allows us to create complex queries with OR and AND conditions. We can use this to search for employees by their first name or last name.

```python
# the Q object allows us to create complex queries with OR and AND conditions
from django.db.models import Q

# ... existing imports ...

# ... existing views ...

def employees_search_results(request, company_id):
    query = request.GET.get('q', '')
    company = get_object_or_404(Company, id=company_id)
    if query:
        # Using Q objects to search by first name or last name
        employees = Employee.objects.filter(
            Q(first_name__icontains=query)
            | Q(last_name__icontains=query)
        )
    else:
        employees = Employee.objects.none()

    return render(request, 'clients/employees_search_results.html', {'employees': employees, 'query': query, 'company': company})
```
Let's break down what this does:
- We import the `Q` object from `django.db.models`.
- We use the `Q` object to create a query that searches for employees by their first name or last name using the `|` operator for OR conditions.
- *In SQL, this would translate to a query like `SELECT * FROM employees WHERE first_name LIKE '%query%' OR last_name LIKE '%query%'`*.

Now if you test this url:
- `http://localhost:8000/clients/company/10/employees/results/?q=ar` you should see the resutls for "Gary Smith", "Olvia Garcia", "Ethan Clark" and "Emma Martinez".

## Challenge/Exercise

Create a view for Roles that will allow you to search for employees by their role. You can use the same approach as the `employees_search_results` view, but filter by the `role` field instead.

## Conclusion
In this example, we learned how to:
- Load data into a fresh database using the `loaddata` command.
- Create views to fetch specific objects from the database using `get_object_or_404`.
- Use the `Q` object to create complex queries with OR and AND conditions.
- Filter employees by their first name or last name in a search view.
- Get a deeper understanding of how to use ORM results in a jinja template.

Next we'll be creating forms to allow users to update data in our database while we validate and santize the input before saving it to the database. This will help us ensure that the data we store is valid, consistent and safe.

## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `company_detail.html`

```html title="company_detail.html"
{% extends 'base.html' %}

{% block content %}
<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold underline">
        <!-- title here-->
    </h1>
    <!-- Information about the company below -->
    <section>


    </section>

</div>
{% endblock %}
```

### `employees_search_results.html`

```html title="employees_search_results.html"
{% extends 'base.html' %}

{% block content %}
<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold underline">
        <!-- title here-->
        Employees of
    </h1>
    <div class="text-lg">search query: </div>
    <section>
        <ul class="list-disc pl-5">

        </ul>
</div>

{% endblock %}
```

### `mysoftwarecompany/clients/admin.py`

```python title="mysoftwarecompany/clients/admin.py"
from django.contrib import admin
from .models import Company, Employee, Role

# this is going to add it to the admin interface.
admin.site.register(Company)

admin.site.register(Employee)

admin.site.register(Role)
```

### `mysoftwarecompany/clients/models.py`

```python title="mysoftwarecompany/clients/models.py"
from django.db import models


# This was added from the last example.
class Company(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    # company description
    description = models.TextField(blank=True, null=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    # core fields
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)  # optional field

    # We're going to be adding these quite commonly.
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    # core fields
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)

    # We're going to be adding these quite commonly.
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True)

    # Foreign key relationship to the Company model
    # This creates a many-to-one relationship where each employee belongs to one company
    # the models.CASCADE means that if the company is deleted, all related employees will also be deleted.
    # the related_name allows you to access the employees from the company instance using company.employees.all()
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, blank=True, null=True, related_name='employees')

    def __str__(self):
        # note that you can use self.company to access the str representation of the related Company instance
        return f"{self.first_name} {self.last_name} works at {self.company.name}"


'''
THis is the code for the challenge.

class Department(models.Model):
    name = models.CharField(max_length=100)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, related_name='departments')

class Employee(models.Model):
    # existing fields...
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)
'''
```

### `mysoftwarecompany/clients_data.json`

```json title="mysoftwarecompany/clients_data.json"
[
{
  "model": "clients.company",
  "pk": 1,
  "fields": {
    "name": "Cat Sitting International",
    "email": "cat.sitting@test.com",
    "description": "At Cat Sitting International, we specialize in providing top-tier, globe-spanning, fur-covered companionship for your feline overlords while you're away. Our team of highly trained humans is fluent in over 37 dialects of meow and fully certified in Advanced Laser Pointer Maneuvering.\r\n\r\nWe dont just sitwe worship, entertain, and negotiate with your cat on your behalf. Whether its maintaining the precise sunbeam-to-blanket ratio, ensuring your cats food is arranged in an emotionally acceptable shape, or pretending to enjoy the gift of a freshly murdered sock, weve got it covered.",
    "created_at": "2025-06-09T21:20:57.265Z",
    "updated_at": "2025-06-09T21:20:57.273Z"
  }
},
{
  "model": "clients.company",
  "pk": 2,
  "fields": {
    "name": "Acme Inc.",
    "email": "acme@testing.com",
    "description": "Acme Corporation is the worlds most questionably reliable supplier of gadgets, gizmos, rocket-powered roller skates, and portable black holes. Founded in a puff of smoke sometime in the early cartoon era, Acme has proudly served scheming coyotes, overly ambitious inventors, and chaos-loving customers since day one.\r\n\r\nWhether you're trying to catch a roadrunner, accidentally launch yourself into orbit, or simply want a product that defies physics and common sense, Acme is your one-stop disaster shop. No refunds. No warranties. No logic.",
    "created_at": "2025-06-09T21:20:57.265Z",
    "updated_at": "2025-06-09T21:20:57.273Z"
  }
},
{
  "model": "clients.company",
  "pk": 3,
  "fields": {
    "name": "Tech Innovations",
    "email": "tech.inno@test.com",
    "description": "A leading company in tech innovations.",
    "created_at": "2025-06-09T21:33:31.350Z",
    "updated_at": "2025-06-09T21:33:31.350Z"
  }
},
{
  "model": "clients.role",
  "pk": 1,
  "fields": {
    "name": "CEO",
    "description": "Chief Executive Officer",
    "created_at": "2025-06-10T21:38:39.309Z",
    "updated_at": "2025-06-10T21:38:39.309Z"
  }
},
{
  "model": "clients.role",
  "pk": 2,
  "fields": {
    "name": "Manager",
    "description": "Manages a team of employees",
    "created_at": "2025-06-10T21:38:39.320Z",
    "updated_at": "2025-06-10T21:38:39.320Z"
  }
},
{
  "model": "clients.role",
  "pk": 3,
  "fields": {
    "name": "Developer",
    "description": "Writes code and develops software",
    "created_at": "2025-06-10T21:38:39.325Z",
    "updated_at": "2025-06-10T21:38:39.325Z"
  }
},
{
  "model": "clients.employee",
  "pk": 1,
  "fields": {
    "first_name": "Gary",
    "last_name": "Smith",
    "email": "gary.smith@acmetesting.com",
    "created_at": "2025-06-10T20:29:19.978Z",
    "updated_at": "2025-06-10T21:51:30.100Z",
    "company": 2,
    "role": 1
  }
},
{
  "model": "clients.employee",
  "pk": 2,
  "fields": {
    "first_name": "Alice",
    "last_name": "Johnson",
    "email": "alice.johnson@acmetesting.com",
    "created_at": "2025-06-10T21:18:10.194Z",
    "updated_at": "2025-06-10T21:18:10.194Z",
    "company": 2,
    "role": null
  }
},
{
  "model": "clients.employee",
  "pk": 3,
  "fields": {
    "first_name": "Bob",
    "last_name": "Smith",
    "email": "bob.smith@acmetesting.com",
    "created_at": "2025-06-10T21:27:53.047Z",
    "updated_at": "2025-06-10T21:42:29.838Z",
    "company": 2,
    "role": 1
  }
},
{
  "model": "clients.employee",
  "pk": 4,
  "fields": {
    "first_name": "Diana",
    "last_name": "Prince",
    "email": "diana.prince@catsittesting.com",
    "created_at": "2025-06-10T22:09:15.266Z",
    "updated_at": "2025-06-10T22:09:15.266Z",
    "company": 1,
    "role": 1
  }
},
{
  "model": "clients.employee",
  "pk": 5,
  "fields": {
    "first_name": "Ethan",
    "last_name": "Hunt",
    "email": "ethan.hunt@catsittesting.com",
    "created_at": "2025-06-10T22:09:15.274Z",
    "updated_at": "2025-06-10T22:09:15.274Z",
    "company": 1,
    "role": 2
  }
},
{
  "model": "clients.employee",
  "pk": 6,
  "fields": {
    "first_name": "Fiona",
    "last_name": "Green",
    "email": "fiona.green@catsittesting.com",
    "created_at": "2025-06-10T22:09:15.278Z",
    "updated_at": "2025-06-10T22:09:15.278Z",
    "company": 1,
    "role": 3
  }
}
]
```

### `mysoftwarecompany/clients_data_quantum.json`

```json title="mysoftwarecompany/clients_data_quantum.json"
[
  {
    "model": "clients.company",
    "pk": 10,
    "fields": {
      "name": "Quantum Solutions",
      "email": "info@quantumsolutions.com",
      "description": "Quantum Solutions is a cutting-edge tech company specializing in quantum computing and AI research.",
      "created_at": "2025-06-11T10:00:00.000Z",
      "updated_at": "2025-06-11T10:00:00.000Z"
    }
  },
  {
    "model": "clients.employee",
    "pk": 20,
    "fields": {
      "first_name": "Liam",
      "last_name": "Nguyen",
      "email": "liam.nguyen@quantumsolutions.com",
      "created_at": "2025-06-11T10:01:00.000Z",
      "updated_at": "2025-06-11T10:01:00.000Z",
      "company": 10,
      "role": 1
    }
  },
  {
    "model": "clients.employee",
    "pk": 21,
    "fields": {
      "first_name": "Sophia",
      "last_name": "Patel",
      "email": "sophia.patel@quantumsolutions.com",
      "created_at": "2025-06-11T10:02:00.000Z",
      "updated_at": "2025-06-11T10:02:00.000Z",
      "company": 10,
      "role": 2
    }
  },
  {
    "model": "clients.employee",
    "pk": 22,
    "fields": {
      "first_name": "Noah",
      "last_name": "Kim",
      "email": "noah.kim@quantumsolutions.com",
      "created_at": "2025-06-11T10:03:00.000Z",
      "updated_at": "2025-06-11T10:03:00.000Z",
      "company": 10,
      "role": 3
    }
  },
  {
    "model": "clients.employee",
    "pk": 23,
    "fields": {
      "first_name": "Olivia",
      "last_name": "Garcia",
      "email": "olivia.garcia@quantumsolutions.com",
      "created_at": "2025-06-11T10:04:00.000Z",
      "updated_at": "2025-06-11T10:04:00.000Z",
      "company": 10,
      "role": 2
    }
  },
  {
    "model": "clients.employee",
    "pk": 24,
    "fields": {
      "first_name": "Mason",
      "last_name": "Lee",
      "email": "mason.lee@quantumsolutions.com",
      "created_at": "2025-06-11T10:05:00.000Z",
      "updated_at": "2025-06-11T10:05:00.000Z",
      "company": 10,
      "role": 3
    }
  },
  {
    "model": "clients.employee",
    "pk": 25,
    "fields": {
      "first_name": "Emma",
      "last_name": "Martinez",
      "email": "emma.martinez@quantumsolutions.com",
      "created_at": "2025-06-11T10:06:00.000Z",
      "updated_at": "2025-06-11T10:06:00.000Z",
      "company": 10,
      "role": 1
    }
  },
  {
    "model": "clients.employee",
    "pk": 26,
    "fields": {
      "first_name": "Lucas",
      "last_name": "Brown",
      "email": "lucas.brown@quantumsolutions.com",
      "created_at": "2025-06-11T10:07:00.000Z",
      "updated_at": "2025-06-11T10:07:00.000Z",
      "company": 10,
      "role": 2
    }
  },
  {
    "model": "clients.employee",
    "pk": 27,
    "fields": {
      "first_name": "Ava",
      "last_name": "Wilson",
      "email": "ava.wilson@quantumsolutions.com",
      "created_at": "2025-06-11T10:08:00.000Z",
      "updated_at": "2025-06-11T10:08:00.000Z",
      "company": 10,
      "role": 3
    }
  },
  {
    "model": "clients.employee",
    "pk": 28,
    "fields": {
      "first_name": "Ethan",
      "last_name": "Clark",
      "email": "ethan.clark@quantumsolutions.com",
      "created_at": "2025-06-11T10:09:00.000Z",
      "updated_at": "2025-06-11T10:09:00.000Z",
      "company": 10,
      "role": 2
    }
  },
  {
    "model": "clients.employee",
    "pk": 29,
    "fields": {
      "first_name": "Mia",
      "last_name": "Davis",
      "email": "mia.davis@quantumsolutions.com",
      "created_at": "2025-06-11T10:10:00.000Z",
      "updated_at": "2025-06-11T10:10:00.000Z",
      "company": 10,
      "role": 3
    }
  }
]
```

### `mysoftwarecompany/employees_to_add.py`

```python title="mysoftwarecompany/employees_to_add.py"
new_employees_data_acme = [
    {
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice.johnson@acmetesting.com",
        "company": "Acme",
    },
    {
        "first_name": "Bob",
        "last_name": "Smith",
        "email": "bob.smith@acmetesting.com",
        "company": "Acme",
    },
    {
        "first_name": "Charlie",
        "last_name": "Brown",
        "email": "charlie.brown@acmetesting.com",
        "company": "Acme",
    },

]

# for the second part.
new_employees_data_cat_sitting_int = [
    {
        "first_name": "Diana",
        "last_name": "Prince",
        "email": "diana.prince@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "CEO",
    },
    {
        "first_name": "Ethan",
        "last_name": "Hunt",
        "email": "ethan.hunt@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "Manager",
    },
    {
        "first_name": "Fiona",
        "last_name": "Green",
        "email": "fiona.green@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "Developer",
    },
]
```

### `mysoftwarecompany/load_employees.py`

```python title="mysoftwarecompany/load_employees.py"
import os
import django

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysoftwarecompany.settings')
django.setup()

# Note place your imports below and do not remove the above lines
##### YOUR CODE BELOW THIS LINE #####


from clients.models import Employee, Company, Role

# for the second part.
new_employees_data_cat_sitting_int = [
    {
        "first_name": "Diana",
        "last_name": "Prince",
        "email": "diana.prince@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "CEO",
    },
    {
        "first_name": "Ethan",
        "last_name": "Hunt",
        "email": "ethan.hunt@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "Manager",
    },
    {
        "first_name": "Fiona",
        "last_name": "Green",
        "email": "fiona.green@catsittesting.com",
        "company": "Cat Sitting International",
        "role": "Developer",
    },
]
def main():

    for employee_data in new_employees_data_cat_sitting_int:
        # Get or create the company
        company, created = Company.objects.get_or_create(name=employee_data["company"])

        # Get or create the role
        role, created = Role.objects.get_or_create(name=employee_data["role"])

        # Create the employee
        employee, created = Employee.objects.get_or_create(
            first_name=employee_data["first_name"],
            last_name=employee_data["last_name"],
            email=employee_data["email"],
            company=company,
            role=role,
        )
        if created:
            # If the employee was created, print a message
            print(f"Created new employee: {employee}")
        else:
            # If the employee already exists, print a message
            print(f"Employee: {employee} already exists, skipping creation.")


if __name__ == "__main__":
    main()
    print("All employees have been processed.")
```
