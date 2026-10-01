---
title: "Slides: Packages And Virtualenv 4 Flask"
description: "Lecture slides: Packages And Virtualenv 4 Flask."
tags: [python]
sidebar:
  order: 10
---

## SDEV 1001

### Programming Fundamentals

### Packages and virtual environments - 4

---

## Expectations - What I expect from you

### - No Late Assignments

### - No Cheating

### - Be a good classmate

### - Don't waste your time

### - Show up to class

---

## Agenda

On the right is what we will cover today.

::right::

##### What is Flask?
##### Setting Up Flask
##### Your First Flask App
##### Running the Flask App
##### Adding a Data Route
##### Reading Data from a CSV
##### Next Steps
##### Summary

---

### What is Flask?

- Flask is a lightweight Python web framework.
- Lets you quickly build web applications and APIs.
- Great for learning web development and building backend services.

---

### Setting Up Flask

1. **Create a virtual environment:**
   ```
   python -m venv ./venv
   .\venv\Scripts\activate
   ```
2. **Install Flask:**
   ```
   pip install flask
   ```
3. **Save dependencies:**
   ```
   pip freeze > requirements.txt
   ```

---

### Your First Flask App

- Create a file called `library_app.py`:
   ```python
   from flask import Flask
   app = Flask(__name__)
   ```

- Add a home route:
   ```python
   @app.route('/')
   def home():
       return "<h1>Welcome to the Book Library API</h1>"
   ```

---

### Running the Flask App

- Set the app and run:
   ```
   set FLASK_APP=library_app.py
   flask run
   ```
- Visit [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

### Adding a Data Route

- Add sample data and a new route:
   ```python
   from flask import jsonify

   books = [
       {"title": "1984", "author": "George Orwell"},
       {"title": "To Kill a Mockingbird", "author": "Harper Lee"}
   ]

   @app.route('/books', methods=['GET'])
   def get_books():
       return jsonify(books)
   ```

---

### Reading Data from a CSV

- Import the `csv` module and load data:
   ```python
   import csv

   def load_books(filepath):
       books = []
       with open(filepath, mode='r', encoding='utf-8') as file:
           csv_reader = csv.DictReader(file)
           for row in csv_reader:
               books.append(row)
       return books
   ```

- Update the route to use CSV data:
   ```python
   @app.route('/books', methods=['GET'])
   def get_books():
       books = load_books('data/books.csv')
       return jsonify(books)
   ```

---

### Next Steps

- Try adding a new route to serve data from a different CSV file (e.g., authors).
- Explore filtering, pagination, and error handling for your API.

---

### Summary

- You learned how to:
  - Set up Flask
  - Create routes
  - Return JSON data
  - Read and serve data from a CSV file
