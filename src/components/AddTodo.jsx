import { useState, useEffect } from 'react';
import {addToStorage, getLocalStorageItems} from '../utils/localStorage'

import PropTypes from 'prop-types'
import '../styles/index.css'
import cancelSvg from '../assets/cancel.svg'
import ButtonItem from './Button'

function AddTodo({ onCancel, hide, setTodos, dataRef}) {
    // stores the form inputs
    const [inputs, setInput] = useState({
        title: '',
        selectStatus: 'incomplete',
    })
    // populates the inputs if valid data and re-render
    useEffect(() => {
        if (dataRef.current) {
            setInput({
                title: dataRef.current.title,
                selectStatus: dataRef.current.selectStatus
            });
        }
    }, [dataRef]);

    function handleChange(e){
        const {name, value} = e.target
        setInput(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const todos = getLocalStorageItems();
        const newId = todos.length ? todos[todos.length - 1].id + 1 : 0;
        let newTodo;
        // assign new id if new todo, same id if editting prev todo
        if (!dataRef.current) {
            newTodo = { ...inputs, id: newId };
        } else {
            newTodo = { ...inputs, id: dataRef.current.id };
        }
        addToStorage(newTodo);

        const updatedTodos = getLocalStorageItems();
        setTodos(updatedTodos);

        onCancel();
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

                <ButtonItem text={`${dataRef.current ? "Update Task" : "Add Task"}`} styling="p-1 button--text--style md:text-xl md:p-2 mr-4 bg-green-300" />
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

AddTodo.propTypes = {
    onCancel: PropTypes.func,
    hide: PropTypes.bool,
    setTodos: PropTypes.func,
    dataRef: PropTypes.object
}

export default AddTodo;
