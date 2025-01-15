import { formatDistance } from "date-fns";
import { lightFormat } from 'date-fns';

const todayDate = lightFormat(new Date(), 'yyyy-MM-dd');

class Project {
  constructor(name){
    this.projectName = name;
    this.todoList = [];
  }
}

class Todo {
  constructor(title, dueDate, desc, priority){
    this.title = title;
    this.dueDate = formatDistance(dueDate, todayDate, {addSuffix: true});
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

  const getTodayDate = () => {
    return todayDate;
  }

  return {
    newProject,
    newTodoList,
    getProjectList,
    getProjectTodoList,
    deleteProject,
    getTodayDate
  }
}