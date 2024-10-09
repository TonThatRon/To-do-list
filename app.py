# app.py
from flask import Flask, request, jsonify, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    completed = db.Column(db.Boolean, default=False)

class TodoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'completed')

todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/todos', methods=['GET'])
def get_todos():
    all_todos = Todo.query.all()
    return jsonify(todos_schema.dump(all_todos))

@app.route('/todos/<int:id>', methods=['GET'])
def get_todo(id):
    todo = Todo.query.get_or_404(id)
    return todo_schema.jsonify(todo)

@app.route('/todos', methods=['POST'])
def add_todo():
    title = request.json['title']
    description = request.json.get('description', '')
    new_todo = Todo(title=title, description=description)
    db.session.add(new_todo)
    db.session.commit()
    return todo_schema.jsonify(new_todo), 201

@app.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    todo.title = request.json.get('title', todo.title)
    todo.description = request.json.get('description', todo.description)
    todo.completed = request.json.get('completed', todo.completed)
    db.session.commit()
    return todo_schema.jsonify(todo)

@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)