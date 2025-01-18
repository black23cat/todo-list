import ManageProject from './project.js';
import ScreenDisplay from './screen-display.js';
import { lightFormat } from 'date-fns';

export default function event(){
  const project = ManageProject();
  const screen = ScreenDisplay();
  const sidebar = document.querySelector('.sidebar');
  const newProjectFormModal = document.querySelector('dialog.new-project-modal');
  const newProjectForm = document.querySelector('.new-project-form');
  const newTodoFormModal = document.querySelector('dialog.new-todo-modal')
  const newTodoForm = document.querySelector('.new-todo');
  const editTodoModal = document.querySelector('dialog.edit-todo-modal');
  const editTodoForm = document.querySelector('.edit-todo');
  const dueDateInput = document.querySelector('[name=due-date]');
  const mainContent = document.querySelector('.main-content');
  const projectsList = document.querySelector('.projects-list');
  let currentProjectIndex = 0;
  dueDateInput.setAttribute('min', lightFormat(new Date(), 'yyyy-MM-dd'));
  sidebar.addEventListener('click', sidebarEventHandler);
  newTodoForm.addEventListener('click', newTodoFormEventHandler);
  editTodoForm.addEventListener('click', editTodoFormHandler);
  mainContent.addEventListener('click', mainContentEventHandler);

  function sidebarEventHandler(event){
    const target = event.target;
    if(target.classList.contains('new-project')){
      newProjectFormModal.showModal();
    }
    if(target.id === 'submit'){
      const newProjectName = document.getElementById('name').value;
      newProjectFormModal.close()
      if(newProjectName === '') return;
      //CODE TO ADD NEW PROJECT
      project.newProject(newProjectName);
      screen.updateProjectDisplay(projectsList, project.getProjectList());
      newProjectForm.reset();
      project.updateStorage();
      
      return;
    }
    if(target.classList.contains('project-btn')){
      const projectList = document.querySelectorAll('.project-btn');
      for(let i = 0; i < projectList.length; i++){
        if(projectList[i].classList.contains('active')){
          projectList[i].classList.remove('active')
        }
      }
      target.classList.add('active');
      currentProjectIndex = target.parentNode.dataset.projectIndex;
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      return;
    }
    if(target.classList.contains('delete-project')){
      if(confirm('This will delete Project and all Todo list. Delete project?')){
        currentProjectIndex = target.parentNode.dataset.projectIndex;
        project.deleteProject(currentProjectIndex);
        project.updateStorage();
        screen.updateProjectDisplay(projectsList, project.getProjectList());
        screen.updateContentDisplay(mainContent);
      }
    }    
  }

  function newTodoFormEventHandler(event){
    const target = event.target;

    if(target.id === 'submit'){
      const formInput = [...newTodoForm.getElementsByTagName('input')]
                        .map(input => input.value);
      formInput.push(document.getElementById('priority').value);

      if(checkEmptyForm(formInput)){ return; }
      project.newTodoList(currentProjectIndex, formInput);
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      project.updateStorage();
      newTodoForm.reset();
      newTodoFormModal.close();
    }
    if(target.id === 'cancel'){
      newTodoForm.reset();
    }
  }

  function mainContentEventHandler (event) {
    const target = event.target;
    const todoCardIndex = target.parentNode.getAttribute('data-todo-index');

    if(target.classList.contains('new-todo')){
      newTodoFormModal.showModal();
    }

    if(target.classList.contains('edit')){
      const currentTodoList = 
        project.getProjectTodoList(currentProjectIndex)[todoCardIndex];

      document.getElementById('edit-title').value = currentTodoList.title;
      document.getElementById('edit-description').value = currentTodoList.description;
      document.getElementById('edit-due-date').value = currentTodoList.dueDate;
      document.getElementById('edit-priority').value = currentTodoList.priority;
      editTodoForm. setAttribute('data-todo-index', todoCardIndex);
      
      editTodoModal.showModal();
    }

    if(target.classList.contains('delete-todo')){
      mainContent.removeChild(target.parentNode);
      project.deleteTodoList(currentProjectIndex, todoCardIndex);
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex));
        
      project.updateStorage();
    }
  }

  function editTodoFormHandler(event){
    const target = event.target;
    if(target.id === 'edit-submit'){
      const todoCardIndex = editTodoForm.getAttribute('data-todo-index')
      const editFormInput = [...editTodoForm.getElementsByTagName('input')]
      .map(input => input.value); 
      editFormInput.push(document.getElementById('edit-priority').value);
      editFormInput.push(document.getElementById('completed').value);
      if(checkEmptyForm(editFormInput)){ return; };
   
      project.editTodoList(currentProjectIndex, todoCardIndex, editFormInput);
      screen.updateContentDisplay(mainContent, project.getProjectTodoList(currentProjectIndex));
      project.updateStorage();
      editTodoModal.close();
    }
    if(target.id === 'edit-cancel'){
      editTodoForm.reset();
    }
  }

  function checkEmptyForm(array){
    if(array.includes('')){
      alert('Fill the Fields');
      return true;
    }
  }
  
  screen.initialize(
    projectsList, mainContent, 
    project.getProjectList(), 
    project.getProjectTodoList(currentProjectIndex)
  );
}