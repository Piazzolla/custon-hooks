import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'


const initialState = [{
    id: 1,
    descrption: 'Piedra del Alma',
    done: false
}]

const init = () => {
    let res = JSON.parse(localStorage.getItem('todos'));
   
    if (res)
        return res;
    else
        return [];
    //JSON.parse(localStorage.getItem('todos') || [])
    //return initialState;
}


export const useTodo = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatchTodo(action);
    }

    const handleDeleteTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }


    const handleToggleTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }


    return {
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todoCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
}

