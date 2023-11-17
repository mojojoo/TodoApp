/** @format */

import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";

import Add from "../assets/Add.svg";
import TodoDataItems from "./TodoDataItems";

const TodoList = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [titleValue, setTitleValue] = useState("");
  const [infoValue, setInfoValue] = useState("");
  const [search, setSearch] = useState("");

  /* const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [datas, setData] = useState(storedTodos); */

  const [datas, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValue && !infoValue) return;
    setIsShowForm(false);
    const randomId = Math.random().toString(32);

    const newTodoItems = {
      title: titleValue,
      content: infoValue,
      done: false,
      id: randomId,
      date: new Date(),
    };

    /* const updatedTodos = [...datas, newTodoItems];
    setData(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); */

    setData([...datas, newTodoItems]);
    setTitleValue("");
    setInfoValue("");
  };

  const handleDelete = (id) => {
    const deleteBtn = datas.filter((item) => item.id !== id);

    setData(deleteBtn);
  };

  const handleToggleDone = (id) => {
    setData((prevData) =>
      prevData.map((items) =>
        items.id === id ? { ...items, done: !items.done } : items
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredTodos = datas.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const userItems = localStorage.getItem("item");

    setData(JSON.parse(userItems));
  }, []);

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(datas));
  }, [datas]);

  return (
    <div className="w-1/2 h-[400px] mx-auto rounded-xl bg-slate-400">
      <div
        className={`flex py-2 px-5 items-center mb-2 w-full ${
          isShowForm ? "justify-center" : "justify-between"
        }`}
      >
        <h1 className="font-bold text-[20px] text-[#f3f3f3]">TodoList</h1>
        {!isShowForm && (
          <div className="flex w-full justify-end px-3">
            <input
              onChange={handleSearchChange}
              id="search"
              className="py-2 px-5 rounded-l-lg w-full outline-none"
              type="text"
              placeholder="Search...."
            />
            <img
              htmlFor="search"
              src={Search}
              alt="Searc"
              className="bg-white px-2 rounded-r-lg cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="bg-white h-[320px] mx-4 rounded-lg relative">
        {!isShowForm && (
          <button
            onClick={() => setIsShowForm(true)}
            className="absolute z-50 bottom-10 right-10 bg-gray-400 p-2 rounded-full"
          >
            <img className="h-[25px]" src={Add} alt="Add" />
          </button>
        )}
        {!isShowForm ? (
          <div className="overflow-y-auto h-full relative rounded-tl-lg rounded-tr-lg">
            <div className="w-full shadow-md sticky z-10 top-0 bg-white mb-2">
              <h1 className="text-center">Your List</h1>
            </div>
            <ul className="lg:flex flex-wrap px-3 gap-4">
              {datas.length <= 0 ? (
                <p>No Todos</p>
              ) : (
                filteredTodos.map((items) => {
                  if (!items.id) return;
                  return (
                    <TodoDataItems
                      key={items.id}
                      item={items}
                      handleToggleDone={handleToggleDone}
                      handleDelete={handleDelete}
                    />
                  );
                })
              )}
            </ul>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="h-full p-3 flex flex-col justify-between"
            >
              <div className="flex flex-col">
                <label
                  className="font-bold text-[19px] text-center"
                  htmlFor="Title"
                >
                  Title
                </label>
                <input
                  value={titleValue}
                  className=" px-3 py-2 border-2 rounded-lg mt-3"
                  placeholder="Add Title"
                  type="text"
                  onChange={(e) => setTitleValue(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-center font-bold text-[19px] mb-3"
                  htmlFor="Info"
                >
                  Description
                </label>
                <textarea
                  value={infoValue}
                  className="border-2 rounded-lg px-2 py-4"
                  placeholder="Add Description..."
                  id="Info"
                  onChange={(e) => setInfoValue(e.currentTarget.value)}
                ></textarea>
              </div>
              <button className="bg-slate-500 text-white py-2 rounded-lg font-bold hover:bg-slate-600 transition-colors">
                Add
              </button>
              <button onClick={() => setIsShowForm(false)}>Cancel</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
