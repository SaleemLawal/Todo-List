import Header from './components/Header'
import TodoList from './components/TodoList'
import {setLocalStorage} from './utils/localStorage'
import {useEffect} from 'react'

function App() {
  useEffect(() => {
    setLocalStorage()
  }, [])
  
  return (
    <div className='flex flex-col items-center '>
      <Header />
      <TodoList />
    </div>
  )
}

export default App
