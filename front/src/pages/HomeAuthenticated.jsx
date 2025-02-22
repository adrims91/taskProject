import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import TaskFilters from "../components/TaskFilters"

const HomeAuthenticated = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col w-screen sm:w-60 pt-10 bg-white p-3">
          <div className="flex">
            <img
              className="size-12 rounded-full"
              src="../../images/Logo.webp"
              alt=""
            />
            <h1 className="text-2xl ml-3 font-bold underline">Task Center</h1>
          </div>
          
          <TaskFilters />

          <div className="grid grid-cols-1 h-50 w-full mt-5 items-center">
            <ul className="grid-cols-subgrid">
              <li className="font-bold">Tareas para hoy: </li>
              <li className="font-bold">Tareas para esta semana: </li>
              <li className="font-bold">Tareas para este mes: </li>
            </ul>
          </div>
            <TaskInput />
        </div>
        <div className="flex flex-1 justify-center">
          <div>
            <h1 className="text-6xl items-center mt-10 mb-10">Tareas</h1>
            <div className="w-full">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAuthenticated;
