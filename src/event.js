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

      if(checkEmptyForm(formInput)){ return; }
      project.newTodoList(currentProjectIndex, formInput);
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex)
      );
      newTodoForm.reset();
      newTodoFormModal.close();
      console.log(formInput)
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
      console.log(target);
      project.deleteTodoList(currentProjectIndex, todoCardIndex);
      console.log(project.getProjectTodoList(currentProjectIndex));
      screen.updateContentDisplay(
        mainContent, 
        project.getProjectTodoList(currentProjectIndex));
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

      console.log(editFormInput)
    
      project.editTodoList(currentProjectIndex, todoCardIndex, editFormInput);
      screen.updateContentDisplay(mainContent, project.getProjectTodoList(currentProjectIndex));
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
  //////////////// INITIAL RENDER ////////////////
  project.newProject('TEST');
  project.newTodoList( currentProjectIndex, ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', '2028-01-01', 'low'] );
  project.newTodoList( currentProjectIndex, ['TEST CHECKED', 'Proin non nulla id nisl tempor tempus', '2028-01-01', 'medium', 'true']);
  project.newTodoList( currentProjectIndex, ['TEST ', 'In hac habitasse platea dictumst.', '2028-01-01', 'high']);
  screen.initialize(
    projectsList, mainContent, 
    project.getProjectList(), 
    project.getProjectTodoList(currentProjectIndex)
  );
  /////////////////////////////////////////////////
}
