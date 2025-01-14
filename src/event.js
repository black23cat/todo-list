import ManageProject from './project.js';


export default function event(){
  const project = ManageProject();
  const sidebar = document.querySelector('.sidebar');
  const newProjectForm = document.querySelector('.new-project-form');


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
      newProjectForm.reset();
      
      console.log(project.getProjectList());
      return;
    }

  }














}