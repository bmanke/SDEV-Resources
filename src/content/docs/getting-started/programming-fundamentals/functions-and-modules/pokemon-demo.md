---
title: "Pokemon Demo"
description: "Notes and code: Pokemon Demo."
tags: [python]
sidebar:
  order: 4
---

## Code

The source files for this lesson, with the instructor comments included.

### `main.py`

```python title="main.py"
from poke_package.poke_helper import create_pokemon, level_up

pokemon = {}

while True:
    choice = input("""
    1. Add Pokemon
    2. Poke-Details
    3. Quit
    4. Level Up Pokemon
    Choice: """)

    match choice:
        case "1":
            new_pokemon_name, new_pokemon_details = create_pokemon()
            pokemon[new_pokemon_name] = new_pokemon_details
        case "2":
            for key in pokemon:
                print(key)
                details = pokemon[key]
                for k, v in details.items():
                    print(f"   - {k}: {v}")

        case "3":
            break
        case "4":
            level_up(pokemon)
        case _:
            print("Invalid option...")
```

### `poke_package/poke_helper.py`

```python title="poke_package/poke_helper.py"
def create_pokemon():
    print("Adding pokemon...")
    name = input("Enter a name: ")
    element = input("Enter the type: ")
    level = get_int("Enter the level: ")
    is_legendary = get_bool("Is this pokemon Legendary? (true/false) ")

    details = {
        "element": element,
        "level": level,
        "is_legendary": is_legendary
    }
    return name, details

def level_up(pokemon):
    name = input("Enter the pokemon name: ")
    try:
        pokemon[name]["level"] += 1
    except (KeyError, NameError):
        print("Pokemon not found.")

def get_bool(message="Enter an boolean: "):
    while True:
        value = input(message).lower()
        if value == "true":
            return True
        elif value == "false":
            return False
        else:
            print("Not a valid boolean")

def get_int(message="Enter an integer: "):
    while True:
        try:
            value = int(input(message))
            return value
        except ValueError:
            print("Not a valid int")
        
```
