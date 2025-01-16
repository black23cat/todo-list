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
    this.isDone = false;
  }

  updateValue(array){
    const [title, desc, dueDate, priority] = array;
    this.title = title;
    this.dueDate = dueDate;
    this.description = desc;
    this.priority = priority;
  }
}

export default function ManageProject(){
  const projects = [];

  const newProject = (name) => {
    projects.push(new Project(name));
    console.log(projects);
  };

  const newTodoList = ( projectIndex, array ) => {
    const [title, description, dueDate, priority] = array;
    projects[projectIndex].todoList.push(new Todo(
      title, 
      dueDate, 
      description, 
      priority
    ));
  };

  const editTodoList = (projectIndex, todoIndex, array) => {

    projects[projectIndex].todoList[todoIndex].updateValue(array);
    console.log(projects[projectIndex].todoList[todoIndex]);
    // console.log(getProjectTodoList(projectIndex));
  }

  const getProjectList = () => {
    const projectList = [];
    projects.forEach((project) => {
      projectList.push(project);
    });
    return projectList;
  };

  const getProjectTodoList = (projectIndex) => {
    const projectTodoList = [];
    projects[projectIndex].todoList.forEach((list) => {
      projectTodoList.push(list);
    });
    
    console.log(projectTodoList);
    return projectTodoList;
  };

  const deleteProject = (projectIndex) => {
    projects.splice(projectIndex, 1);
  }

  const deleteTodoList = (projectIndex, todoIndex) => {
    projects[projectIndex].todoList.splice(todoIndex, 1);
  }

  return {
    newProject,
    newTodoList,
    editTodoList,
    getProjectList,
    getProjectTodoList,
    deleteProject,
    deleteTodoList
  }
}