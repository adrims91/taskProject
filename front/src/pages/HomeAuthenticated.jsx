import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import TaskFilters from "../components/TaskFilters";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { parseISO, startOfWeek, endOfWeek, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";

const HomeAuthenticated = () => {
  const { state: authState } = useContext(AuthContext);
  const [today, setToday] = useState([]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);

  useEffect(() => {
    const getTodayTasks = async (userId) => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          data.tasks.map((task) => {
            if (
              task.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
            ) {
              setToday(prevState => [...prevState, task]);
            }
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getTodayTasks(authState.user._id);
  }, []);

  useEffect(() => {
    const getWeekTasks = async (userId) => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          const today = new Date();
          const startWeek = startOfWeek(today);
          const endWeek = endOfWeek(today);

          data.tasks.map((task) => {
            const taskDate = parseISO(task.date);
            if (
              isWithinInterval(taskDate, { start: startWeek, end: endWeek })
            ) {
              setWeek(prevState => [...prevState, task]);
            }
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getWeekTasks(authState.user._id);
  }, []);

  useEffect(() => {
    const getMonthTasks = async (userId) => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          const today = new Date();
          const startMonth = startOfMonth(today);
          const endMonth = endOfMonth(today);

          data.tasks.map((task) => {
            const taskDate = parseISO(task.date);
            if (
              isWithinInterval(taskDate, { start: startMonth, end: endMonth })
            ) {
              setMonth(prevState => [...prevState, task]);
            }
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getMonthTasks(authState.user._id);
  }, []);


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
              <li className="font-bold">Tareas para hoy: {today.length}</li>
              <li className="font-bold">Tareas para esta semana: {week.length}</li>
              <li className="font-bold">Tareas para este mes: {month.length} </li>
            </ul>
          </div>
          <TaskInput />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="w-full lg:w-250 text-center">
            <h1 className="text-6xl items-center mt-10">Tareas</h1>
            <div className="mt-20">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomeAuthenticated;
