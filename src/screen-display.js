import { formatDistance } from "date-fns";
import { lightFormat } from 'date-fns';
import deleteICon from './images/delete.png';
import deleteTodoIcon from './images/delete-black.png';
const todayDate = lightFormat(new Date(), 'yyyy-MM-dd');

export default function ScreenDisplay(){
  const updateContentDisplay = ( parentNode, array) => {
    clearParentNode( parentNode );
    if(array === undefined) return;
    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('new-todo');
    addTodoBtn.textContent = 'New Tasks +';
    parentNode.appendChild( addTodoBtn );
    generateContentDisplay(parentNode, array);
  }
  
  const updateProjectDisplay = ( parentNode, array ) => {
    clearParentNode( parentNode );
    if(array.length === 0) return;
    for(let i = 0; i < array.length ; i ++){
      const projectListWrapper = document.createElement('div');
      const projectName = document.createElement('div');
      const deleteProject = document.createElement('img');
      projectListWrapper.classList.add('project-list-wrapper');
      projectListWrapper.setAttribute('data-project-index', i);
      projectName.textContent = array[i].projectName;
      projectName.classList.add('project-btn');
      deleteProject.classList.add('delete-project');
      deleteProject.src = deleteICon;
      deleteProject.setAttribute('width', '25px')
      projectListWrapper.appendChild(projectName);
      projectListWrapper.appendChild(deleteProject);
      parentNode.appendChild(projectListWrapper);
    };
  }
  
  const generateContentDisplay = ( parentNode, array ) => {
    if(array.length === 0 ){
      const contentPara = document.createElement('p');
      contentPara.textContent = 'No tasks.';
      parentNode.appendChild(contentPara);
    }
    for(let i = 0 ; i < array.length ; i++ ){
      const card = document.createElement('div');
      const title = document.createElement('h4');
      const dueDate = document.createElement('p');
      const description = document.createElement('p');
      const priority = document.createElement('div');
      const deleteTodo = document.createElement('img');
  
      card.classList.add('todo-card');
      card.setAttribute('data-todo-index', i);
      title.textContent = array[i].title;
      dueDate.textContent = ` Due 
              ${formatDistance( array[i].dueDate, todayDate, {addSuffix: true})}`;
      description.textContent = array[i].description;

      priority.textContent = `${array[i].priority.toUpperCase()} Priority`;
      priority.style.backgroundColor = 
        (array[i].priority === 'low') ? 'lightgreen' :
        (array[i].priority === 'medium') ? '#FFB52E' :
        '#FF0000';
      deleteTodo.src = deleteTodoIcon;
      deleteTodo.setAttribute('width', '30px')
      deleteTodo.classList.add('delete-todo');

      if(!array[i].completed){
        description.setAttribute('class', 'todo-desc edit');
      }else{
        description.setAttribute('class', 'todo-desc');
      }
      
      if(array[i].completed){
        card.classList.add('checked');
      }

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(dueDate);
      card.appendChild(priority);
      card.appendChild(deleteTodo);      
      parentNode.appendChild(card);
    }
  }

  const clearParentNode = (parentNode) => {
    parentNode.textContent = '';
  }

  const initialize = (projectNode, contentNode, projectArr, todoArr) => {   
    if(projectArr.length === 0 || projectArr === undefined) return;
    updateProjectDisplay(projectNode, projectArr);
    updateContentDisplay(contentNode, todoArr);

  }

  return {
    updateContentDisplay,
    updateProjectDisplay,
    initialize
  }
}