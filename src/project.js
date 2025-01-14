class Project {
  constructor(name){
    this.projectName = name;
    this.todoList = [];
  }
}

class Todo {
  constructor(title, dueDate, desc, priority){
    this.title = title;
    this.dueDate = dueDate;
    this.description = desc;
    this.priority = priority;
  }
}