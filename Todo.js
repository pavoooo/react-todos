import React, {Component} from 'react'
import './todo.css'

const TodoList = ({todos, deleteItem}) => {
    return (
        <ul>
            {
                todos && Array.isArray(todos) && todos.length > 0 &&
                todos.map(data => {
                    return <li key={data.id}>
                        {data.text}
                        <span style={{paddingLeft:"30px"}} onClick={deleteItem}>x</span>
                    </li>
                })
            }
        </ul>
    )
}

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:[

            ],
            currentId: 0
        }
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.charCode
        const value = e.target.value.trim()
        if(keyCode === 13 && value !== "") {
            this.setState((prevState) => {
                const id = prevState.currentId + 1
                prevState.todos.push({
                    id,
                    text: value
                })
                return {
                    todos: prevState.todos,
                    currentId: id
                }
            })
            e.target.value = ""
        }
    }

    handleDeleteItem(index) {
        if(index) {
            this.setState(prevState => {
                prevState.todos.splice(index, 1)
                return {
                    todos: prevState.todos
                }
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <input 
                        type="text" 
                        name="todo" 
                        placeholder="请输入待办任务,Enter键确认!"
                        onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                    <TodoList deleteItem={index => this.handleDeleteItem(index)} {...this.state}/>
                </div>
            </div>
        )
    }
}