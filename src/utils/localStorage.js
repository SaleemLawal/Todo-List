function setLocalStorage() {
    if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([]));  
    }
    // const userData = JSON.parse(localStorage.getItem('todoList'));
    // console.log(userData);
}


function addToStorage(data) {
    // Get previous data
    const userData = JSON.parse(localStorage.getItem('todoList')) || [];

    const arr = [
        ...userData,
        data
    ];

    localStorage.setItem('todoList', JSON.stringify(arr));
}

function getLocalStorageItems(){
    const items = localStorage.getItem('todoList');
    return items ? JSON.parse(items) : [];
}

// eslint-disable-next-line no-unused-vars
function clearStorage(){
    localStorage.clear();
}

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
