---
title: "Exercises For Dictionaries"
description: "Notes and code: Exercises For Dictionaries."
tags: [python]
sidebar:
  order: 4
---

## Exercise 1

1. Create a file named `birthdays.py` in this folder.
2. In that file create a dictionary with the following key-value pairs:
- key: dan, value: april 14th
- key: gary: value: june 23rd
- key: richard, value: february 2nd
- key: jessica, value: october 30th
- key: mary, value: december 25th
3. Prompt the user for a name, and then print out the birthday of that person.
If they are in the list then print out their birthday, otherwise print out "Sorry, we don't have NAMEHERE's birthday.". The output should look like the following:
- name in the dictionary
```
$ python birthdays.py
Who's birthday do you want to look up? dan
dan's birthday is april 14th
```
- name not in the dictionary
```
$ python birthdays.py
Who's birthday do you want to look up? Quince
Sorry, we don't have Quince's birthday.
```

## Exercise 2
1. Create a file named `pizza_prices.py` in this folder.
2. Create two dictionaries.
  - The first dictionary is named `toppings` with the following key-value pairs
    - key: cheese, value: True
    - key: pepperoni, value: True
    - key: mushrooms, value: False
    - key: pineapple, value: False
    - key: anchovies, value: True
    - key: olives, value: False
    - key: sausage, value: True
  - The second dictionary is the `toppings_prices` dictionary with the following key-value pairs
    - key: cheese, value: 0.5
    - key: pepperoni, value: 2.0
    - key: mushrooms, value: 1.0
    - key: pineapple, value: 0.5
    - key: anchovies, value: 1.5
    - key: olives, value: 1.25
    - key: sausage, value: 2.25
3. Calculate the price of the pizza based on the topping prices, add a 12$ base price and an 18% tip to the pizza. Print out the toppings of the pizza and the total price of the pizza. The output should look like the following:
```
$ python pizza_prices.py
The toppings of your pizza are:
cheese
pepperoni
No mushrooms
No pineapple
anchovies
No olives
sausage
Your total is: $21.535
```

## Completed code

The completed files for this lesson, with the instructor comments included.

### `birthdays.py`

```python title="birthdays.py"
birthdays = {
    "dan": "april 14th",
    "gary": "june 23rd",
    "richard": "february 2nd",
    "jessica": "october 30th",
    "mary": "december 25th",
}

name = input("Who's birthday do you want to look up? ")
if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}")
else:
    print(f"Sorry, we don't have {name}'s birthday.")
```

### `pizza_prices.py`

```python title="pizza_prices.py"
toppings = {
    "cheese": True,
    "pepperoni": True,
    "mushrooms": False,
    "pineapple": False,
    "anchovies": True,
    "olives": False,
    "sausage": True
}

toppings_prices = {
    "cheese": 0.5,
    "pepperoni": 2.0,
    "mushrooms": 1.0,
    "pineapple": 0.5,
    "anchovies": 1.5,
    "olives": 1.25,
    "sausage": 2.25
}

price = 12
for topping, add in toppings.items():
    if add:
        price += toppings_prices[topping]

price = price * 1.18

print("The toppings of your pizza are:")
for topping, add in toppings.items():
    if add:
        print(topping)
    else:
        print("No " + topping)

print("Your total is: $" + str(price))
```
