---
title: "Using Jupyter Notebooks with Pandas Fundamentals"
description: "Notes and code: Using Jupyter Notebooks with Pandas Fundamentals."
tags: [python]
sidebar:
  order: 3
---

## Why is this important?

A lot of data analysis and data science is done in Jupyter Notebooks. Pandas is one of the most popular libraries for data manipulation and analysis in Python. Combining Jupyter Notebooks with Pandas allows for interactive data exploration and visualization, making it easier to understand and communicate insights from data.

In future courses you might use a platform like google colab or a jupyterhub instance to run notebooks in the cloud. But it's also useful to know how to set up and run Jupyter Notebooks on your own machine.

## What are we going to do?

Install Jupyter and Pandas in a virtual environment, and create a simple notebook that uses Pandas to analyze some data.

## Steps

### 1. Create a virtual environment and install jupyter and pandas

1. create the virtual environment, and activate it:
```bash
python -m venv ./venv
.\venv\Scripts\activate # Or source ./venv/bin/activate on macOS/Linux
```
2. install jupyter and pandas:
```bash
pip install jupyter pandas
```
3. Save the dependencies to a requirements file:
```bash
pip freeze > requirements.txt
```

### 2. Start the Jupyter Notebook server

This is going to be a local server, that we're going to leave running while we work with our notebooks.

```bash
jupyter notebook
```
This command will open a new tab in your web browser, showing the Jupyter Notebook interface.
- This interface allows you to create, open, and manage notebooks.
- The server will keep running in your terminal until you stop it (Ctrl+C).

The output of the command will look something like this:
```
[I 2025-10-30 15:53:01.821 ServerApp] Extension package jupyter_lsp took 0.4615s to import
... removed for brevity ...
[C 2025-10-30 15:53:08.423 ServerApp]
    To access the server, open this file in a browser:
        file:///C:/Users/dmouris/AppData/Roaming/jupyter/runtime/jpserver-22644-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/tree?token=24a6388ea60038814d52a16a492093273f84408b37da5f00
        http://127.0.0.1:8888/tree?token=24a6388ea60038814d52a16a492093273f84408b37da5f00```
```

The jupyter interface should open automitcally and look a bit like this:
![Jupyter Notebook Interface](/assets/programming-fundamentals/jupyter-pandas-fundamentals/jupyter_interface.png)

### 3. Create a new notebook in jupyter

1. In the Jupyter interface, click on "New" and select "Python 3" to create a new notebook.
Here's where it is located:
![Create New Notebook](/assets/programming-fundamentals/jupyter-pandas-fundamentals/create_new.png)

2. This should create a new notebook with an empty code cell. Rename the file to `first_notebook` by clicking on the title at the top.
It should look like this:
![Rename Notebook](/assets/programming-fundamentals/jupyter-pandas-fundamentals/new_notebook.png)

3. Inside of these code cells you can write and execute Python code interactively.
Note: you can also change these to markdown cells for text and documentation.
In the first cell let's just do a print statement to see that everything is working:
```python
print("Hello, Jupyter with Pandas!")
```
Execute the cell by pressing Shift+Enter. You should see the output below the cell.

### 4. Use Pandas in the notebook and use some data.

Pandas is a powerful library, here's a link to the documentation: https://pandas.pydata.org/docs/

For this example we're going to load data from the city of edmonton's open data portal about current property assessments. To get the [most recent data go here](https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Current-Calendar-Year-/q7d6-ambg/about_data) and click export -> CSV to download the data.

If you just want to following along without downloading the data, you can use the csv in the `data` folder in this repo.
1. First, import pandas at the top of your notebook:
```python
import pandas as pd
```
2. Next, load the CSV data into a pandas DataFrame. Adjust the file path as necessary:
```python
property_data = pd.read_csv('data/Property_Assessment_Data_(Current_Calendar_Year)_20251030.csv')
```

The `property_data` is a variable that hold what's called a `DataFrame`, which is a table-like data structure in pandas. We're going to take a look at the docs for `DataFrame` so we can see some stuff we can do with it.

3. Now you can explore the data. For example, display the first few rows:
```python
property_data.head()
```

Note do this with seperate cells in the new notebook (you can add new cells with the + button in the toolbar, or by pressing B in command mode), there's also an you can refer to the [appendix](#appendix-handy-jupyter-shortcuts) for some useful shortcuts.

### 5. Let's take a look at some operations that we can do with our pandas `DataFrame`

For each of the following cells we're going to create a new cell in the notebook and run the code to see the output

1. Get a summary of the DataFrame:
```python
property_data.info()
```
2. Let's how many rows and columns we have:

```python
property_data.shape
```
This will return a tuple with the number of rows and columns.

3. Let's get some basic statistics about the numerical columns:
```python
property_data.describe()
```
This is going to give us count, mean, std, min, max, and quartiles for all the numerical columns, which is super useful for getting a quick overview of the data.

4. Let's take a look at all of the neighbourhoods in the data:
```python
property_data["Neighbourhood"].unique()
```
This is going list all of the unique values in the "Neighbourhood" column.

### 6. Let's filter and sort the data to a specific neighborhood

For each of the following cells we're going to create a new cell in the notebook and run the code to see the output

1. Let's say we want to filter the data to see all properties in a specific neighborhood, for example "Downtown":
```python
downtown_properties = property_data[property_data['Neighbourhood'] == 'DOWNTOWN']
print(F"Number of properties in downtown {downtown_properties.shape[0]}")

downtown_properties.head()
```

2. Let's sort the downtown properties by assessed value in descending order:
```python
sorted_downtown = downtown_properties.sort_values(by='Assessed Value', ascending=False)
sorted_downtown.head()
```

3. Let's display the top 10 most expensive properties in downtown:
```python
print(sorted_downtown[:10])
```
This is going to show us the top 10 most expensive properties in downtown Edmonton based on the assessed value.
Note: the data isn't that nice to look at so let's just take a look at few columns

4. Let's display only the Address, Assessed Value, and Property Type columns for the top 10 most expensive properties in downtown:
```python
print(sorted_downtown[['House Number', 'Street Name',  'Assessed Value']][:10])
```
## Exercises

Using what you've learned so far, try to answer the following questions by creating new cells in your notebook:

1. How many properties are there in the
"ELLERSLIE" neighborhood?

2. What is the average assessed value of properties in the "KINGSWAY" neighborhood?

3. Get the top 3 most expensive properties in the "EDMONTON SOUTH WEST" neightbourhood.

## Summary

In this lesson we covered how to set up a virtual environment, install Jupyter and Pandas, and create a simple Jupyter Notebook to explore and analyze data using Pandas.

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

### `first_notebook.ipynb`

```python
print("Hello, Jupyter with Pandas!")
```

```python
import pandas as pd
```

```python
property_data = pd.read_csv('data/Property_Assessment_Data_(Current_Calendar_Year)_20251030.csv')
```

```python
property_data.head()
```

```python
property_data.info()
```

```python
property_data.shape
```

```python
property_data.describe()
```

```python
property_data["Neighbourhood"].unique()
```

```python
downtown_properties = property_data[property_data['Neighbourhood'] == 'DOWNTOWN']

print(downtown_properties.shape)
downtown_properties.head()
```

```python
sorted_downtown = downtown_properties.sort_values(by='Assessed Value', ascending=False)
sorted_downtown.head()
```

```python
print(sorted_downtown[:10])
```

```python
print(sorted_downtown[['House Number', 'Street Name',  'Assessed Value']][:10])
```

### `requirements.txt`

```text title="requirements.txt"
anyio==4.11.0
argon2-cffi==25.1.0
argon2-cffi-bindings==25.1.0
arrow==1.4.0
asttokens==3.0.0
async-lru==2.0.5
attrs==25.4.0
babel==2.17.0
beautifulsoup4==4.14.2
bleach==6.3.0
certifi==2025.10.5
cffi==2.0.0
charset-normalizer==3.4.4
colorama==0.4.6
comm==0.2.3
contourpy==1.3.3
cycler==0.12.1
debugpy==1.8.17
decorator==5.2.1
defusedxml==0.7.1
executing==2.2.1
fastjsonschema==2.21.2
fonttools==4.60.1
fqdn==1.5.1
h11==0.16.0
httpcore==1.0.9
httpx==0.28.1
idna==3.11
ipykernel==7.1.0
ipython==9.6.0
ipython_pygments_lexers==1.1.1
ipywidgets==8.1.7
isoduration==20.11.0
jedi==0.19.2
Jinja2==3.1.6
json5==0.12.1
jsonpointer==3.0.0
jsonschema==4.25.1
jsonschema-specifications==2025.9.1
jupyter==1.1.1
jupyter-console==6.6.3
jupyter-events==0.12.0
jupyter-lsp==2.3.0
jupyter_client==8.6.3
jupyter_core==5.9.1
jupyter_server==2.17.0
jupyter_server_terminals==0.5.3
jupyterlab==4.4.10
jupyterlab_pygments==0.3.0
jupyterlab_server==2.28.0
jupyterlab_widgets==3.0.15
kiwisolver==1.4.9
lark==1.3.1
MarkupSafe==3.0.3
matplotlib==3.10.7
matplotlib-inline==0.2.1
mistune==3.1.4
nbclient==0.10.2
nbconvert==7.16.6
nbformat==5.10.4
nest-asyncio==1.6.0
notebook==7.4.7
notebook_shim==0.2.4
numpy==2.3.4
packaging==25.0
pandas==2.3.3
pandocfilters==1.5.1
parso==0.8.5
pillow==12.0.0
platformdirs==4.5.0
prometheus_client==0.23.1
prompt_toolkit==3.0.52
psutil==7.1.2
pure_eval==0.2.3
pycparser==2.23
Pygments==2.19.2
pyparsing==3.2.5
python-dateutil==2.9.0.post0
python-json-logger==4.0.0
pytz==2025.2
pywinpty==3.0.2
PyYAML==6.0.3
pyzmq==27.1.0
referencing==0.37.0
requests==2.32.5
rfc3339-validator==0.1.4
rfc3986-validator==0.1.1
rfc3987-syntax==1.1.0
rpds-py==0.28.0
Send2Trash==1.8.3
setuptools==80.9.0
six==1.17.0
sniffio==1.3.1
soupsieve==2.8
stack-data==0.6.3
terminado==0.18.1
tinycss2==1.4.0
tornado==6.5.2
traitlets==5.14.3
typing_extensions==4.15.0
tzdata==2025.2
uri-template==1.3.0
urllib3==2.5.0
wcwidth==0.2.14
webcolors==24.11.1
webencodings==0.5.1
websocket-client==1.9.0
widgetsnbextension==4.0.14
```
