import ManageProject from './project.js';
import ScreenDisplay from './screen-display.js';


export default function event(){
  const project = ManageProject();
  const screen = ScreenDisplay();
  const sidebar = document.querySelector('.sidebar');
  const newProjectForm = document.querySelector('.new-project-form');
  const projectsList = document.querySelector('.projects-list');
  const content = document.querySelector('.content');
  const mainContent = document.querySelector('.main-content');

  let currentProjectIndex;


  sidebar.addEventListener('click', sidebarEventHandler);

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
      screen.generateContentDisplay(mainContent);
      console.log(currentProjectIndex);
      return;
    }
  }














}