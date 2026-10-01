---
title: "Djoser Demo"
description: "Notes and starter code: Djoser Demo."
tags: [sdev-2401, django]
sidebar:
  order: 26
---

### A Student Guide

---

## Introduction & Big Picture

So far in this course every view you have built returns an HTML page. A browser requests a URL, Django renders a template, and the browser displays it. This works great for traditional websites.

But what if you want to build a **mobile app** that needs data from your Django backend? Or a **React frontend** that handles all the display itself and just needs raw data? In those cases, sending back a full HTML page is wasteful — the client does not need the HTML, it just needs the data.

This is what a **REST API** is for. Instead of returning HTML, your Django backend returns **JSON data**. Any client — a browser running React, an iOS app, an Android app, another server — can consume that data and display it however it wants.

This lesson builds an Event Management API where users can register, log in, create events, and manage talks. You will learn:

- How token authentication works and why APIs use it instead of sessions
- How to use **Djoser** to get user registration and login endpoints for free
- How to write custom serializers to control what data is exposed
- How to protect endpoints so only users with the right role can access them
- How `ModelViewSet` gives you a full CRUD API in three lines

---

## Part 1: Concepts Before Code

### Template-Based Django vs REST API Django

| | Template-Based | REST API |
|---|---|---|
| **What the server returns** | A full HTML page | JSON data |
| **Who renders the UI** | Django (via templates) | The client (React, mobile app, etc.) |
| **Authentication** | Session cookie in browser | Token in `Authorization` header |
| **Who uses it** | Browsers only | Any client — browser, mobile, another server |
| **What we've built so far** | All of our views | What we're building now |

### What Is Token Authentication?

In earlier lessons you used **session-based authentication**. When you logged in, Django stored your identity in a session on the server and gave your browser a cookie. Every request your browser made included that cookie, and Django used it to identify you.

API clients like mobile apps do not manage cookies the same way browsers do. **Token authentication** is simpler and more universal:

```
1. Client sends username + password to /v1/auth/token/login/
        |
        v
2. Server verifies credentials and returns a token string:
   { "auth_token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" }
        |
        v
3. Client stores the token (in memory, local storage, etc.)
        |
        v
4. Every subsequent request includes the token in a header:
   Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
        |
        v
5. Server reads the header, looks up the token in the database,
   identifies the user, and processes the request
```

The token is just a long random string. It acts like a password for the session — whoever has it can make requests as that user. This is why you should:
- Never expose tokens in URLs (they would appear in server logs)
- Always use HTTPS in production so tokens cannot be intercepted
- Have a logout endpoint that deletes the token from the database

### What Is Djoser?

Building user registration, login, logout, password reset, and profile management from scratch is repetitive work that every API needs. **Djoser** is a package that provides all of these as ready-made endpoints built on top of Django REST Framework.

Instead of writing a registration view, a login view, a logout view, and all their serializers yourself, you install Djoser and add two lines to your `urls.py`. It handles:

- `POST /v1/auth/users/` — register a new user
- `POST /v1/auth/token/login/` — log in and get a token
- `POST /v1/auth/token/logout/` — log out and delete the token
- `GET /v1/auth/users/me/` — get the current user's profile
- And more — password change, password reset, etc.

### What Is an HTTP Header?

When your browser makes a request to a server, it sends more than just the URL. It also sends **headers** — key-value pairs that provide extra information about the request.

You have seen one header already: `Content-Type: application/json` tells the server that the request body is JSON.

The `Authorization` header is how we send our token:

```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

The format is always: the word `Token`, a space, then the token string. DRF reads this header on every request, strips out the token string, looks it up in the database, and if found, sets `request.user` to the corresponding user — exactly like session authentication does, just via a different mechanism.

In Postman you set this in the Headers tab:
- Key: `Authorization`
- Value: `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

---

## Part 2: Project Setup

### The Project Structure

This project has two apps already set up:

**`core` app:**
- A custom `User` model extending Django's `AbstractUser` with extra fields: `role` (organizer/presenter), `full_name`, `bio`, `status`
- An `IsOrganizer` permission class — a custom DRF permission that only allows users with `role == 'organizer'`

**`events` app:**
- `Event` model — name, description, location, start date, end date
- `Talk` model — belongs to an event, has title, speaker name, status, and scheduled time

### Step 1: Install Djoser

```bash
pip install djoser
```

This also installs `djangorestframework` as a dependency.

### Step 2: Update `INSTALLED_APPS` in `settings.py`

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third-party
    "rest_framework",
    "rest_framework.authtoken",
    "djoser",
    # local
    "core",
    "events",
]
```

**`rest_framework`** — Django REST Framework itself. Provides serializers, views, routers, permissions, and all the tools for building APIs.

**`rest_framework.authtoken`** — A DRF sub-app that creates a `Token` database table. Each token row links a random string to a user. When you run migrations after adding this, Django creates the `authtoken_token` table.

**`djoser`** — The Djoser package. Adds the ready-made authentication endpoints.

### Step 3: Configure DRF in `settings.py`

Add this below `AUTH_USER_MODEL`:

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}
```

**`DEFAULT_AUTHENTICATION_CLASSES`** — Tells DRF how to identify who is making a request. `TokenAuthentication` means DRF will look for the `Authorization: Token ...` header on every request and use it to find the user.

**`DEFAULT_PERMISSION_CLASSES`** — Tells DRF who is allowed to make requests. `IsAuthenticated` means only users who have successfully authenticated (sent a valid token) can access any endpoint. This is applied globally — you can override it on individual views when you need different behaviour.

Think of authentication as answering "who are you?" and permissions as answering "are you allowed to do this?". They are two separate steps.

### Step 4: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

This creates the `authtoken_token` table that stores the tokens.

---

## Part 3: Djoser URL Configuration

### Step 5: Add Djoser URLs to `urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/auth/", include("djoser.urls")),
    path("v1/auth/", include("djoser.urls.authtoken")),
]
```

**`djoser.urls`** — Provides user management endpoints: register, view profile, update profile, change password. These work regardless of how you authenticate.

**`djoser.urls.authtoken`** — Provides the token-specific endpoints: `token/login/` and `token/logout/`. These are separate because Djoser also supports JWT authentication — if you were using JWT you would include `djoser.urls.jwt` instead.

Both are included under the same `v1/auth/` prefix, so the URLs end up as `/v1/auth/users/`, `/v1/auth/token/login/`, etc.

### Step 6: Create a Superuser and Test Login

```bash
python manage.py createsuperuser
python manage.py runserver
```

In Postman, send a POST request to log in:

- **URL:** `http://localhost:8000/v1/auth/token/login/`
- **Method:** POST
- **Body (raw JSON):**
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

You should receive:
```json
{
    "auth_token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
}
```

Copy this token — you will use it in every subsequent request.

### Step 7: Test a Protected Endpoint

Now test an endpoint that requires authentication:

- **URL:** `http://localhost:8000/v1/auth/users/me/`
- **Method:** GET
- **Headers:**
  - Key: `Authorization`
  - Value: `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

You should receive your user details:
```json
{
    "email": "admin@example.com",
    "id": 1,
    "username": "admin"
}
```

Notice only the basic fields appear — `email`, `id`, `username`. Our custom fields (`role`, `full_name`, `bio`, `status`) are missing. That is because Djoser uses its own default serializer which only knows about the standard Django user fields. We need to tell it about our custom ones.

---

## Part 4: Custom Serializers

### Why We Need Custom Serializers

Djoser's default serializers only include the fields on Django's built-in `User` model. Our `User` model extends `AbstractUser` with additional fields. We need to extend Djoser's serializers to include those fields.

### Step 8: Update `core/serializers.py`

```python
from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import User


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "username", "password", "email", "role", "full_name", "bio", "status")


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ("id", "username", "email", "role", "full_name", "bio", "status")
```

We import Djoser's `UserCreateSerializer` and `UserSerializer`, then extend them with our own classes. Notice we use different names — `CustomUserCreateSerializer` and `CustomUserSerializer` — so there is no confusion between the parent class we are importing and the child class we are defining.

**`CustomUserCreateSerializer`** — Used during registration (POST to `/v1/auth/users/`). It includes `password` because the user needs to provide one when signing up. We inherit from Djoser's version and extend the `Meta` class to add our custom fields.

**`CustomUserSerializer`** — Used when displaying user data (GET to `/v1/auth/users/me/`). It does not include `password` — we never want to send password data back to the client, even hashed. We inherit Djoser's Meta class so we keep any configuration it sets, and only change `model` and `fields`.

**`class Meta(UserCreateSerializer.Meta):`** — This inherits the parent's `Meta` class. Any configuration already on Djoser's `Meta` (like validators) is preserved. We then override just the fields we want to change.

### Step 9: Configure Djoser to Use the Custom Serializers

Add this to `settings.py` below `REST_FRAMEWORK`:

```python
DJOSER = {
    "USER_ID_FIELD": "username",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "SERIALIZERS": {
        "user_create": "core.serializers.CustomUserCreateSerializer",
        "user": "core.serializers.CustomUserSerializer",
        "current_user": "core.serializers.CustomUserSerializer",
    },
}
```

**`USER_ID_FIELD`** — Tells Djoser which field uniquely identifies a user in URL patterns. Setting it to `"username"` means user-specific URLs use the username rather than the numeric ID.

**`USER_CREATE_PASSWORD_RETYPE`** — Requires users to enter their password twice during registration. This is a common UX pattern to prevent typos. When this is `True`, your registration request must include both `"password"` and `"re_password"` — if they do not match, Djoser returns a validation error.

**`SERIALIZERS`** — A dictionary mapping Djoser's internal serializer names to your custom serializer classes using dotted import paths. The three keys here are:
- `"user_create"` — used when registering a new user
- `"user"` — used when viewing a user's profile
- `"current_user"` — used specifically for the `/users/me/` endpoint

### Step 10: Test Registration and Profile

**Register a new organizer:**

- **URL:** `http://localhost:8000/v1/auth/users/`
- **Method:** POST
- **Body (raw JSON):**
```json
{
    "username": "organizer1",
    "password": "samplepassword",
    "re_password": "samplepassword",
    "email": "organizer1@test.com",
    "role": "organizer",
    "full_name": "Alex Organizer",
    "bio": "Event organizer and tech enthusiast.",
    "status": "active"
}
```

**Register a presenter too** — you will need both roles for testing permissions later:

```json
{
    "username": "presenter1",
    "password": "samplepassword",
    "re_password": "samplepassword",
    "email": "presenter1@test.com",
    "role": "presenter",
    "full_name": "Sam Presenter",
    "bio": "Speaker and developer.",
    "status": "active"
}
```

Now log in as each user (same as Step 6) and save both tokens. Then test `/v1/auth/users/me/` with each token — you should now see all the custom fields in the response.

---

## Part 5: Events API

### Step 11: Load Demo Data

Look at `events/management/commands/load_demo_data.py`, find the TODO for `event3`, and uncomment the code for the "REST API Summit" and its associated talk. Then run:

```bash
python manage.py load_demo_data
```

### Step 12: Create Serializers for Events and Talks

Update `events/serializers.py`:

```python
from rest_framework import serializers
from .models import Event, Talk


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("id", "name", "description", "location", "start_date", "end_date")


class TalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ("id", "event", "title", "description", "speaker_name", "status", "scheduled_time")
```

`ModelSerializer` automatically generates serializer fields based on the model's field definitions — the same concept as `ModelForm` but for APIs. You specify the model and which fields to include, and DRF handles the rest.

### Step 13: Create the `EventAPIView`

In `events/views.py`:

The imports are already provided for you in the start project. Add the `EventAPIView` class:

```python
class EventAPIView(APIView):

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsOrganizer()]
        return [IsAuthenticated()]

    def get(self, request, pk=None):
        if pk:
            try:
                event = Event.objects.get(pk=pk)
            except Event.DoesNotExist:
                return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = EventSerializer(event)
            return Response(serializer.data, status=status.HTTP_200_OK)

        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### Breaking Down `get_permissions()`

```python
def get_permissions(self):
    if self.request.method == "POST":
        return [IsOrganizer()]
    return [IsAuthenticated()]
```

`get_permissions()` is a method on `APIView` that DRF calls to determine what permissions apply to the current request. By overriding it you can apply different permissions based on the HTTP method — in this case:

- POST requests (creating an event) require `IsOrganizer`
- All other requests (GET) only require `IsAuthenticated`

The return value is a **list of permission instances** — notice `IsOrganizer()` with parentheses, not just `IsOrganizer`. DRF calls `.has_permission()` on each instance in the list. If any returns `False`, the request is denied.

This is the API equivalent of what `user_passes_test` did in template-based views — restricting access based on the user's attributes — but applied per HTTP method rather than per view.

### Step 14: Add URL Patterns for Events

Update `events/urls.py`:

```python
from django.urls import path
from .views import EventAPIView

urlpatterns = [
    path("events/", EventAPIView.as_view(), name="event-list-create"),
    path("events/<int:pk>/", EventAPIView.as_view(), name="event-detail"),
]
```

Include this in the main `urls.py`:

```python
urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/auth/", include("djoser.urls")),
    path("v1/auth/", include("djoser.urls.authtoken")),
    path("v1/api/", include("events.urls")),
]
```

### Step 15: Test the Events API

**GET all events** (any authenticated user):
- URL: `http://localhost:8000/v1/api/events/`
- Method: GET
- Headers: `Authorization: Token your_token`

**GET a specific event:**
- URL: `http://localhost:8000/v1/api/events/1/`
- Method: GET
- Headers: `Authorization: Token your_token`

**POST create a new event as organizer** (should succeed):
- URL: `http://localhost:8000/v1/api/events/`
- Method: POST
- Headers: `Authorization: Token your_organizer_token`
- Body:
```json
{
    "name": "New Tech Conference",
    "description": "A conference about emerging technologies.",
    "location": "Montreal, QC",
    "start_date": "2025-11-01",
    "end_date": "2025-11-03"
}
```
Expected response: `201 Created` with the new event data.

**POST create a new event as presenter** (should fail):
- Same request but use your presenter token
- Expected response: `403 Forbidden`

---

## Part 6: ModelViewSet

### APIView vs ModelViewSet

The `EventAPIView` required us to write `get()` and `post()` methods manually. For the `Talk` model we need all the standard CRUD operations — list, retrieve, create, update, partial update, delete. Writing all of those methods by hand would be repetitive.

`ModelViewSet` is a DRF shortcut that provides all of these automatically:

| HTTP Method | URL | Action | What it does |
|---|---|---|---|
| GET | `/talks/` | `list` | Return all talks |
| POST | `/talks/` | `create` | Create a new talk |
| GET | `/talks/1/` | `retrieve` | Return one talk |
| PUT | `/talks/1/` | `update` | Fully replace a talk |
| PATCH | `/talks/1/` | `partial_update` | Partially update a talk |
| DELETE | `/talks/1/` | `destroy` | Delete a talk |

All six of these come for free from three lines of configuration.

### Step 16: Create the `TalkViewSet`

Add this to `events/views.py`:

```python
class TalkViewSet(viewsets.ModelViewSet):
    queryset = Talk.objects.all()
    serializer_class = TalkSerializer
    permission_classes = [IsAuthenticated]
```

- **`queryset`** — The base queryset. `ModelViewSet` uses this to fetch objects. For list it returns all of them; for retrieve/update/delete it filters by the primary key from the URL.
- **`serializer_class`** — Which serializer to use for converting data to and from JSON.
- **`permission_classes`** — Applied to all actions on this viewset. Any authenticated user can perform any CRUD operation on talks.

### Step 17: Register the ViewSet with a Router

The `EventAPIView` needed manual URL patterns. ViewSets use a **Router** to generate URL patterns automatically.

Update `events/urls.py` to import `TalkViewSet`, create a router, and include the router URLs:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventAPIView, TalkViewSet

router = DefaultRouter()
router.register(r"talks", TalkViewSet, basename="talk")

urlpatterns = [
    path("events/", EventAPIView.as_view(), name="event-list-create"),
    path("events/<int:pk>/", EventAPIView.as_view(), name="event-detail"),
    path("", include(router.urls)),
]
```

`router.register(prefix, viewset, basename)` tells the router:
- `r"talks"` — the URL prefix for all talk endpoints
- `TalkViewSet` — which viewset to use
- `basename="talk"` — used to generate URL names like `talk-list` and `talk-detail`

The router generates these URL patterns automatically:

```
/talks/           GET  → TalkViewSet.list()
/talks/           POST → TalkViewSet.create()
/talks/{id}/      GET  → TalkViewSet.retrieve()
/talks/{id}/      PUT  → TalkViewSet.update()
/talks/{id}/      PATCH → TalkViewSet.partial_update()
/talks/{id}/      DELETE → TalkViewSet.destroy()
```

Six endpoints, zero manual URL patterns or view methods.

### Step 18: Test the Talks API

**GET all talks:**
- URL: `http://localhost:8000/v1/api/talks/`
- Method: GET
- Headers: `Authorization: Token your_token`

**GET a specific talk:**
- URL: `http://localhost:8000/v1/api/talks/1/`
- Method: GET
- Headers: `Authorization: Token your_token`

Since `ModelViewSet` handles POST, PUT, PATCH, and DELETE automatically, those all work too without any extra code.

---

## Complete API Reference

Here is every endpoint available in this project:

| Method | URL | Who can access | What it does |
|---|---|---|---|
| POST | `/v1/auth/users/` | Anyone | Register a new user |
| POST | `/v1/auth/token/login/` | Anyone | Log in, get a token |
| POST | `/v1/auth/token/logout/` | Authenticated | Log out, delete token |
| GET | `/v1/auth/users/me/` | Authenticated | Get current user profile |
| GET | `/v1/api/events/` | Authenticated | List all events |
| POST | `/v1/api/events/` | Organizers only | Create a new event |
| GET | `/v1/api/events/{id}/` | Authenticated | Get one event |
| GET | `/v1/api/talks/` | Authenticated | List all talks |
| POST | `/v1/api/talks/` | Authenticated | Create a new talk |
| GET | `/v1/api/talks/{id}/` | Authenticated | Get one talk |
| PUT | `/v1/api/talks/{id}/` | Authenticated | Fully update a talk |
| PATCH | `/v1/api/talks/{id}/` | Authenticated | Partially update a talk |
| DELETE | `/v1/api/talks/{id}/` | Authenticated | Delete a talk |

---

## Challenges & Exercises

### Challenge 1: `SpeakerBio` Model and API

Create a `SpeakerBio` model with the following fields:
- `name` — CharField
- `bio` — TextField
- `talk` — ForeignKey to `Talk`

Steps:
1. Add the model to `events/models.py` and run `makemigrations` and `migrate`
2. Register it in `events/admin.py`
3. Create a `SpeakerBioSerializer` in `events/serializers.py`
4. Create a `SpeakerBioViewSet` in `events/views.py` using `ModelViewSet`
5. Register it with the router in `events/urls.py`
6. Test all endpoints in Postman

### Challenge 2: List All Talks for a Specific Event

Create an endpoint `/v1/api/events/{id}/talks/` that returns all talks belonging to a specific event.

> 💡 **Hint:** Look at the `@action` decorator from the DRF viewsets lesson. You can add a custom action to `EventAPIView` or create a separate view. The key is filtering `Talk.objects.filter(event=event)` where `event` is retrieved from the URL parameter.

### Challenge 3: React Frontend (Open-Ended)

Build a simple React frontend that:
1. Has a registration form that POSTs to `/v1/auth/users/`
2. Has a login form that POSTs to `/v1/auth/token/login/` and stores the returned token
3. Shows a list of events fetched from `/v1/api/events/` with the token in the Authorization header
4. Shows a create event form that is only visible to organizer users

---

## Common Mistakes & How to Fix Them

### Missing `Authorization` Header

**Symptom:** `401 Unauthorized` response with `{"detail": "Authentication credentials were not provided."}`

**Fix:** Every request to a protected endpoint needs the header. In Postman set:
- Key: `Authorization`
- Value: `Token ` followed by your token (note the space after "Token")

### Wrong Header Format

**Symptom:** `401 Unauthorized` even though you added the header.

**Fix:** The format must be exactly `Token <your_token_string>` — capital T, one space. Common mistakes:
```
Bearer your_token    ← wrong prefix (that's JWT format)
token your_token     ← lowercase T
Tokenmy_token        ← missing space
```

### Forgetting `re_password` During Registration

**Symptom:** `400 Bad Request` with `{"re_password": ["This field is required."]}`

**Fix:** Because `USER_CREATE_PASSWORD_RETYPE = True` is set in `DJOSER`, registration requires both `password` and `re_password` in the request body.

### `403 Forbidden` When Creating an Event

**Symptom:** You are logged in but get a 403 when trying to POST a new event.

**Fix:** Only users with `role = "organizer"` can create events. Check that:
1. The user you are logged in as has `role` set to `"organizer"` — check via `/v1/auth/users/me/`
2. You registered the user with `"role": "organizer"` in the request body
3. You are using the correct user's token in the header

### `rest_framework.authtoken` Migrations Not Run

**Symptom:** `ProgrammingError: relation "authtoken_token" does not exist`

**Fix:** Run `python manage.py migrate` after adding `rest_framework.authtoken` to `INSTALLED_APPS`.

### Custom Fields Not Appearing in Response

**Symptom:** `/v1/auth/users/me/` only shows `id`, `username`, `email` — not `role`, `full_name`, etc.

**Fix:** Check that:
1. `core/serializers.py` exists and includes the custom fields
2. The `DJOSER` settings in `settings.py` point to your custom serializers with the correct dotted path (`"core.serializers.CustomUserSerializer"`)
3. You restarted the development server after changing settings

---

## Glossary

| Term | Definition |
|---|---|
| `Authorization` header | An HTTP header used to send authentication credentials with a request. For token auth the format is `Token <token_string>`. |
| `basename` | A router argument used to generate URL names for a viewset. `basename="talk"` produces names like `talk-list` and `talk-detail`. |
| `DEFAULT_AUTHENTICATION_CLASSES` | A DRF setting that defines how the API identifies who is making a request. `TokenAuthentication` reads the `Authorization` header. |
| `DEFAULT_PERMISSION_CLASSES` | A DRF setting that defines who is allowed to access the API by default. `IsAuthenticated` requires a valid token. |
| Djoser | A Django package that provides ready-made API endpoints for user registration, login, logout, and profile management. |
| `get_permissions()` | A method on `APIView` that DRF calls to determine what permissions apply to the current request. Override it to apply different permissions per HTTP method. |
| HTTP header | A key-value pair sent alongside an HTTP request or response that provides metadata. `Authorization`, `Content-Type`, and `Accept` are common headers. |
| `IsAuthenticated` | A DRF permission class that allows access only to users who have successfully authenticated (sent a valid token). |
| `IsOrganizer` | A custom permission class in this project that allows access only to users with `role == "organizer"`. |
| JSON Web Token (JWT) | An alternative to simple tokens that encodes user information inside the token itself. More advanced — covered by `djangorestframework-simplejwt`. |
| `ModelViewSet` | A DRF viewset that automatically provides list, create, retrieve, update, partial_update, and destroy endpoints from three lines of configuration. |
| `re_password` | The field name for password confirmation required by Djoser when `USER_CREATE_PASSWORD_RETYPE = True`. |
| REST API | An API that returns JSON data instead of HTML pages. Follows conventions where resources are identified by URLs and HTTP methods communicate the intended action. |
| `router.register()` | A method on a DRF Router that registers a viewset and generates all its URL patterns automatically. |
| Session authentication | Authentication using a cookie stored in the browser. Used in Django's template-based views. Not practical for API clients like mobile apps. |
| Token authentication | Authentication using a random string sent in the `Authorization` header. Simpler and more universal than sessions for API clients. |
| `USER_CREATE_PASSWORD_RETYPE` | A Djoser setting that requires users to enter their password twice during registration to prevent typos. |
| `USER_ID_FIELD` | A Djoser setting that determines which field identifies a user in URL patterns. |
| `CustomUserCreateSerializer` | Our custom serializer extending Djoser's `UserCreateSerializer`, used during user registration. Includes the `password` field and our custom user fields. |
| `CustomUserSerializer` | Our custom serializer extending Djoser's `UserSerializer`, used when displaying user data. Does not include `password`. |

---

## Conclusion

In this lesson you built a complete RESTful API with token-based authentication. The key concepts to carry forward are:

**Token authentication** replaces session cookies for API clients. The client logs in once to get a token, then includes that token in the `Authorization` header of every subsequent request.

**Djoser** gives you user registration, login, and logout endpoints for free. Custom serializers let you extend Djoser's defaults to include your own model fields.

**`APIView`** gives you full control — you write `get()`, `post()`, and other methods explicitly, and you can override `get_permissions()` to apply different rules per HTTP method.

**`ModelViewSet`** is the shortcut — three lines of configuration gives you all six CRUD endpoints automatically. Use it when you want standard behaviour and do not need fine-grained control.

**`DefaultRouter`** pairs with ViewSets to generate all URL patterns automatically, so you never have to write repetitive `path()` entries for list/detail/create/update/delete.

> 📌 **What Comes Next**
> The conclusion mentions JWT (JSON Web Tokens) as a more advanced alternative to simple tokens. Djoser supports JWT through the `djangorestframework-simplejwt` package. JWT tokens encode the user's identity inside the token itself, so the server does not need to look them up in the database on every request — making them faster at scale. You would also explore rate limiting, API versioning, and pagination as your APIs grow in complexity.


## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `djoser_demo_project/core/admin.py`

```python title="djoser_demo_project/core/admin.py"
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Profile", {"fields": ("role", "full_name", "bio", "status")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Profile", {"fields": ("role", "full_name", "bio", "status")}),
    )
```

### `djoser_demo_project/core/apps.py`

```python title="djoser_demo_project/core/apps.py"
from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
```

### `djoser_demo_project/core/models.py`

```python title="djoser_demo_project/core/models.py"
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("organizer", "Organizer"),
        ("presenter", "Presenter"),
    )
    STATUS_CHOICES = (
        ("active", "Active"),
        ("inactive", "Inactive"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="organizer")
    full_name = models.CharField(max_length=150, blank=True, default="")
    bio = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")

    def __str__(self):
        return f"{self.username} ({self.role})"
```

### `djoser_demo_project/core/permissions.py`

```python title="djoser_demo_project/core/permissions.py"
from rest_framework.permissions import BasePermission


class IsOrganizer(BasePermission):
    """Allow access only to users with the 'organizer' role."""

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "organizer"
        )
```

### `djoser_demo_project/core/serializers.py`

```python title="djoser_demo_project/core/serializers.py"
# TODO Part 1: Import UserCreateSerializer and UserSerializer from djoser.serializers
# TODO Part 1: Create a CustomUserCreateSerializer extending djoser's UserCreateSerializer
#              with fields: id, username, password, email, role, full_name, bio, status
# TODO Part 1: Create a CustomUserSerializer extending djoser's UserSerializer
#              with fields: id, username, email, role, full_name, bio, status
```

### `djoser_demo_project/djoser_demo_project/asgi.py`

```python title="djoser_demo_project/djoser_demo_project/asgi.py"
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djoser_demo_project.settings")
application = get_asgi_application()
```

### `djoser_demo_project/djoser_demo_project/settings.py`

```python title="djoser_demo_project/djoser_demo_project/settings.py"
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-djoser-demo-secret-key-change-in-production"

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # local
    "core",
    "events",
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

ROOT_URLCONF = "djoser_demo_project.urls"

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

WSGI_APPLICATION = "djoser_demo_project.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom user model — pre-configured (required before first migration)
AUTH_USER_MODEL = "core.User"

# TODO Part 1: Add REST_FRAMEWORK settings here (TokenAuthentication + IsAuthenticated)

# TODO Part 1: Add DJOSER settings here (USER_ID_FIELD, USER_CREATE_PASSWORD_RETYPE, SERIALIZERS)
#              Point serializers to core.serializers.CustomUserCreateSerializer and core.serializers.CustomUserSerializer
```

### `djoser_demo_project/djoser_demo_project/urls.py`

```python title="djoser_demo_project/djoser_demo_project/urls.py"
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    # TODO Part 1: Add path("v1/auth/", include("djoser.urls"))
    # TODO Part 1: Add path("v1/auth/", include("djoser.urls.authtoken"))
    # TODO Part 2: Add path("v1/api/", include("events.urls"))
]
```

### `djoser_demo_project/djoser_demo_project/wsgi.py`

```python title="djoser_demo_project/djoser_demo_project/wsgi.py"
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djoser_demo_project.settings")
application = get_wsgi_application()
```

### `djoser_demo_project/events/admin.py`

```python title="djoser_demo_project/events/admin.py"
from django.contrib import admin
from .models import Event, Talk


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "start_date", "end_date")


@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ("title", "event", "speaker_name", "status", "scheduled_time")
```

### `djoser_demo_project/events/apps.py`

```python title="djoser_demo_project/events/apps.py"
from django.apps import AppConfig


class EventsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "events"
```

### `djoser_demo_project/events/management/commands/load_demo_data.py`

```python title="djoser_demo_project/events/management/commands/load_demo_data.py"
from django.core.management.base import BaseCommand
from events.models import Event, Talk
from datetime import datetime, timezone


class Command(BaseCommand):
    help = "Load initial demo data for events and talks."

    def handle(self, *args, **kwargs):
        # Clear existing data so the command is safe to run more than once
        Talk.objects.all().delete()
        Event.objects.all().delete()

        # Event 1 — PyCon Demo Day
        event1 = Event.objects.create(
            name="PyCon Demo Day",
            description="Annual Python conference demo day showcasing new projects.",
            location="Ottawa, ON",
            start_date="2025-06-01",
            end_date="2025-06-03",
        )
        Talk.objects.create(
            event=event1,
            title="Intro to FastAPI",
            description="A comparison of FastAPI and DRF for building REST APIs.",
            speaker_name="Maria Chen",
            status="confirmed",
            scheduled_time=datetime(2025, 6, 1, 9, 0, tzinfo=timezone.utc),
        )
        Talk.objects.create(
            event=event1,
            title="Async Django",
            description="Exploring Django's async capabilities and when to use them.",
            speaker_name="James Okafor",
            status="scheduled",
            scheduled_time=datetime(2025, 6, 2, 14, 0, tzinfo=timezone.utc),
        )

        # Event 2 — Django Girls Workshop
        event2 = Event.objects.create(
            name="Django Girls Workshop",
            description="Beginner-friendly workshop introducing Django to new developers.",
            location="Toronto, ON",
            start_date="2025-07-15",
            end_date="2025-07-15",
        )
        Talk.objects.create(
            event=event2,
            title="Your First Django App",
            description="Step-by-step guide to building a Django app from scratch.",
            speaker_name="Sofia Reyes",
            status="confirmed",
            scheduled_time=datetime(2025, 7, 15, 10, 0, tzinfo=timezone.utc),
        )
        Talk.objects.create(
            event=event2,
            title="Django ORM Basics",
            description="How to query your database using the Django ORM.",
            speaker_name="Priya Nair",
            status="confirmed",
            scheduled_time=datetime(2025, 7, 15, 13, 0, tzinfo=timezone.utc),
        )

        # TODO Part 2: Add event3 — "REST API Summit"
        # event3 = Event.objects.create(
        #     name="REST API Summit",
        #     description="Conference focused on API design and best practices.",
        #     location="Vancouver, BC",
        #     start_date="2025-09-10",
        #     end_date="2025-09-12",
        # )
        # Talk.objects.create(
        #     event=event3,
        #     title="Building APIs with Djoser",
        #     description="A walkthrough of token authentication using Djoser and Django REST Framework.",
        #     speaker_name="Alex Rivera",
        #     status="scheduled",
        #     scheduled_time=datetime(2025, 9, 10, 10, 0, tzinfo=timezone.utc),
        # )

        self.stdout.write(self.style.SUCCESS("Demo data loaded successfully."))
```

### `djoser_demo_project/events/models.py`

```python title="djoser_demo_project/events/models.py"
from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Talk(models.Model):
    STATUS_CHOICES = (
        ("scheduled", "Scheduled"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="talks")
    title = models.CharField(max_length=200)
    description = models.TextField()
    speaker_name = models.CharField(max_length=150)  # plain CharField — no FK to User, keeps Part 3 simple
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")
    scheduled_time = models.DateTimeField()

    def __str__(self):
        return f"{self.title} ({self.event.name})"
```

### `djoser_demo_project/events/serializers.py`

```python title="djoser_demo_project/events/serializers.py"
# TODO Part 2: Create EventSerializer using ModelSerializer for the Event model
#              Fields: id, name, description, location, start_date, end_date
# TODO Part 3: Create TalkSerializer using ModelSerializer for the Talk model
#              Fields: id, event, title, description, speaker_name, status, scheduled_time
```

### `djoser_demo_project/events/urls.py`

```python title="djoser_demo_project/events/urls.py"
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# TODO Part 2: Import EventAPIView and add URL patterns:
#   - events/          → EventAPIView (name: event-list-create)
#   - events/<int:pk>/ → EventAPIView (name: event-detail)

# TODO Part 3: Import TalkViewSet, create a DefaultRouter,
#   register TalkViewSet with prefix "talks", and include router.urls

urlpatterns = [
    # URL patterns go here
]
```

### `djoser_demo_project/events/views.py`

```python title="djoser_demo_project/events/views.py"
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated

from core.permissions import IsOrganizer
from .models import Event, Talk
from .serializers import EventSerializer, TalkSerializer

# TODO Part 2: Create EventAPIView extending APIView
#   - get(self, request, pk=None): return single event by pk, or all events
#   - post(self, request): create a new event (organizer only)
#   - get_permissions(self): return [IsOrganizer()] for POST, [IsAuthenticated()] otherwise

# TODO Part 3: Create TalkViewSet extending viewsets.ModelViewSet
#   - queryset: all Talk objects
#   - serializer_class: TalkSerializer
#   - permission_classes: (IsAuthenticated,)
```

### `djoser_demo_project/manage.py`

```python title="djoser_demo_project/manage.py"
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djoser_demo_project.settings")
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

### `requirements.txt`

```text title="requirements.txt"
Django>=5.0,<6.0
djangorestframework>=3.15,<4.0
```
