import { formatDistance } from "date-fns";
import { lightFormat } from 'date-fns';
const todayDate = lightFormat(new Date(), 'yyyy-MM-dd');

export default function ScreenDisplay(){
  const updateContentDisplay = ( parentNode, array) => {
    clearParentNode( parentNode );
    if(array === undefined) return;
    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('new-todo');
    addTodoBtn.textContent = '+';
    parentNode.appendChild( addTodoBtn );
    generateContentDisplay(parentNode, array);
  }
  
  const updateProjectDisplay = ( parentNode, array ) => {
    clearParentNode( parentNode );
    if(array.length === 0) return;
    for(let i = 0; i < array.length ; i ++){
      const projectBtnWrapper = document.createElement('div');
      const projectName = document.createElement('button');
      const deleteProjectBtn = document.createElement('button');
      projectBtnWrapper.classList.add('project-list-wrapper');
      projectBtnWrapper.setAttribute('data-project-index', i);
      projectName.textContent = array[i].projectName;
      projectName.classList.add('project-btn');
      deleteProjectBtn.textContent = 'X';
      deleteProjectBtn.classList.add('delete-project');
      projectBtnWrapper.appendChild(projectName);
      projectBtnWrapper.appendChild(deleteProjectBtn);
      parentNode.appendChild(projectBtnWrapper);
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
      const priority = document.createElement('span');
      const deleteTodoBtn = document.createElement('button');
  
      card.classList.add('todo-card');
      card.setAttribute('data-todo-index', i);
      title.textContent = array[i].title;
      dueDate.textContent = ` Due 
              ${formatDistance( array[i].dueDate, todayDate, {addSuffix: true})}`;
      description.textContent = array[i].description;

      priority.textContent = array[i].priority.toUpperCase();
      priority.style.backgroundColor = 
        (array[i].priority === 'low') ? 'lightgreen' :
        (array[i].priority === 'medium') ? '#FFB52E' :
        '#FF0000';
      deleteTodoBtn.textContent = 'x';
      deleteTodoBtn.classList.add('delete-todo');

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
      card.appendChild(deleteTodoBtn);      
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