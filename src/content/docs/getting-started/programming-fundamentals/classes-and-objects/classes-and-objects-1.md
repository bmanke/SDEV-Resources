---
title: "Classes And Objects 1"
description: "Code: Classes And Objects 1."
tags: [python]
sidebar:
  order: 3
---

## Code

The source file, with the instructor comments included.

```python title="classes_and_objects_1.py"
### Objected Oriented Programming (OOP) ###
# Used "objects" to represent data and methods that manipulate data.
# "Classes" are used to define what an object is and does.

# Benefits of OOP:
# - Modularity: Break complex problems into small pieces
# - Reusability: Classes can be reused
# - Encapsulation: Keeps data safe within objects, exposing only what is necessary. Though in python, this is a little more flexible.
# - Inheritance: we can "inherit" properties from existing classes
# - Polymorphism: objects can be treated as instances of their parent class (related to inheritance)

### Classes versus Objects ###

# A class is a blueprint for creating objects. Imagine using the idea of "a" car. Everybody's idea of what a car looks like may be different, but they all have wheels, a color, and a make. They can all drive, reverse, park, honk, etc.
# An object is an instance of a class. Imagine the idea of "that" car. It is a Blue Honda Civic. There is another car that is a Red F-150. These are two distinct objects, but they are both cars.

### Create Classes ###

# To create a new class, we use the "class" keyword.

class Car:
    # Constructor
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def __str__(self):
        return f"This car is a {self.make} {self.model}"
    
    def __repr__(self):
        return f"Car(make={self.make}, model={self.model})"
    
    def honk(self):
        if self.make == "Tesla":
            print(f"{self.make} {self.model} says I am way better than everyone else and I deserve respect!")
        else:
            print(f"{self.make} {self.model} says Honk honk!")

### The Constructor
# All classes should have a special method known as a Constructor. This is a method that is executed whenever a new instance of a class (an object) is created.
# In python, the constructor is the method with the name __init__(self)
# It should always have the parameter "self" as the first parameter, and then can include any number of parameters afterwards.
# The extra parameters that are added (in this case make, model, and year) need to be provided every time we create a new object. The parameters will then be assigned as "properties" (variables associated with a particular object) to the object.

### self ###
# The "self" keyword is a reference to the current instance (object) of a class. 

### Creating Objects ###

# To create a new instance of a class, we call the class using the class name in the same way we do a function. In this way, we are actually calling the constructor.

first_car = Car("Tesla", "Cybertruck", 2025)
second_car = Car("Honda", "Civic", 2014)

# This created two objects, both of which are instances of the Car class.

# We can print out the values of the properties by using the dot . followed by the property name

print(f"Car 1: {first_car.year} {first_car.make} {first_car.model}")
print(f"Car 2: {second_car.year} {second_car.make} {second_car.model}")

### METHODS ###
# Methods are special functions that belong to a class. They give objects distinct behaviors.
# You create them the same way as regular functions, but place them inside the class definition including (at least) the "self" parameter.

# To call the methods, use the object followed by a . and the method name.

first_car.honk()
second_car.honk()

### DUNDER METHODS ###
# Dunder (double underscore) methods are special methods that allow us to customize the behavior of our classes in certain situations.
# We override the default behavior of these methods.

# Overriding the __str__ dunder method allows us to define how the object is represented when we convert it to a string. This is useful for debugging and logging with the intention of being user facing.
print(first_car)

# Overriding the __repr__ will define the "official" string representation of an object and is geared more towards developers.
print(repr(second_car))

### Collections of Objects ###
# Attributes (or properties) can be any data type, including other objects.

# Here is a class called Garage that contains a list of cars that we can add to and list them off.

class Garage:
    def __init__(self):
        self.cars = []

    def add_car(self, car):
        self.cars.append(car)

    def list_cars(self):
        for car in self.cars:
            print(car)

garage = Garage()
garage.add_car(first_car)
garage.add_car(second_car)
garage.list_cars()
```
