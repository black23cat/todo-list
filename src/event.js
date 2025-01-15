import ManageProject from './project.js';
import ScreenDisplay from './screen-display.js';

export default function event(){
  const project = ManageProject();
  const screen = ScreenDisplay();
  const sidebar = document.querySelector('.sidebar');
  const newProjectForm = document.querySelector('.new-project-form');
  const addTodoForm = document.querySelector('.add-todo');
  const dueDateInput = document.querySelector('[name=due-date]');
  const content = document.querySelector('.content');
  const mainContent = document.querySelector('.main-content');
  const projectsList = document.querySelector('.projects-list');
  let currentProjectIndex;
  dueDateInput.setAttribute('min', project.getTodayDate());
  sidebar.addEventListener('click', sidebarEventHandler);
  content.addEventListener('click', contentEventHandler);

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
      currentProjectIndex = target.dataset.index;
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      console.log(currentProjectIndex);
      return;
    }
  }

  function contentEventHandler(event){
    const target = event.target;

    if(target.classList.contains('new-todo')){
      addTodoForm.style.display = 'block';
      return;
    }

    if(target.id === 'submit'){
      const formInput = [...addTodoForm.getElementsByTagName('input')].map(input => input.value);
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
      addTodoForm.style.display = 'none';
    }
    if(target.id === 'cancel'){
      addTodoForm.reset();
      addTodoForm.style.display = 'none';
    }
  }
}
