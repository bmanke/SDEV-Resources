---
title: "Burger Builder"
description: "Code: Burger Builder."
tags: [python]
sidebar:
  order: 2
---

## Code

The source file, with the instructor comments included.

```python title="burger_builder.py"
def display_burger(burger):
    print("Here is what is on your burger:")
    print(f"There are {burger["patties"]} {burger["patty_type"]} patties")
    print(f"Your bun is {burger['bun']}")

    if burger["with_cheese"]:
        print("There is cheese on the burger.")
    else:
        print("The burger is cheeseless.... sad.")

    print("Your burger has these toppings: ")
    for topping in burger["toppings"]:
        add_message = ""
        if "candy corn" == topping:
            add_message = "... good grief"
        print(f"- {topping}{add_message}")

def update_burger(burger):
    option_to_change = input("What would you like to change? ")
    if option_to_change in burger:
        update_value = input(f"What do you want to change {option_to_change} to? ")
        burger[option_to_change] = update_value
    else:
        print("That is not on the menu.")

def main():
    burger = {
        "patties": 2,
        "patty_type": "chicken",
        "with_cheese": True,
        "toppings": ["candy corn", "pickles", "lettuce", "onion", "tomato", "bell peppers"],
        "bun": "whole grain"
    }

    display_burger(burger)
    update_burger(burger)
    display_burger(burger)

if __name__ == "__main__":
    main()
```
