import { useState, useEffect } from "react";
import Icon from "../../Common/Icon";
import TaskList from "./TaskList";
import Button from "../../Common/Form/Button";
import TaskModal from "../TaskModal";
import { IBoard } from "../../../interfaces/board";
import { useSelector } from "react-redux";
import { selectBoard } from "../../../features/board/boardSlice";
import { useSearchParams } from "react-router-dom";

const ListShow: React.FC = (): JSX.Element => {
  const boards = useSelector(selectBoard).boards;
  const [listTasks, setListTaks] = useState<IBoard[]>(boards);
  const [isShown, setIsShown] = useState<boolean>(true);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  useEffect(() => {}, [boards]);

  return (
    <div style={{ direction: "rtl" }} className={`pr-S`}>
      <div className="flex items-center gap-XS my-L">
        <button className="h-6 inline" onClick={() => setIsShown(!isShown)}>
          <Icon icon="chevron_down_circle" size={24} />
        </button>
<<<<<<< HEAD
        <span className="dark:text-[#bac4c8] text-black text-xl font-extrabold">
          پروژه اول
=======
        <span className="text-black text-xl font-extrabold">
          {searchParams.get("project_name")}
>>>>>>> 7476e1f04be0dd63dc87f1bc5338f195c01e6eb1
        </span>
      </div>
      <div
        className={`${
          !isShown ? "opacity-0 -z-10" : "opacity-100 z-10"
        } relative flex flex-col items-end gap-XL mr-6 ml-12 transition-all duration-300 h-80 lg:h-[500px] xl:h-[750px] overflow-y-auto `}
      >
        {listTasks?.map((item) => {
          return <TaskList key={item.id} {...item} />;
        })}
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm flex-row-reverse justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      {taskModal && <TaskModal modal={taskModal} setModal={handleTaskModal} />}
    </div>
  );
};

export default ListShow;
