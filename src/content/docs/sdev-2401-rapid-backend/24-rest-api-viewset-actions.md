---
title: "Lesson 24: REST API Viewset Actions"
description: "Notes and starter code: Lesson 24: REST API Viewset Actions."
tags: [sdev-2401, django]
sidebar:
  order: 24
---

## Prerequisites
- Create a new virtual environment and install the packages from the `requirements.txt` file.

## Steps

So far we've learned that `APIViews` are the most basic way to create endpoints in DRF and `viewsets` are a powerful way to create endpoints but have a lot of implied functionality.

In this example we're going to learn some more functionality of viewsets and some small tidbits about serializers.

We're going to do this by make a workout detail endpoint that you can see the entire log of a workoutlogs.

### 1. Let's add the user to the `Workout` model in the file `workouts_app/models.py` and make the necessary migrations and migrations.

Add the user to the workout model and make the necessary migrations and migrations.
```python
class Workout(models.Model):
    # add the user to the workout model.
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.title}"
```
This is done for ease of users to be able to be access the workouts that hey have created.

You might be thinking this is not normalized since we have the user on the workout logs as well, but this is a common pattern to make it easier to access the data that is relevant to the user.

### 2. Let's add a custom action to the `WorkoutViewSet` to get the workout logs for a workout in the file `workouts_app/views.py`.

Let's make a custom action (which is an extra endpoint on the viewset) to get the workout logs for a workout.


```python
from rest_framework.decorators import action

# ... other imports ...

class WorkoutViewSet(viewsets.ModelViewSet):
    # ... other code ...
    permission_classes = [IsAuthenticated]
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

    @action(detail=True, methods=['get'], url_path='detail')
    def workout_logs(self, request, pk=None):
        workout = self.get_object()
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)
```
Let's talk about what this code is doing.
- The `@action` decorator is used to create a custom action on the viewset (you can think endpoint).
- `detail=True` means that this endpoint is for a specific workout (it will require the workout id in the url).
- `methods=['get']` means that this endpoint will only respond to GET requests.
- `url_path='detail'` means that the url for this endpoint will be `/workouts/{id}/detail/`.
- In the method, we get the workout object using `self.get_object()`, which is a built-in method that retrieves the object based on the URL parameters.
- We then serialize the workout object and return the serialized data in the response.

Now if we go to the endpoint `/workouts/{id}/detail/` we can see the workout data but you don't see the workout logs. This is because we are using the `WorkoutSerializer` which does not include the workout logs.

It should look something like below, this shows that:
- the `/workouts/{id}/detail/` endpoint is working and returning the workout data and is returning the same data as `/workouts/{id}/`.
### 3. Let's make a new serializer that includes the workout logs, in the file `workouts_app/serializers.py`.

#### 3.1 Add the serializer for the workout detail that includes the workout logs.
We're going to add a `WorkoutDetailReadOnlySerializer` that includes the workout logs and use that serializer in the custom action.

```python
from rest_framework import serializers
# ... other imports ...

# ... workout serializer ...

class WorkoutDetailReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'date', 'workout_logs']

# ... other serializers ...
```
Now if you go to the endpoint `/workouts/{id}/detail/` you should see the workout logs ids in the response. As shown below.
#### 3.2 Let's update the `WorkoutDetailReadOnlySerializer` to include the data from the workout logs instead of just the ids.

In DRF you can use something call "depth" to include related data in the serializer. This is a quick and easy way to include related data without having to create a new serializer for the related model.

```python
class WorkoutDetailReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'date', 'logs']
        depth = 2
```
Let's talk about what this code is doing.
- The `depth` option tells DRF to include related data up to a certain depth. In this case, we set it to 2, which means that it will include related data for the workout logs and also include related data for the exercises in the workout logs.
- This is a quick and easy way to include related data without having to create a new serializer for the related model.
  - There some unintended consequences of using depth, such as it can include more data than you want and it can be less performant than creating a custom serializer for the related model. So use it with caution.


Now if you go to the endpoint `/workouts/{id}/detail/` you should see the workout logs data in the response. As shown below.
- You can see that there's too much data here, we don't want our `user` password data to be included in the response, and we also have `workout` data as we're fetching the specific workout data. This is the unintended consequence of using `depth`, it can include more data than you want. So use it with caution.

#### 3.3 Let's create a custom serializer for the workout logs and use that in the `WorkoutDetailReadOnlySerializer` instead of using depth.

Let's add a another readonly serializer for workout logs that only includes the field that we want to include in the workout detail endpoint.

```python

class WorkoutLogSimpleDetailReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutLog
        fields = ['id', 'sets', 'reps', 'weight_kg', 'exercise', 'time']
        # included depth so that the exercise field will include the exercise's information in the response instead of just the exercise id.
        depth = 1


# Serializer for workout detail that includes the workout logs.
class WorkoutDetailReadOnlySerializer(serializers.ModelSerializer):
    # include the workout logs in the response
    logs = WorkoutLogSimpleDetailReadOnlySerializer(many=True, read_only=True)
    class Meta:
        model = Workout
        fields = ['id', 'title', 'date', 'logs']
        # removed depth since we're now using a custom serializer for the workout logs that includes the related exercise data.
```
Let's talk about what we added here.
- We created a new serializer `WorkoutLogSimpleDetailReadOnlySerializer` that includes the fields that we want to include in the workout detail endpoint for the workout logs.
  - in this serializer we also included `depth=1` so that the exercise field will include the exercise's information in the response instead of just the exercise id.
- In the `WorkoutDetailReadOnlySerializer` we added a new field `logs` that uses the `WorkoutLogSimpleDetailReadOnlySerializer` to serialize the workout logs data and include it in the response for the workout detail endpoint.
- We set `many=True` because a workout can have many workout logs.

Let's take a look at the response for the workout detail endpoint now and difference between the builtin detail endpoint and the custom detail endpoint.
### 4. Let's make the queryset for the `WorkoutViewSet` so that it only returns the workouts for the authenticated user in the file `workouts_app/views.py`.

This is pretty small change but it's a good idea to only return the data that is relevant to the user.

```python
# ... other imports ...

class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

# ... other code ...
```
Let's talk about what we added here.
- We added a `get_queryset` method to the `WorkoutViewSet` that filters the
queryset to only return the workouts that belong to the authenticated user.
- This is done by calling the `super().get_queryset()` method to get the original queryset and then filtering it using the `filter` method to only return the workouts where the `user` field matches the authenticated user (`self.request.user`).
- Now when we go to the endpoint to get the list of workouts, we will only see the workouts that belong to the authenticated user.

### 4. Let's give users the ability to search for exercises by name (in a new view) using the search filter backend in the file `workouts_app/views.py`.

#### 4.1 Let's talk about filter backends in DRF.

Filter backends in DRF are a powerful way to add filtering functionality to your API endpoints. They allow you to filter the queryset based on certain criteria, such as search terms, ordering, or custom filters.

We'll be using using the `SearchFilter` backend to allow users to search for exercises by name. Note the [docs are here](https://www.django-rest-framework.org/api-guide/filtering/#searchfilter) if you want to take a look.

#### 4.2 Let's add a new `ExerciseSearchView` view to search for exercises by name using the `SearchFilter` backend in the file `workouts_app/views.py`.


```python

from rest_framework import filters
# ... other imports ...

class ExerciseSearchViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

# ... other code ...

```
Let's talk about what we added here.
- We created a new viewset `ExerciseSearchViewSet` that inherits from `ReadOnlyModelViewSet` since we only want to allow read operations for this viewset.
- We set the `queryset` to be all exercises and the `serializer_class` to be the `ExerciseSerializer`.
- We added the `filter_backends` attribute and set it to a list that includes the `SearchFilter` backend. This tells DRF that we want to use the search filter functionality for this viewset.
- We added the `search_fields` attribute and set it to a list that includes the field `name`. This tells DRF that we want to allow searching for exercises based on the `name` field.


#### 4.3 Let's add the url for the `ExerciseSearchViewSet` in the file `workouts_app/urls.py`.

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (ExerciseAPIView, WorkoutViewSet, WorkoutLogAPIView,
                    ExerciseSearchViewSet)

from rest_framework.routers import DefaultRouter

from django.urls import path

router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet, basename='workout')
router.register(r'exercises/results',
                ExerciseSearchViewSet,
                basename='exercise-search')

# ... urlpatterns ...
```
- Now we can go to the endpoint for this viewset and use the search functionality to search for exercises by name. For example, if the endpoint is `/exercises/results/`, we can go to `/exercises/results/?search=squat` to search for exercises that have "squat" in their name.

#### 4.1 Let's test out the search functionality in Postman
- Go to the endpoint for the `ExerciseSearchViewSet` (e.g. `/exercises/results/`) and add the search query parameter to search for exercises by name (e.g. `/exercises/results/?search=arm`).

Let's take a look at what this looks like:
**Notes on More Complex Search**
Search is a complicated and difficult thing to do well. What you can do in the future is use a more powerful search engine such as:
- ElasticSearch (or OpenSearch which is the open source version of ElasticSearch) built on Apache Lucene
  - Github, Airbnb, Uber and more.
- Apache Solr built on Apache Lucene
  - used by companies like Netflix, Apple, Adobe and more
- Algolia (hosted search engine)
  - used by companies like Shopify, Stripe, and Twitch.

As well normally this takes in a lot of infrastructure and setup to get working well, so it's not something that you would normally implement in a small project or a project that is just starting out, but it's something to keep in mind for the future if you want to add powerful search functionality to your application.

## Challenge/Exercise

### 1. Add a `WorkoutPlan` model that has a many to many relationship with the `Workout` model and add an endpoint to get the workout plans for a user that includes the workouts in the workout plan.
- The `WorkoutPlan` model should have a `name` field and a many to many relationship with the `Workout` model.
- It should have `FileField` to upload a pdf of the workout plan.
- The endpoint to get the workout plans for a user should be a custom action on the `WorkoutViewSet` that returns the workout plans for the authenticated user and includes the workouts in the workout plan.
- Add the urls for the new endpoint and test it out in Postman or the browsable API.

## Conclusion

In this example we learned about:
- How to use custom actions on viewsets to create custom endpoints.
- How to use the `depth` option in serializers to include related data in the response.
- How to create custom serializers for related data to have more control over the data that is included in the response.
- How to filter the queryset in a viewset to only return data that is relevant to the authenticated user.
- How to use the `SearchFilter` backend to add search functionality to an endpoint.
- We also talked about the limitations of using `depth` in serializers and how it can include more data than you want, so it's important to use it with caution.
- We also talked about more powerful search engines that you can use in the future if you want to add more powerful search functionality to your application.


## Starter code

The project files as they are at the start of this lesson. Files identical to an earlier lesson are not repeated, so only new or changed files appear.

### `track_workout_projects/workouts_app/models.py`

```python title="track_workout_projects/workouts_app/models.py"
from django.db import models
from django.conf import settings

# Create your models here.
class Exercise(models.Model):
    EXERCISE_TYPES = [
        ('cardio', 'Cardio'),
        ('strength', 'Strength'),
        ('flexibility', 'Flexibility'),
        ('balance', 'Balance'),
    ]

    name = models.CharField(max_length=100)
    exercise_type = models.CharField(max_length=50, choices=EXERCISE_TYPES)

    def __str__(self):
        return F"{self.name} ({self.exercise_type})"

class Workout(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    # Linking many exercises to many workouts

    def __str__(self):
        return f"{self.title}"


class WorkoutLog(models.Model):
    # add the user to the workout log model.
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='logs')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.IntegerField(blank=True, null=True)
    reps = models.IntegerField(blank=True, null=True)
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    time = models.DurationField(blank=True, null=True)

    def __str__(self):
        return f"{self.workout.title} - {self.exercise.name}"
```

### `track_workout_projects/workouts_app/permissions.py`

```python title="track_workout_projects/workouts_app/permissions.py"
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOfResourceOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Assumes the model instance has an `user` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user == request.user
```

### `track_workout_projects/workouts_app/serializers.py`

```python title="track_workout_projects/workouts_app/serializers.py"
from rest_framework import serializers

from .models import Exercise, Workout, WorkoutLog
from django.conf import settings
from django.contrib.auth.models import User

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'date']

class ExerciseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    exercise_type = serializers.ChoiceField(choices=Exercise.EXERCISE_TYPES)

    def validate_name(self, value):
        INVALID_EXERCISE_NAMES = ["sitting", "lying down"]
        if value in INVALID_EXERCISE_NAMES:
            raise serializers.ValidationError("Exercise name cannot be 'sitting' or 'lying down'.")
        return value

    def create(self, validated_data):
        return Exercise.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.exercise_type = validated_data.get('exercise_type', instance.exercise_type)
        instance.save()
        return instance

# user serializer to only include public information.
class UserReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Read only serializer for viewing workouts that includes the user field
class WorkoutLogReadOnlySerializer(serializers.ModelSerializer):
    # include the workout's information in the response
    workout = WorkoutSerializer(read_only=True)
    # include the exercises in the workout log
    exercise = ExerciseSerializer(read_only=True)
    # include the user's information in the response
    user = UserReadOnlySerializer(read_only=True)

    class Meta:
        model = WorkoutLog
        fields = [
            'id',
            'sets',
            'reps',
            'weight_kg',
            'time',
            # override the default
            'workout',
            'exercise',
            # include the user field in the read only serializer
            'user'
        ]
        # if you add the depth option to the serializer's Meta class,
        # it will automatically include the related data for foreign key fields in the response. In this case, it will include the user's information in the response when viewing workouts.
        depth = 1

# Serializer for creating/updating workouts that doesn't include the user field
class WorkoutLogCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutLog
        fields = [
            'id',
            'sets',
            'reps',
            'weight_kg',
            'time',
            # foreign key fields
            'workout',
            'exercise',
            # include the user field.
            'user'
        ]

    def validate_weight_kg(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Weight cannot be negative.")
        elif value is not None and value > 500:
            raise serializers.ValidationError("Weight cannot be greater than 500 kg.")
        return value

    # let's validate that weight_kg is not set for cardio exercises
    def validate(self, data):
        # this will be an exercise instance because we're using a ModelSerializer and the exercise field is a foreign key to the Exercise model


        exercise = data.get('exercise')
        weight_kg = data.get('weight_kg')

        # skip this if a partial update (used for patch)
        if exercise is None or weight_kg is None:
            return data

        # we need to get the exercise from the database to check if it's a cardio exercise
        if exercise.exercise_type == "cardio" and weight_kg is not None:
            raise serializers.ValidationError("Cardio exercises cannot have a weight.")
        return data
```

### `track_workout_projects/workouts_app/urls.py`

```python title="track_workout_projects/workouts_app/urls.py"
from .views import ExerciseAPIView, WorkoutViewSet, WorkoutLogAPIView

from rest_framework.routers import DefaultRouter

from django.urls import path

router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('workout-logs/', WorkoutLogAPIView.as_view(), name='workout-log-api'),
    path('workout-logs/<int:id>/', WorkoutLogAPIView.as_view(), name='workout-log-detail'),
    path('exercises/', ExerciseAPIView.as_view(), name='exercise-api'),
    path('exercises/<int:id>/', ExerciseAPIView.as_view(), name='exercise-detail'),
] + router.urls
```

### `track_workout_projects/workouts_app/views.py`

```python title="track_workout_projects/workouts_app/views.py"
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOfResourceOrReadOnly
from .serializers import( ExerciseSerializer, WorkoutSerializer
                         , WorkoutLogReadOnlySerializer, WorkoutLogCreateUpdateSerializer)
from .models import Exercise, Workout, WorkoutLog


class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class ExerciseAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id=None):
        # detail view
        if id:
            exercise = get_object_or_404(Exercise, id=id)
            serializer = ExerciseSerializer(exercise)
            return Response(serializer.data)
        # list view
        exercises = Exercise.objects.all()
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            exercise = serializer.save()
            # this will call the create method internally.
            return Response(ExerciseSerializer(exercise).data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, id, partial=False):
        exercise = get_object_or_404(Exercise, id=id)
        serializer = ExerciseSerializer(exercise, data=request.data, partial=partial)
        if serializer.is_valid():
            exercise = serializer.save()
            return Response(ExerciseSerializer(exercise).data)
        return Response(serializer.errors, status=400)

    # we can use the same update function for both PUT and PATCH requests by passing in the partial argument
    def put(self, request, id):
        return self.update(request, id, partial=False)

    def patch(self, request, id):
        return self.update(request, id, partial=True)

    def delete(self, request, id):
        exercise = get_object_or_404(Exercise, id=id)
        exercise.delete()
        return Response(status=204)


class WorkoutLogAPIView(APIView):
    permission_classes = [IsOwnerOfResourceOrReadOnly]


    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return WorkoutLogCreateUpdateSerializer
        return WorkoutLogReadOnlySerializer

    def get(self, request, id=None):
        # detail view
        if id:
            workout_log = get_object_or_404(WorkoutLog, id=id)
            serializer = self.get_serializer_class()(workout_log)
            return Response(serializer.data)
        # list view
        workout_logs = WorkoutLog.objects.all()
        serializer = self.get_serializer_class()(workout_logs, many=True)
        return Response(serializer.data)

    def post(self, request):
        # get the serializer class based on the request method
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            workout_log = serializer.save(user=request.user)
            # return the workout log with the read only serializer to include the workout and exercise information in the response
            return Response(WorkoutLogReadOnlySerializer(workout_log).data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, id, partial=False):
        workout_log = get_object_or_404(WorkoutLog, id=id)
        # This triggers the 'has_object_permission' method in IsOwner
        self.check_object_permissions(request, workout_log)

        serializer = self.get_serializer_class()(workout_log, data=request.data, partial=partial)
        if serializer.is_valid():
            workout_log = serializer.save(user=request.user)
            return Response(WorkoutLogReadOnlySerializer(workout_log).data)
        return Response(serializer.errors, status=400)

    def put(self, request, id):
        return self.update(request, id, partial=False)

    def patch(self, request, id):
        return self.update(request, id, partial=True)
```
