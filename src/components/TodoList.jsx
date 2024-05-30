import { useState, useEffect, useRef } from 'react';
import {getLocalStorageItems, setLocalStorageItems} from '../utils/localStorage'

import '../styles/index.css'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import Button from './Button'

const TodoList = () => {
    const [selected, setSelected] = useState('all')
    const [showForm, setFormShow] = useState(false)
    const [todos, setTodos] = useState([])
    const currDataRef = useRef(null);


    useEffect(() => {
        setTodos(getLocalStorageItems())
    }, [])
    
    // main deletion function 
    const handleDelete = (id) => {
        // filters the id
        const updatedTodos = todos.filter(todo => todo.id !== id);
        // update state and local storage
        setTodos(updatedTodos);
        setLocalStorageItems(updatedTodos);
    };
    
    const handleChange = (e) => {
        // gets the input of selected
        setSelected(e.target.value)
    }
    
    const showModal = () => {
        setFormShow(true)
    };
    
    const handleCancel = () => {
        currDataRef.current = null
        setFormShow(false)
    };

    const editTodoItem = (data) => {
        currDataRef.current = data
        setFormShow(true)
    }

    const data = getLocalStorageItems()
    // filters the task based on completion
    const incompleteTasks = data.filter(task => task.selectStatus === 'incomplete');
    const completedTasks = data.filter(task => task.selectStatus === 'completed');
    
    const incompleteTasksList = incompleteTasks.map((currData) => (
        <TodoItem key = {currData.id} data = {currData} onDelete = {handleDelete} editTodo = {editTodoItem}/>
    ))

    const completedTasksList = completedTasks.map((currData) => (
        <TodoItem key = {currData.id} data = {currData} onDelete={handleDelete} editTodo = {editTodoItem}/>
    ))


    const displayAll = 
        <>
            <h2 className='mt-4 text-base font-normal text-white md:mt-9'> Task to do {incompleteTasks.length === 0 ? "" : `- ${incompleteTasks.length}`}</h2>
            {incompleteTasksList}
            <h2 className='mt-4 text-base font-normal text-white md:mt-9'> Done {completedTasks.length === 0 ? "" : `- ${completedTasks.length}`}</h2>
            {completedTasksList}

        </>
        
    const displayCompleted = 
        <>
            <h2 className='mt-4 text-base font-normal text-white md:mt-9'> Done {completedTasks.length === 0 ? "" : `- ${completedTasks.length}`}</h2>
            {completedTasksList}
        </>
        
    const displayIncomplete = 
        <>
            <h2 className='mt-4 text-base font-normal text-white md:mt-9'> Task to do {incompleteTasks.length === 0 ? "" : `- ${incompleteTasks.length}`}</h2>
            {incompleteTasksList}
        </>
        
    function handleDisplay() {
        if (selected === 'all') {
            return displayAll 
        } else if (selected === 'completed') {
            return displayCompleted
        }else{
            return displayIncomplete 
        }
    }
    const mainButtonSvg = (
        <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline w-5 h-5 ml-3 md:w-7 md:h-7"
        >
        <rect width="40" height="40" rx="10" fill="#9E78CF" />
        <path
            d="M32 21C32 21.2652 31.8946 21.5196 31.7071 21.7071C31.5196 21.8946 31.2652 22 31 22H21V32C21 32.2652 20.8946 32.5196 20.7071 32.7071C20.5196 32.8946 20.2652 33 20 33C19.7348 33 19.4804 32.8946 19.2929 32.7071C19.1054 32.5196 19 32.2652 19 32V22H9C8.73478 22 8.48043 21.8946 8.29289 21.7071C8.10536 21.5196 8 21.2652 8 21C8 20.7348 8.10536 20.4804 8.29289 20.2929C8.48043 20.1054 8.73478 20 9 20H19V10C19 9.73478 19.1054 9.48043 19.2929 9.29289C19.4804 9.10536 19.7348 9 20 9C20.2652 9 20.5196 9.10536 20.7071 9.29289C20.8946 9.48043 21 9.73478 21 10V20H31C31.2652 20 31.5196 20.1054 31.7071 20.2929C31.8946 20.4804 32 20.7348 32 21Z"
            fill="white"
        />
        </svg>
    )
    
  return (
    <div className=" mt-2 min-h-[850px] w-[390px] overflow-hidden rounded-lg bg-[#1D1825] p-3 md:mt-7 md:min-h-[758px] md:w-[585px] md:rounded-[20px] md:p-10">
      {/* Makes the two action buttons */}
        <div className='flex items-center justify-between'>
            <Button text ="Add Task" onPressed = {showModal} svg = {mainButtonSvg} styling = "p-1 bg-item--bg--color button--text--style md:text-xl md:p-2"/>
        {/* Makes the selected option */}
        <select name="selectedListing" defaultValue="All" className="p-1 bg-item--bg--color button--text--style md:text-xl md:p-2" onChange={handleChange}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
        </select>
        </div>
        {handleDisplay()}
        {/* Render Add to do only when showForm == true */}
        {showForm && <AddTodo onCancel={handleCancel} hide = {showForm} setTodos = {setTodos} dataRef = {currDataRef}/>}
    
    </div>
  );
};
export default TodoList;
