import { useRef, useState, useEffect } from "react";
import ColumnContainer from "./ColumnContainer";
import style from "./style.module.css";
import Button from "../../Common/Form/Button";
import Icon from "../../Common/Icon";
import TaskModal from "../TaskModal";
import React from "react";
import NewBoardModal from "./NewBoardModal";
import { DragDropContext } from "react-beautiful-dnd";
import { IBoard } from "../../../interfaces/board";
import { useDraggable } from "react-use-draggable-scroll";
import { selectBoard } from "../../../features/board/boardSlice";
import { useSelector } from "react-redux";

const ColumnView: React.FC = (): JSX.Element => {
  const state = useSelector(selectBoard);
  const [boardTasks, setBoardTasks] = useState<IBoard[]>(state.boards || []);
  const [newBoardModal, setNewBoardModal] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(true);
  const [taskModal, setTaskModal] = useState<boolean>(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    isMounted: mouseDown,
  });

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const handleNewBoardModal = () => {
    setNewBoardModal(!newBoardModal);
  };

  const handleDragDrop = (results: any) => {
    const { source, destination } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const columnSourceIndex = boardTasks.findIndex((item) => {
      return item.name === source.droppableId;
    });
    const columnDestinationIndex = boardTasks.findIndex((item) => {
      return item.name === destination.droppableId;
    });
    const newSourceItems = [...boardTasks[columnSourceIndex].tasks];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...boardTasks[columnDestinationIndex].tasks]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItem);

    const newTaskColumns = [...boardTasks];
    newTaskColumns[columnSourceIndex] = {
      ...boardTasks[columnSourceIndex],
      tasks: newSourceItems,
    };
    newTaskColumns[columnDestinationIndex] = {
      ...boardTasks[columnDestinationIndex],
      tasks: newDestinationItems,
    };
    setBoardTasks(newTaskColumns);
  };

  useEffect(() => {
    setBoardTasks(state.boards);
  }, [state]);

  return (
    <>
      <div
        ref={ref}
        {...events}
        className={`flex w-full px-S h-full items-start gap-6 overflow-x-auto pb-4
         ${style.scroll}`}
        style={{ direction: "rtl" }}
      >
        {
          <DragDropContext onDragEnd={handleDragDrop}>
            {boardTasks?.map((item) => {
              return (
                <ColumnContainer
                  key={item.id}
                  {...item}
                  setMouseDown={setMouseDown}
                />
              );
            })}
          </DragDropContext>
        }

        <button
          onClick={handleNewBoardModal}
          className="flex w-[250px] h-[44px] py-XS px-[12px] items-center rounded-2xl shrink-0 shadow-taskColumn text-base font-medium"
        >
          <Icon icon="plus" size={20} />
          ساختن برد جدید
        </button>
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm  justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      {taskModal && <TaskModal modal={taskModal} setModal={handleTaskModal} />}
      {newBoardModal && (
        <NewBoardModal modal={newBoardModal} setModal={handleNewBoardModal} />
      )}
    </>
  );
};

export default ColumnView;
