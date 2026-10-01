---
title: "Intro Loops"
description: "Notes and code: Intro Loops."
tags: [python]
sidebar:
  order: 1
---

## Code

The source files for this lesson, with the instructor comments included.

### `day12_intro_loops.py`

```python title="day12_intro_loops.py"
#List Comprehension
# List comprehension is a very powerful tool in python that allows us to significantly reduce the lines of code required to create sublists.

# The format for using it is:
# new_list = [<var> for <var> in <old_list> <logic>]

# For example, list comprehension can turn this code:

weapons = ["shotgun", "knife", "sword", "BB gun", "water gun"]
guns = []

for weapon in weapons:
    if "gun" in weapon:
        guns.append(guns)

print(guns)

# into this code:

guns = [weapon for weapon in weapons if "guns" in weapon]

print(guns)

# List comprehension is useful when we want a subset of items from a list. 

# STRINGS ARE CHARACTER ARRAYS
# The string data type is actually a list of individual characters. and since that is the case, we can loop through the characters in a string just like a list:

for ch in "Hello":
    print(ch)

inventory = ["knife of cutting", "shotgun of true love", "pez dispenser of forgiveness", "kleenex of neverending doom", "fidget spinner of time"]

# to print all of the items in our lists, we can use the for loop with the following structure:
# for <variable> in <list>:
#     do something with the variable

# the <variable> is a new variable that will exist only in the context of the for loop. The for loop looks at each item individually and assigned the value of the current item to <variable>

# To loop through all of the items in our inventory and print them to the console:
print("Our inventory contains:")
for item in inventory:
    print(f"- {item}")

# don't forget to indent.

# a tuple is a special type of list. Unlike our normal lists, they cannot be changed. We create a tuple the same way we create a list, except we use parentheses () instead of square brackets []

available_liquids = ["acid", "water", "soda", "bleach", "liquid nitrogen"]

# This is an unchangeable list of liquids that are safe to drink.
drinkable_liquids = ("water", "vinegar", "coffee", "soda")

for liquid in available_liquids:
    if liquid in drinkable_liquids:
        print(f"You can drink {liquid}.")
    else:
        print(f"You can drink {liquid}, but you probably shouldn't...")

# Tuples also allow us to return multiple items from a function, which is a useful trick.

# Python provides us with a way to get the both the value of an item as well as its index.
# We do this using the built-in enumerate() function.

# The syntax for this is:
# for <variable_for_index>, <variable_for_value> in enumerate(<list>)

# The first variable we declare here will be to hold the index, and the second to hold the value.

# to list the items in our inventory as well as the index:

for idx, item in enumerate(inventory):
    print(f"{idx}. {item}")


# CONTINUE
# The continue statement is used when we want to skip the rest of the code in loop. If the continue statement is reached, then the code will immediately move to the next iteration of the loop.

# For example, the following code will print only odd numbers, and skip any even numbers.

numbers = [1, 2, 3, 4, 5]
for n in numbers:
    if n % 2 == 0:
        continue #skips any remaining code and moves to next iteration
    print(f"Odd number: {n}")


# BREAK
# The break statement will abort the execution of a loop. The term "break out" is used to describe this behavior. When the break statement is reached, the loop immediately stops running and moves on the next line of execution outside of the loop.

# for example, the following code will execute until the animal is a parrot

animals = ["dog", "cat", "goose", "hamster"]
for animal in animals:
    if animal == "goose":
        print("There is a goose. They can be jerks so we better leave immediately.")
        break
    print(f"A cute little {animal}")

# WHILE LOOPS

# A while loop is a loop that will execute so long as a particular condition is true. While loops are everywhere in software development, and definitely with games. Every game is running inside of a while loop. We play the game until the player desides to quit.

playing = True
while playing:
    print("Pew pew!")
    keep_playing = input("Do you want to keep playing? (y/n)")
    if keep_playing == "n":
        playing = False

# Do-while Loops
# Python does not have a built-in do-while data structure, unlike some other programming languages like C# and java.
# To implement the Do-While data structure in Python, we need to use a while loop with the exit condition of True. This will guarantee that the loop executes. Then to stop the loop, we use break statements as our exit conditions.

# Here is the same example of a game loop using the do-while structure
while True:
    print("Pew pew!")
    keep_playing = input("Do you want to keep playing? (y/n)")
    if keep_playing == "n":
        break
```

### `hunting_game_end.py`

```python title="hunting_game_end.py"
import random

HIT_LIMIT = 9

available_monsters = ("zombie", "wraith", "bandit", "ghoul", "sphinx", "venemous gerbil", "chimera")
weapons = ["crossbow", "nail clippers", "knife", "gun", "rubber chicken", "vitamins", "sword"]

active_monsters, defeated_monsters = [], []
health = 5

while True:
    
    #check here IndexError exceptions
    monster_index = random.randint(0, len(available_monsters) - 1)
    monster = available_monsters[monster_index]
    active_monsters.append(monster)
    print(f"A {monster} spawns!")
    print("The following monsters are running at you:")
    for m in active_monsters:
        print(f"- {m}")
    
    for idx, m in enumerate(active_monsters):
        print(f"You choose to attack the {m}")
        weapons_count = len(weapons)
        if weapons_count == 0:
            print("Oh no you're out of weapons! Escape!")
            break
        valid_choice = False
        while not valid_choice:
            weapon = input("Choose your weapon: ").lower()

            if weapon in weapons:
                print(f"You pull out your trusty {weapon}")
                valid_choice = True
            else:
                print(f"You forgot your {weapon}! Choose something else.")
        
        print(f"You attack with the {weapon}")

        roll = random.randint(1, 12)
        if roll >= HIT_LIMIT:
            print(f"Critical hit! Monster {idx + 1} goes down.")
            defeated_monsters.append(m)
            print(f"You're {weapon} disintegrates...")
            weapons.remove(weapon)
        else:
            print(f"Oh no you miss. The {m} attacks you!")
            health -= 1
    
    if (health < 1):
        print("You're dead.")
        break

    for m in defeated_monsters:
        m_index = active_monsters.index(m)
        del active_monsters[m_index]
    
    keep_hunting = input("Would you like to keep hunting? (y/n) ")
    if not keep_hunting:
        print("Hunting trip over. Back to the grind.")
        break
    
    defeated_monsters.clear()
```

### `hunting_game_start.py`

```python title="hunting_game_start.py"
import random
import time

HIT_LIMIT = 9

available_monsters = ("zombie", "wraith", "bandit", "ghoul", "sphinx", "venemous gerbil", "chimera")
weapons = ["crossbow", "nail clippers of death", "knife", "gun", "rubber chicken", "vitamins", "sword"]

health = 5
active_monsters, defeated_monsters = [], []

while True:
    monster_index = random.randint(0, len(available_monsters) - 1)
    monster = available_monsters[monster_index]
    active_monsters.append(monster)

    print(f"A {monster} has appeared!")
    print("The following monsters are attacking you: ")

    for attacking_monster in active_monsters: 
        print(attacking_monster)

    for idx, current_monster in enumerate(active_monsters):
        print(f"You attack the {current_monster}!")

        if len(weapons) == 0:
            break
            
        valid_choice = False
        while not valid_choice:
            print(f"Your available weapons: {weapons}")
            weapon_choice = input("Which weapon will you choose? ").lower()

            if weapon_choice in weapons:
                print(f"You pull out your trusty {weapon_choice}")
                valid_choice = True
            else:
                print(f"You forgot your {weapon_choice}")
        
        print(f"You attack the {current_monster} with a {weapon_choice}!")

        dice_roll = random.randint(1, 12)

        if dice_roll >= HIT_LIMIT:
            print(f"You smite the {current_monster} with a {weapon_choice}!")
            defeated_monsters.append(current_monster)
            time.sleep(2)
            print(f"Your {weapon_choice} disintegrates...")
            weapons.remove(weapon_choice)
        else:
            print(f"Oh no you miss! The {current_monster} attacks you!")
            health -= 1

    if len(weapons) == 0:
        print("You have no weapons! Run awaaaaawaay!")
        break
    
    if health <= 0:
        print("Ya dead!")
        break

    for m in defeated_monsters:
        m_index = active_monsters.index(m)
        del active_monsters[m_index]

    keep_hunting = input("Do you want to keep hunting? (y/n) ").lower()

    if keep_hunting == "n":
        print("Back to the grind...")
        break
    
    print("Lock and load!")

    defeated_monsters.clear()

    
```
