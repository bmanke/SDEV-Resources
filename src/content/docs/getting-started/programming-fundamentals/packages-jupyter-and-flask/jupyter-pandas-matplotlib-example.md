---
title: "Using Jupyter Notebooks with Pandas and Matplotlib"
description: "Notes and code: Using Jupyter Notebooks with Pandas and Matplotlib."
tags: [python]
sidebar:
  order: 4
---

## Why is this important?

Visualization is a key part of data analysis. While Pandas provides some basic plotting capabilities, Matplotlib is a powerful library for creating a wide variety of static, animated, and interactive visualizations in Python. Combining Jupyter Notebooks with Pandas and Matplotlib allows for interactive data exploration and visualization, making it easier to understand and communicate insights from data.

Matplotlib and Pandas some of the most popular libraries for data manipulation and visualization in Python, making them essential tools for anyone working with data in Python.

Note: If you're taking software development at NAIT you're probably going to cover this in depth in future courses. This is just a brief introduction to get you started.

## What are we going to do?

We're going to install Jupyter, Pandas, and Matplotlib in a virtual environment, and create a simple notebook that uses Pandas to analyze some data and Matplotlib to visualize it.

We're going to build on the ideas of the previous example and add some visualizations using Matplotlib.

## Steps

### 1. Create a virtual environment and install jupyter and pandas

1. create the virtual environment, and activate it:
```bash
python -m venv ./venv
.\venv\Scripts\activate # Or source ./venv/bin/activate on macOS/Linux
```
2. install jupyter and pandas:
```bash
pip install jupyter pandas matplotlib
```
3. Save the dependencies to a requirements file:
```bash
pip freeze > requirements.txt
```

### 2. Create a new Jupyter notebook just like last class.

1. Start the Jupyter Notebook server if it's not already running:
```bash
jupyter notebook
```
2. In the Jupyter interface, click on "New" and select "Python 3" to create a new notebook.

3. Rename your notebook to `matplotlib_example.ipynb`

### 3. Import the libraries and load the data

In the first cell of your new notebook, import the necessary libraries and load the data:

```python
import pandas as pd
import matplotlib.pyplot as plt
# Load the data
data = pd.read_csv('data/Property_Assessment_Data_(Current_Calendar_Year)_20251030.csv')
# take a look at the first few rows
data.head()
```

### 4. Let's get filter to get the top 6 most expensive residential properties in the city.

1. let's filter the data A reminder of how to filter data in pandas:
```python
rediential_data = data[data["Tax Class"] == "Residential"]
```
This will filter the data to only include rows where the "Tax Class" column is "Residential".

2. Let's sort the data by "Assessed Value" in descending order and get the top 6 most expensive properties:
```python
top_6_expensive = rediential_data.sort_values(by="Assessed Value", ascending=False)[:6]

top_6_expensive.head(10) # shows the first 10 rows, but there should only be 6
```
Note: the `[:6]` at the end of the line selects the top 6 rows after sorting.

### 5. Now let's create a bar chart of the assessed values of these top 6 properties.

1. First, let's set up the data for the bar chart:
We're going to create a new column in the `top_6_expensive` DataFrame that combines the "House Number" and "Street Name" to create a full address for each property. Then, we'll use this new column as the x-axis labels for our bar chart, and the "Assessed Value" as the heights of the bars.
```python
# create a new column for full address
# since 'House Number' is an integer we need to convert it to a string first
# this is what the .astype(str) part is doing
top_6_expensive['Property Address'] = top_6_expensive['House Number'].astype(str) + ' ' + top_6_expensive['Street Name']

# set up data for the bar chart
property_names = top_6_expensive['Property Address']
assessed_values = top_6_expensive['Assessed Value']

```
2. Now, let's create the bar chart using Matplotlib:
```python
plt.figure(figsize=(10, 6))
plt.bar(property_names, assessed_values, color='skyblue')
plt.xlabel('Property Address')
plt.ylabel('Assessed Value')
plt.title('Top 6 Most Expensive Residential Properties')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.show()
```
- Here `plt` is the common alias for `matplotlib.pyplot`, which provides a MATLAB-like interface for creating plots, this is a very common convention in the Python data science community.
- The `plt.bar()` function creates a bar chart.
   - the first argument is the x-axis labels (property names),
   - the second argument is the heights of the bars (assessed values),
   - the `color` argument sets the color of the bars.
- The `plt.xlabel()`, `plt.ylabel()`, and `plt.title()` functions set the labels and title of the chart.
- The `plt.xticks()` function is used to rotate the x-axis labels for better readability.
- Finally, `plt.show()` displays the plot.

### 6. let's create a line chart of this data.
A line chart can be useful to see trends over a sequence. In this case, we can plot the assessed values of the top 6 properties in order.

```python
plt.figure(figsize=(10, 6))
plt.plot(property_names, assessed_values, marker='o', linestyle='-', color='orange')
plt.xlabel('Property Address')
plt.ylabel('Assessed Value')
plt.title('Top 6 Most Expensive Residential Properties - Line Chart')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.grid(True)
plt.show()
```
Let's break down the code:
- The `plt.plot()` function creates a line chart.
   - the first argument is the x-axis labels (property names),
   - the second argument is the y-axis values (assessed values),
   - the `marker` argument specifies the style of the markers at each data point,
   - the `linestyle` argument specifies the style of the line connecting the points,
   - the `color` argument sets the color of the line and markers.
- the `plt.grid(True)` function adds a grid to the chart for better readability.
- The rest of the code is similar to the bar chart example, setting labels, title, rotating x-axis labels, and displaying the plot.


Note: Again if you're in software development at NAIT you'll probably cover this in depth in future courses. This is just a brief introduction to get you started.

### 7. (Optional) Let's do some more analysis with pandas and matplotlib and get the average assessed value by neighbourhood and plot it.
This is an optional step if you want to explore more with pandas and matplotlib.

Let's group the data by "Neighbourhood" and calculate the average assessed value for each neighbourhood. Then, we'll plot a bar chart of the average assessed values by neighbourhood.
```python
# Group by Neighbourhood and calculate average assessed value
avg_assessed_by_neighbourhood = rediential_data.groupby('Neighbourhood')['Assessed Value'].mean().sort_values(ascending=False)[:10]
```
This is doing a few things things here let's talk about it.
- `rediential_data.groupby('Neighbourhood')` groups the data by the "Neighbourhood" column.
- `['Assessed Value'].mean()` calculates the mean (average) of the "Assessed Value" for each neighbourhood.
- `.sort_values(ascending=False)[:10]` sorts the average assessed values in descending order and selects the top 10 neighbourhoods with the highest average assessed values.

Now, let's plot the bar chart:
```python
plt.figure(figsize=(10, 6))
plt.bar(avg_assessed_by_neighbourhood.index, avg_assessed_by_neighbourhood.values, color='lightgreen')
plt.xlabel('Neighbourhood')
plt.ylabel('Average Assessed Value')
plt.title('Top 10 Neighbourhoods by Average Assessed Value')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.show()
```
- Here, `avg_assessed_by_neighbourhood.index` provides the neighbourhood names for the x-axis labels.
- `avg_assessed_by_neighbourhood.values` provides the average assessed values for the heights of the bars.
- The rest of the code is similar to the previous bar chart example, setting labels, title, rotating x-axis labels, and displaying the plot.

## Exercises

- Create a bar chart of the top 5 "Assessed Value" properties in the "Commercial" tax class.

- Create a bar chart of the assessed values of properties in a specific neighbourhood (e.g., YOUR NEIGHBOURHOOD HERE).

- Create a line chart showing the trend of average assessed values across all neighbourhoods.


## Summary

Visualization is an essential part of data analysis, and Matplotlib is a powerful library for creating a wide variety of visualizations in Python. By combining Jupyter Notebooks with Pandas and Matplotlib, you can interactively explore and visualize data, making it easier to understand and communicate insights.


## Appendix: handy jupyter shortcuts
| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `Shift + Enter`             | Run the current cell and move to the next cell   |
| `Ctrl + Enter`              | Run the current cell and stay in it              |
| `Alt + Enter`               | Run the current cell and insert a new one below  |
| `Esc`                       | Enter command mode (blue border)                 |
| `Enter`                     | Enter edit mode (green border)                   |
| `A` (in command mode)       | Insert a new cell **above**                      |
| `B` (in command mode)       | Insert a new cell **below**                      |
| `D, D` (press D twice)      | Delete the selected cell                         |
| `Z`                         | Undo the last cell deletion                      |
| `M`                         | Change cell to **Markdown**                      |
| `Y`                         | Change cell to **Code**                          |
| `L`                         | Toggle line numbers in the current cell          |
| `Shift + M`                 | Merge selected cells                             |
| `Ctrl + S`                  | Save the notebook                                |
| `0, 0` (press 0 twice)      | Restart the kernel                               |
| `I, I` (press I twice)      | Interrupt the kernel                             |
| `Ctrl + /`                  | Toggle comment on selected lines (in edit mode)  |
| `Ctrl + Shift + -`          | Split a cell at the cursor                       |
| `Tab`                       | Autocomplete or show function signature          |
| `Shift + Tab`               | Show tooltip/documentation for an object         |
| `!command`                  | Run a shell command (e.g. `!ls`, `!pip install`) |
| `%time`                     | Measure execution time of a single line of code  |
| `%%time`                    | Measure execution time of a whole cell           |
| `%who`                      | List all variables in the namespace              |
| `%whos`                     | Detailed list of variables with types and sizes  |
| `%pwd`, `%cd`, `%ls`        | File system navigation commands                  |
| `%matplotlib inline`        | Display plots inline (common for matplotlib)     |
| `?object` or `help(object)` | Show documentation for an object                 |


## Completed code

The completed files for this lesson, with the instructor comments included.

### `matplotlib_example.ipynb`

```python
import pandas as pd
import matplotlib.pyplot as plt
# Load the data
data = pd.read_csv('data/Property_Assessment_Data_(Current_Calendar_Year)_20251030.csv')
```

```python
data.head()
```

```python
rediential_data = data[data["Tax Class"] == "Residential"]

rediential_data.head(10) # shows the first 10 rows, but there should only be 6
```

```python
top_6_expensive = rediential_data.sort_values(by="Assessed Value", ascending=False)[:6]

top_6_expensive.head(10) # shows the first 10 rows, but there should only be 6
```

```python
# create a new column for full address
# since 'House Number' is an integer we need to convert it to a string first
# this is what the .astype(str) part is doing
top_6_expensive['Property Address'] = top_6_expensive['House Number'].astype(str) + ' ' + top_6_expensive['Street Name']

# set up data for the bar chart
property_names = top_6_expensive['Property Address']
assessed_values = top_6_expensive['Assessed Value']
```

```python
plt.figure(figsize=(10, 6))
plt.bar(property_names, assessed_values, color='skyblue')
plt.xlabel('Property Address')
plt.ylabel('Assessed Value')
plt.title('Top 6 Most Expensive Residential Properties')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.show()
```

```python
plt.figure(figsize=(10, 6))
plt.plot(property_names, assessed_values, marker='o', linestyle='-', color='orange')
plt.xlabel('Property Address')
plt.ylabel('Assessed Value')
plt.title('Top 6 Most Expensive Residential Properties - Line Chart')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.grid(True)
plt.show()
```

```python
avg_assessed_by_neighbourhood = rediential_data.groupby('Neighbourhood')['Assessed Value'].mean().sort_values(ascending=False)[:10]
```

```python
plt.figure(figsize=(10, 6))
plt.bar(avg_assessed_by_neighbourhood.index, avg_assessed_by_neighbourhood.values, color='lightgreen')
plt.xlabel('Neighbourhood')
plt.ylabel('Average Assessed Value')
plt.title('Top 10 Neighbourhoods by Average Assessed Value')
plt.xticks(rotation=45, ha='right')  # Rotate x labels for better readability
plt.show()
```

### `requirements.txt`

```text title="requirements.txt"
aistudio-sdk==0.3.8
annotated-types==0.7.0
anyio==4.11.0
asgiref==3.8.1
aspose_slides==25.10.0
babel==2.16.0
bce-python-sdk==0.9.46
certifi==2025.10.5
chardet==5.2.0
charset-normalizer==3.4.4
click==8.3.0
colorama==0.4.6
colorlog==6.10.1
Django==5.2.2
docxcompose==1.4.0
docxtpl==0.19.1
filelock==3.20.0
fsspec==2025.9.0
future==1.0.0
h11==0.16.0
httpcore==1.0.9
httpx==0.28.1
huggingface-hub==0.35.3
idna==3.11
imagesize==1.4.1
Jinja2==3.1.5
joblib==1.5.2
lxml==5.3.0
MarkupSafe==3.0.2
modelscope==1.31.0
networkx==3.5
numpy==2.3.4
opencv-contrib-python==4.10.0.84
opt-einsum==3.3.0
packaging==25.0
paddleocr==3.3.0
paddlepaddle==3.2.0
paddlex==3.3.3
pandas==2.3.3
pdf2slides==0.1.0
pillow==12.0.0
prettytable==3.16.0
protobuf==6.33.0
psutil==7.1.0
py-cpuinfo==9.0.0
pyclipper==1.3.0.post6
pycryptodome==3.23.0
pydantic==2.12.3
pydantic_core==2.41.4
PyMuPDF==1.26.5
pypdfium2==4.30.0
python-bidi==0.6.6
python-dateutil==2.9.0.post0
python-docx==1.1.2
python-pptx==1.0.2
pytz==2025.2
PyYAML==6.0.2
requests==2.32.5
ruamel.yaml==0.18.15
ruamel.yaml.clib==0.2.14
safetensors==0.6.2
scikit-learn==1.7.2
scipy==1.16.2
setuptools==80.9.0
shapely==2.1.2
six==1.17.0
sniffio==1.3.1
sqlparse==0.5.3
threadpoolctl==3.6.0
tqdm==4.67.1
typing-inspection==0.4.2
typing_extensions==4.15.0
tzdata==2025.2
ujson==5.11.0
urllib3==2.5.0
wcwidth==0.2.14
xlsxwriter==3.2.9
```
