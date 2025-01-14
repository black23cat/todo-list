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

export default function ManageProject(){
  const projects = [];

  const newProject = (name) => {
    projects.push(new Project(name));
    console.log(projects);
  };

  const addTodoList = ( projectIndex,
    title,
    dueDate,
    description,
    priority
    ) => {
      projects[projectIndex].todoList.push(new Todo(
        title, 
        dueDate, 
        description, 
        priority
      ));
  };

  const getProjectList = () => {
    const projectList = [];
    projects.forEach((project) => {
      projectList.push(project);
    });
    return projectList;
  };

  const getProjectTodoList = (projectIndex) => {
    const todoList = [];
    todoList.push(projects[projectIndex].todoList);
    console.log(todoList);
    return todoList;
  };

  const deleteProject = (projectIndex) => {
    projects.splice(projectIndex, 1);
  }

  return {
    newProject,
    addTodoList,
    getProjectList,
    getProjectTodoList,
    deleteProject
  }
}