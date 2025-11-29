import { useEffect, useState } from 'react'
import Nav from './components/Navbar.jsx'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])


useEffect(() => {
  let data = localStorage.getItem("data")
  if (data) {
    settodos(JSON.parse(data))
  }
}, []) 

  let storage = () => {
    localStorage.setItem("data", JSON.stringify(todos))
  }

  const HandleEdit = (e, id) => {
    let item = todos.find((todo) => todo.id === id)
    settodo(item.todo)
    let newtodos = todos.map((todo) => todo.id === id ? { ...todo, isediting: true } : todo)
    settodos(newtodos)
    storage()
  }

  const HandleDelete = (e) => {
    let id = e.target.id
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    settodos(newtodos)
    storage()
  }


  const HandleAdd = () => {
    let editingTodo = todos.find((item) => item.isediting)
    if (editingTodo) {
      let newtodos = todos.map((item) => item.id === editingTodo.id ? { ...item, todo, isediting: false, iscompleted: false } : item)
      settodos(newtodos)
    } else {
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    }
    settodo("")
  }


  const HandleChange = (e) => {
    settodo(e.target.value)
  }


  const HandleCheck = (e) => {
    let id = e.target.id
    todos.filter((item) => {
      if (item.id === id) {
        item.iscompleted = !item.iscompleted
      }
      settodos([...todos])
    }
    )
    storage()
  }

  return (
    <>
      <Nav />
      <div className="container  mx-auto bg-violet-300 my-3 p-3 rounded-xl min-h-[90vh] transition-all">

        <div className="flex justify-center mt-2">
          <div className="font-bold flex">
            <h2 className='text-2xl mr-3 text-nowrap'>Add a Todo</h2>
            <input onChange={HandleChange} value={todo} className='bg-white border-2 rounded-lg mr-2 p-1 w-80' type="text" />
            <button onClick={HandleAdd} className='cursor-pointer rounded-lg ml-2 text-lg border-2 px-1 transition-all hover:scale-105'>Save</button>
          </div>
        </div>


        <div className="todos transition-all">
          <h1 className='flex font-bold justify-center items-center text-2xl mt-6'>Your Todo's</h1>
          {todos.length === 0 && <h2 className='flex justify-center items-center mt-3 text-lg'>No Todo's Added</h2>}
          {todos.map((item, index) => (
            <div key={index}>

              <div className="todo flex justify-between items-center border-none bg-purple-500 rounded-lg p-3 m-3 transition-all">
                <div className="todo-text flex items-center gap-3">
                  <input onChange={HandleCheck} type="checkbox" checked={item.iscompleted} id={item.id} />
                  <div className={!item.iscompleted ? "text text-white" : "text text-white line-through"}>{item.todo}</div>
                </div>

                <div className="buttons flex gap-2 mr-2">
                  <button onClick={(e) => { HandleEdit(e, item.id) }} className=' cursor-pointer border rounded-lg px-2 py-1 text-white bg-blue-600 border-none transition-all hover:scale-110'>Edit</button>
                  <button onClick={HandleDelete} className=' cursor-pointer border rounded-lg px-2 py-1 text-white bg-blue-600 border-none transition-all hover:scale-110' id={item.id} >Delete</button>
                </div>

              </div>
            </div>
          ))}



        </div>
      </div>
    </>
  )
}

export default App
