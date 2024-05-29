/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import '../styles/index.css'
import cancelSvg from '../assets/cancel.svg'
import ButtonItem from './Button'

import {addToStorage, getLocalStorageItems} from '../utils/localStorage'

// eslint-disable-next-line react/prop-types
function AddTodo({ onCancel, hide, setTodos, currTodoList, data}) {
    // stores the form inputs
    const [inputs, setInput] = useState({
        title: '',
        selectStatus: 'incomplete',
    })

    useEffect(() => {
        if (data) {
            setInput({
                title: data.title,
                selectStatus: data.selectStatus
            });
        }
    }, [data]);



    function handleSubmit(e){
        e.preventDefault();
        // make a new todo and add it to the storage
        const todos = getLocalStorageItems();
        const newId = todos.length ? todos[todos.length - 1].id + 1 : 0;
        const newTodo = { ...inputs, id: newId };

        addToStorage(newTodo)
        // update the state with the new todo also
        setTodos(() => {
            return [
                ...currTodoList, newTodo
            ]
        })
        // cancel the modal
        onCancel()
    }
    
    function handleChange(e){
        const {name, value} = e.target
        setInput(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }
    // form element
    const form = (
        <form id="form" className="bg-[#1D1825]" onSubmit={handleSubmit}>

            <button onClick={onCancel}>
                <img src={cancelSvg} alt="Cancel" className='' />
            </button>

            <div>
                <p>Add TODO</p>
                <label htmlFor='title'>Title</label>
                <input type="text" name = "title" value = {inputs.title} id='title' onChange={handleChange}/>

                <label htmlFor='selected'>Status</label>
                <select name='selectStatus' value={inputs.selectStatus} id='selected' onChange={handleChange}>
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                </select>

                <ButtonItem text={`${data ? "Update task " : "Add Task"}`} styling="p-1 button--text--style md:text-xl md:p-2 mr-4 bg-green-300" />
                <ButtonItem text="Cancel" styling="p-1 button--text--style md:text-xl md:p-2 bg-red-300" onPressed={onCancel} />
            </div>
        </form>
    );

    return (
        // toggles the form based on the hide property
        <div className={`modal ${hide ? 'visible' : 'hidden'}`} >
            {hide && form}
        </div>
    );
}

export default AddTodo;
