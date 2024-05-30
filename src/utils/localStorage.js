function setLocalStorage() {
    if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([]));  
    }
}

function addToStorage(data) {
    // Get previous data
    const userData = JSON.parse(localStorage.getItem('todoList')) || [];
    // checks if the new data id already exist before
    // if it does it replaces it otherwise it makes a new list of todos 
    const updatedData = userData.some(todo => todo.id === data.id)
        ? userData.map(todo => (todo.id === data.id ? data : todo))
        : [...userData, data];

    localStorage.setItem('todoList', JSON.stringify(updatedData));
}

function getLocalStorageItems(){
    const items = localStorage.getItem('todoList');
    return items ? JSON.parse(items) : [];
}

// function clearStorage(){
//     localStorage.clear();
// }

function removeItemFromStorage(id){
    // filters the arr and exclude the item with the id to be removed
    const items = getLocalStorageItems();
    const filteredItems = items.filter(item => item.id !== id);
    setLocalStorageItems(filteredItems)
}

function setLocalStorageItems(todos){
    localStorage.setItem('todoList', JSON.stringify(todos));     
}


export {setLocalStorage, addToStorage, getLocalStorageItems, removeItemFromStorage, setLocalStorageItems}
