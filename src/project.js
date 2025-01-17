class Project {
  constructor(name){
    this.projectName = name;
    this.todoList = [];
  }
}

class Todo {
  constructor(title, dueDate, desc, priority, completed = false){
    this.title = title;
    this.dueDate = dueDate;
    this.description = desc;
    this.priority = priority;
    this.completed = completed;
  }

  updateValue(array){
    const [title, desc, dueDate, priority, completed] = array;
    this.title = title;
    this.dueDate = dueDate;
    this.description = desc;
    this.priority = priority;
    this.completed = (completed === 'true');
  }
}

export default function ManageProject(){
  const projects = [];

  const newProject = (name) => {
    projects.push(new Project(name));
  };

  const newTodoList = ( projectIndex, array ) => {
    const [title, description, dueDate, priority, completed = false] = array;
    projects[projectIndex].todoList.push(new Todo(
      title, 
      dueDate, 
      description, 
      priority,
      completed
    ));
  };

  const editTodoList = (projectIndex, todoIndex, array) => {
    projects[projectIndex].todoList[todoIndex].updateValue(array);
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
    if(projects[projectIndex] !== undefined){    
      projects[projectIndex].todoList.forEach((list) => {
        projectTodoList.push(list);
      });
    }
    
    return projectTodoList;
  };

  const deleteProject = (projectIndex) => {
    projects.splice(projectIndex, 1);
  }

  const deleteTodoList = (projectIndex, todoIndex) => {
    projects[projectIndex].todoList.splice(todoIndex, 1);
  }

  const updateStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  const getLocalStorage = () => {
    const projectStorage = JSON.parse(localStorage.getItem('projects'));

    for(let i = 0; i < projectStorage.length ; i++){
      projects.push(new Project(projectStorage[i].projectName));
      for(let j = 0 ; j < projectStorage[i].todoList.length ; j ++){
        const {title, description, dueDate, priority, completed} = projectStorage[i].todoList[j];
        projects[i].todoList.push(new Todo(title, dueDate, description, priority, completed))
      }
    }

  }

  if(localStorage.getItem('projects') === null){
    newProject('TEST PROJECT');
    newTodoList(0, ['TEST TITLE', 'Lorem ipsum dolor sit amet', '2025-02-01', 'low', false]);
    newTodoList(0, ['CHECKED TASKS', 'Consectetur adipiscing elit', '2025-02-12', 'medium', 'true']);
    newTodoList(0, ['TASKS', 'Phasellus feugiat nisi eu turpis', '2025-01-12', 'high', false]);
    updateStorage();
  } else {
    getLocalStorage();
  }

  return {
    newProject,
    newTodoList,
    editTodoList,
    getProjectList,
    getProjectTodoList,
    deleteProject,
    deleteTodoList,
    updateStorage,
    getLocalStorage
  }
}