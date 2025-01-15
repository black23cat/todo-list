import ManageProject from './project.js';
import ScreenDisplay from './screen-display.js';

export default function event(){
  const project = ManageProject();
  const screen = ScreenDisplay();
  const sidebar = document.querySelector('.sidebar');
  const newProjectForm = document.querySelector('.new-project-form');
  const newTodoForm = document.querySelector('.new-todo');
  const dueDateInput = document.querySelector('[name=due-date]');
  const content = document.querySelector('.content');
  const mainContent = document.querySelector('.main-content');
  const projectsList = document.querySelector('.projects-list');
  let currentProjectIndex = 0;
  dueDateInput.setAttribute('min', project.getTodayDate());
  sidebar.addEventListener('click', sidebarEventHandler);
  newTodoForm.addEventListener('click', newTodoFormEventHandler);
  mainContent.addEventListener('click', mainContentEventHandler);

  function sidebarEventHandler(event){
    const target = event.target;
    const formDisplay = newProjectForm.style.display;
    if(target.classList.contains('new-project')){
      if(formDisplay === 'none'){
        newProjectForm.style.display = 'block';
      }else{
        newProjectForm.style.display = 'none';
      }
      return;
    }
    if(target.id === 'submit'){
      const newProjectName = document.getElementById('name').value;
      newProjectForm.style.display = 'none';
      if(newProjectName === '') return;
      //CODE TO ADD NEW PROJECT
      project.newProject(newProjectName);
      screen.updateProjectDisplay(projectsList, project.getProjectList());
      newProjectForm.reset();
      
      console.log(project.getProjectList());
      return;
    }
    if(target.classList.contains('project-btn')){
      currentProjectIndex = target.parentNode.dataset.projectIndex;
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      console.log(currentProjectIndex);
      return;
    }
    if(target.classList.contains('delete-project')){
      currentProjectIndex = target.parentNode.dataset.projectIndex;
      project.deleteProject(currentProjectIndex);
      screen.updateProjectDisplay(projectsList, project.getProjectList());
      screen.updateContentDisplay(mainContent);
      console.log(project.getProjectList())
    }
  }

  function newTodoFormEventHandler(event){
    const target = event.target;

    if(target.id === 'submit'){
      const formInput = [...newTodoForm.getElementsByTagName('input')]
                        .map(input => input.value);
      formInput.push(document.getElementById('priority').value);

      if(formInput.includes('')){
        alert('Fill the fields');
        return;
      }
      project.newTodoList(currentProjectIndex, formInput);
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      newTodoForm.style.display = 'none';
    }
    if(target.id === 'cancel'){
      newTodoForm.reset();
      newTodoForm.style.display = 'none';
    }
  }

  function mainContentEventHandler (event) {
    const target = event.target;
    const todoCardIndex = target.parentNode.getAttribute('data-todo-index');

    if(target.classList.contains('new-todo')){
      newTodoForm.style.display = 'block';
      return;
    }
    if(target.classList.contains('delete-todo')){
      mainContent.removeChild(target.parentNode);
      console.log(target);
      project.deleteTodoList(currentProjectIndex, todoCardIndex);
      console.log(project.getProjectTodoList(currentProjectIndex));
      screen.updateContentDisplay(mainContent, project.getProjectTodoList(currentProjectIndex));
    }

  }

  screen.initialize(
    projectsList, mainContent, 
    project.getProjectList(), 
    project.getProjectTodoList(0)
  );
}
