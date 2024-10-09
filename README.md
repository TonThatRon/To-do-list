# Flask Todo App

This is a simple Todo application built with Flask, JavaScript, and SQLite. It allows users to create, read, update, and delete todo items.

## Prerequisites

- Python 3.11
- pip (Python package installer)

## Step-by-Step Setup Guide

1. **Clone the repository**
   ```
   git clone https://github.com/TonThatRon/To-do-list.git
   cd To-do-list
   ```

2. **Set up a virtual environment**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required packages**
   ```
   pip install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy
   ```

5. **Create the project structure**
   ```
   mkdir static templates
   touch app.py
   ```

6. **Create the Flask application (app.py)**
   Copy the provided Flask code into `app.py`.

7. **Create the HTML template**
   Create a file `templates/index.html` and copy the provided HTML code into it.

8. **Create the JavaScript file**
   Create a file `static/main.js` and copy the provided JavaScript code into it.

9. **Run the application**
    ```
    python app.py
    ```
    This will create the database and start the Flask development server.

10. **Access the application**
    Open a web browser and go to `http://127.0.0.1:5000/`

## Usage

- To add a new todo, fill in the title (and optionally the description) and click "Add Todo".
- To mark a todo as complete, click the "Complete" button next to it.
- To undo a completed todo, click the "Undo" button.
- To delete a todo, click the "Delete" button next to it.

## File Structure

```
flask-todo-app/
│
├── venv/
├── static/
│   └── main.js
├── templates/
│   └── index.html
├── app.py
└── README.md
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
