import PropTypes from 'prop-types'
import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';
import '../styles/index.css'

const TodoItem = ({data, onDelete, editTodo}) => {
    // handle functionalities regarding delete and edit
    function handleDelete(){
        onDelete(data.id)        
    }

    function handleEdit(){
        editTodo(data)
    }
  return (
    <div className=" rounded-[10px] bg-item--bg--color flex items-center justify-between min-w-[310px] h-[75px] p-2 mt-2">
        <p className={`flex-grow ${data.selectStatus === 'incomplete' ? 'text-purle-text' : 'text-[#78CFB0] line-through'}`} id = {`element-${data.id}`}>      
            {data.title}
        </p>
        <div>
            <button>
                <img src={deleteSvg} alt="Delete" className='inline mr-2 md:mr-3' onClick={handleDelete}/>
            </button>
            <button>
                <img src={editSvg} alt="Edit" className='inline' onClick={handleEdit}/>
            </button>
        </div>
    </div>
  );
};

TodoItem.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    editTodo: PropTypes.func
}

export default TodoItem;
