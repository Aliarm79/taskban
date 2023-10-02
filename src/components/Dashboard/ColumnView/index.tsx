import { useRef } from "react";
import ColumnContainer from "./ColumnContainer";
import { useDraggable } from "react-use-draggable-scroll";
import style from "./style.module.css";
import Button from "../../Common/Form/Button";

const ColumnView: React.FC = (): JSX.Element => {
  const ref = useRef<any>();
  const { events } = useDraggable(ref);

  return (
    <div
      ref={ref}
      {...events}
      className={`flex gap-S overflow-auto h-full mr-S ${style.scroll}`}
      style={{ direction: "rtl" }}
    >
      <ColumnContainer />
      <ColumnContainer />
      <ColumnContainer />
      <ColumnContainer />
      <ColumnContainer />
      <Button
        text="تسک جدید"
        onClick={() => {}}
        type="button"
        className="z-20 bg-brand-primary text-white h-L text-sm leading-normal self-stretch rounded-md fixed bottom-[30px] p-S left-2XL"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          className: "ml-1",
        }}
      />
    </div>
  );
};

export default ColumnView;
