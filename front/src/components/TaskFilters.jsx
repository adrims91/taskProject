

const TaskFilters = () => {

  
  
  

    return (
        <>
        <button className="border w-full mb-3 mt-10 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
            Para hoy
          </button>
          <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
            Pendientes
          </button>
          <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
            Completadas
          </button>
          <button className="border w-full mb-3  rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
            Todas
          </button>
          <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
            Caducadas
          </button>
          </>
    )
}

export default TaskFilters;