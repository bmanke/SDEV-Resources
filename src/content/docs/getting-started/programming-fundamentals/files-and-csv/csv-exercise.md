---
title: "CSV Exercise"
description: "Notes and code: CSV Exercise."
tags: [python]
sidebar:
  order: 3
---

## Code

The source files for this lesson, with the instructor comments included.

### `bands_markdown.md`

````md title="bands_markdown.md"
# Battle of the Bands Contest with CSVs

The `bands.csv` file in the `data` directory contains data related to a battle of the bands contest and its results. Use Python's `csv` package to read data from the `bands.csv` file and print different fields.

Use proper __relative file pathing__ (using the `Path` object) so that the python file can be executed from any directory.
## Requirements

Create the following functions:

1. `main()`:
    - The main function of the program where all the program code will go. It must:
        - load the `bands.csv` using relative file pathing.
        - present the user with a list of columns they can choose.
        - ask the user to choose one of the columns
        - ask the user the number of results they want to return
        - present the requested results to the user
2. `read_csv(file_path)`:
    - A function that accepts a file path as a parameter
    - returns a list of entries (as dictionaries)
    - Handles any possible errors using a try/except
3. `sort_bands_by_stat(bands, column, reverse, top_n)`
    - A function that will sort a list of bands in reverse order based on a specified column
    - By default it gets the top 3 results and sorts in reverse

## Sample Output
```python
Available stats:
0. band_name
1. genre
2. crowd_score
3. judge_score
4. songs_performed
5. stage_energy
Enter option: 1
How many results would you like?10
1. Neon Serpents - Synthwave
2. Lunar Static - Synthwave
3. Midnight Formula - Synthwave
4. Neon Psalms - Synthwave
5. The Pale Machine - Synthwave
6. The Phantom Riffs - Rock
7. The Burning Halos - Rock
8. Savage Lullaby - Rock
9. The Iron Chorus - Rock
10. Voltage Saints - Rock
```
````

### `bands_python.py`

```python title="bands_python.py"
import csv
from pathlib import Path


def read_bands(file_path):
    """Read the bands from a csv file"""

    bands = []
    try:
        with open(file_path, mode='r') as file:
            reader = csv.DictReader(file)

            for band in reader:
                bands.append(band)
    except FileNotFoundError:
        print(f"{file_path} not found.")

    return bands


def sort_bands_by_stat(bands, column, reverse=True, top_n=3):

    sorted_bands = sorted(bands, key=lambda entry: entry[column], reverse=reverse)
    return sorted_bands[:top_n]

def new_band(file_path, details):
    with open(file_path, 'a') as file:
        headers = ['band_name','genre','crowd_score','judge_score','songs_performed','stage_energy']

        writer = csv.DictWriter(file, headers)
        writer.writerow(details)


def main():
    
    band = {
        'band_name': 'Serpent',
        'genre': 'Mathcore',
        'crowd_score': 12,
        'judge_score': 100,
        'songs_performed': 1,
        'stage_energy': 10
    }

    local_path = Path(__file__).parent
    file_name = 'data/bands.csv'

    file_path = local_path / file_name
    bands = read_bands(file_path)

    new_band(file_path, band)

    columns = list(bands[0].keys())
    print('Available stats:')
    for i, col in enumerate(columns):
        print(f"{i}. {col}")

    choice = int(input("Enter option: "))
    result_count = int(input("How many results would you like?"))
    column = columns[choice]
    top_bands = sort_bands_by_stat(bands=bands, column=column, top_n=result_count)
    for i, band in enumerate(top_bands):
        print(f"{i + 1}. {band['band_name']} - {band[column]}")


if __name__ == '__main__':
    main()
```
