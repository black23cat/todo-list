export default function ScreenDisplay(){
  const generateContentDisplay = ( parentNode ) => {
    clearParentNode( parentNode );
    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('new-todo');
    addTodoBtn.textContent = '+';
    parentNode.appendChild( addTodoBtn );
  }
  
  const updateProjectDisplay = ( parentNode, array ) => {
    clearParentNode( parentNode );
    array.forEach(( obj, index ) => {
      const projectBtnWrapper = document.createElement('div');
      const projectName = document.createElement('button');
      const deleteProjectBtn = document.createElement('button');
      projectBtnWrapper.classList.add('project-list-wrapper');
      projectName.textContent = obj.projectName;
      projectName.classList.add('project-btn');
      projectName.setAttribute('data-index', index);
      deleteProjectBtn.textContent = 'X';
      deleteProjectBtn.classList.add('delete-project');
      projectBtnWrapper.appendChild(projectName);
      projectBtnWrapper.appendChild(deleteProjectBtn);
      parentNode.appendChild(projectBtnWrapper);
    });
  }
  

  const clearParentNode = (parentNode) => {
    parentNode.textContent = '';
  }

  return {
    generateContentDisplay,
    updateProjectDisplay
  }
}