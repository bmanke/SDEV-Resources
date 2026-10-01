---
title: "Exercises For Classes and Objects"
description: "Notes and code: Exercises For Classes and Objects."
tags: [python]
sidebar:
  order: 4
---

## Exercise 1

1. Using the `library_end` create `checkout_book(book)` method on the `Library` class that will remove a book from the list of books in the `Library`.

2. Using the `course_example_end` add a method on the `Course` named `get_assignment_average(assignment_id)` that will return the average grade for the assignment.

3. Using the `course_example_end` add a method on the `Student` named `get_average()` that will return the average grade for the student.
   
4. Using the `course_example_end` add methods on the `Course` named `list_students()` and `list_assignments()` whichc will list all students and assignments in the course and their ids respectively.

5. Using the `course_example_end` add a new class called `School` in the tools directory:

   `School` has the following properties:
    - name of school
    - list of courses

   `School` has the following methods:
    - add_course(): Adds a new course to the school
    - list_courses(): Lists the name of all available courses

6. Convert the course_app.py into a fully functioning application for a single school where you can do the following:
    - add a new course to the School
    - list all of the courses in the School
    - manage a course (create new function in course_app.py called `manage_course(course)` for this):
        - add student (no duplicate ids)
        - add assignments (no duplicate ids)
        - add submissions (no duplicate ids)
        - get course average
        - get assignment average
        - get student average
    - Note: Make use of the methods in the `Course` class in your `manage_course()` function.
    - Create a function in course_app.py called `load_data(school)` that will load the course from the existing example into the School at the beginning of main (after creating the school)
    - Ensure proper error handling where appropriate
    - Follow best practice for classes and objects.


## Completed code

The completed files for this lesson, with the instructor comments included.

### `courses_exercise_end/course_app.py`

```python title="courses_exercise_end/course_app.py"
from data.course_data import student_data, assignment_data, submission_data
from random import randint

from tools.school import School
from tools.course import Course
from tools.student import Student
from tools.assignment import Assignment
from tools.submission import Submission

def add_students(course):
    for student in student_data:
        student_instance = Student(student["id"], student["name"])
        course.add_student(student_instance)
    

def add_assignments(course):
    for assignment in assignment_data:
        assignment_instance = Assignment(assignment["id"], assignment["name"])
        course.add_assignment(assignment_instance)

def add_submissions(course):
    for submission in submission_data:
        student = course.get_student(submission["student_id"])
        assignment = course.get_assignment(submission["assignment_id"])
        submission = Submission(student, assignment, submission["grade"])
        student.add_submission(submission)

def load_data(school):
    course = Course("Dans Basketball Mastery Course")
    add_students(course)
    add_assignments(course)
    add_submissions(course)
    school.add_course(course)

def manage_course(course):
    option = input("""How do you want to manage the course? (choose number)
            1. Add Student
            2. Add Assignment
            3. Add Submission
            4. Get Course Average
            5. Get Assignment Average
            6. Get Student Average
        """)
    
    match option:
        case "1":
            new_id = randint(0, 1000)
            for student in course.students:
                if new_id == student.id:
                    new_id = randint(0, 1000)
            
            student_name = input("What is the student's name? ")
            course.add_student(Student(new_id, student_name))
        case "2":
            new_id = randint(0, 1000)
            for assignment in course.assignments:
                if new_id == assignment.id:
                    new_id = randint(0, 1000)
            
            assignment_name = input("What is the assignment's name? ")
            course.add_assignment(Assignment(new_id, assignment_name))
        case "3":
            try:
                course.list_students()
                student_id = int(input("Which student is this submission for? (Enter id) "))
                student = course.get_student(student_id)
                if student == None:
                    print("Student not found.")
                
                course.list_assignments()
                assignment_id = int(input("Which assignment is this submission for? (Enter id) "))
                assignment = course.get_assignment(assignment_id)
                if assignment == None:
                    print("Assignment not found.")

                if student != None and assignment != None:
                    grade = float(input("Enter Student Grade: "))
                    submission = Submission(student, assignment, grade)
                    student.add_submission(submission)
                
            except ValueError:
                print("Invalid Choice...")
        case "4":
            print(f"Course average: {course.get_course_average()}")
        case "5":
            try:
                course.list_assignments()
                assignment_id = int(input("Which assignment do you want the average of? (Enter id)"))
                print(f"Average: {course.get_assignment_average(assignment_id)}")
            except ValueError:
                print("Invalid Option")
        case "6":
            try:
                course.list_students()
                student_id = int(input("Which student do you want the average of? (Enter id)"))
                student = course.get_student(student_id)
                if student == None:
                    print("Student not found.")
                else:
                    print(f"Average: {student.get_average()}")
            except ValueError:
                print("Invalid Option")
        case _:
            print("Invalid option...")

def main():
    school_name = input("What is the school's name? ")
    school = School(school_name)
    load_data(school)

    while True:
        option = input(""" What do you want to do? (choose number)
            1. List courses
            2. Add course
            3. Manage course
            4. Quit
        """)

        match option:
            case "1":
                school.list_courses()
            case "2":
                course_name = input("What is the name of the course? ")
                course = Course(course_name)
                school.add_course(course)
            case "3":  
                try:
                    school.list_courses()
                    course_index = int(input("Which course would like to manage (by index)? "))
                    course = school.courses[course_index]
                    manage_course(course)
                except (ValueError, IndexError):
                    print("Invalid Course option.")
            case "4":
                break
        
if __name__ == "__main__":
    main()
```

### `courses_exercise_end/tools/assignment.py`

```python title="courses_exercise_end/tools/assignment.py"
class Assignment():
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __str__(self):
        return f"Assignment ID: {self.id}, Assignment Name: {self.name}"

    def __repr__(self):
        return str(self)
```

### `courses_exercise_end/tools/course.py`

```python title="courses_exercise_end/tools/course.py"
class Course:
    def __init__(self, name):
        self.name = name
        self.students = []
        self.assignments = []
    
    def add_student(self, student):
        self.students.append(student)

    def add_assignment(self, assignment):
        self.assignments.append(assignment)
    
    def get_student(self, student_id):
        for student in self.students:
            if student.id == student_id:
                return student
        return None
    
    def list_students(self):
        for student in self.students:
            print(f"ID: {student.id}, Name: {student.name}")

    def list_assignments(self):
        for assignment in self.assignments:
            print(assignment)
    
    def get_assignment(self, assignment_id):
        for assignment in self.assignments:
            if assignment.id == assignment_id:
                return assignment
        return None
    
    def get_course_average(self):
        total = 0
        number_of_submissions = 0
        for student in self.students:
            for submission in student.submissions:
                total += submission.grade
                number_of_submissions += 1
        return total / number_of_submissions
    
    def get_assignment_average(self, assignment_id):
        total = 0
        number_of_submissions = 0
        for student in self.students:
            for submission in student.submissions:
                if submission.assignment.id == assignment_id:
                    total += submission.grade
                    number_of_submissions += 1

        return total / number_of_submissions
    
    def __str__(self):
        return f"{self.name} has {len(self.students)} students and {len(self.assignments)} assignments"
```

### `courses_exercise_end/tools/school.py`

```python title="courses_exercise_end/tools/school.py"
from tools.course import Course

class School:
    def __init__(self, name):
        self.name = name
        self.courses = []

    def add_course(self, course):
        self.courses.append(course)

    def list_courses(self):
        for idx, course in enumerate(self.courses):
            print(f"{idx}. {course}")

    def __str__(self):
        return self.name
```

### `courses_exercise_end/tools/student.py`

```python title="courses_exercise_end/tools/student.py"
from .submission import Submission

class Student:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.submissions = []

    def __str__(self):
        return f"{self.name}"
    
    def add_submission(self, submission):
        self.submissions.append(submission)

    def get_average(self):
        total = 0
        for submission in self.submissions:
            total += submission.grade
        return total / len(self.submissions)
```

### `courses_exercise_end/tools/submission.py`

```python title="courses_exercise_end/tools/submission.py"
class Submission:
    def __init__(self, student, assignment, grade):
        self.student = student
        self.assignment = assignment 
        self.grade = grade

    def __str__(self):
        return f"{self.student.name} received {self.grade} on {self.assignment}"
```

### `library_excercise_end/library_app.py`

```python title="library_excercise_end/library_app.py"
from library_tools.library import Library
from library_tools.book import Book

if __name__ == '__main__':
    print("Welcome to our library App")
    print("--------------------------")
    # create a library
    library = Library("Edmonton Public Library")
    print(library)
    # let's call the list books to observe that we have no books
    library.list_books()

    # a few books
    book = Book("The Lord of the Rings", "J.R.R. Tolkien", 1000)
    bookTwo = Book("The Wheel of Time", "Robert Jordan", 690)
    bookThree = Book("The Way of Kings", "Brandon Sanderson", 1200)
    bookFour = Book("Mistborn", "Brandon Sanderson", 640)

    # add the books to our library
    library.add_book(book)
    library.add_book(bookTwo)
    library.add_book(bookThree)
    library.add_book(bookFour)
    
    # let's call the list books to see that we have one book!
    library.list_books()

    library.checkout_book(book)

    library.list_books()
```

### `library_excercise_end/library_tools/book.py`

```python title="library_excercise_end/library_tools/book.py"
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    # representation of our object when
    # we print it out in a string.
    def __str__(self):
        return f"{self.title} by {self.author}"
```

### `library_excercise_end/library_tools/library.py`

```python title="library_excercise_end/library_tools/library.py"
class Library:
    def __init__(self, name):
        self.name = name
        self.books = []

    def __str__(self):
        return f"{self.name}"
    
    # allows users to add books to our library
    def add_book(self, book):
        self.books.append(book)

    # allows users to list all the books in our library
    def list_books(self):
        print("Current books in our library:")
        if len(self.books) == 0:
            print("No books in our library")
        for book in self.books:
            print(F"- {book}")
```
