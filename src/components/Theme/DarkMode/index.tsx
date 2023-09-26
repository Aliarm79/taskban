import Icon from "../../Common/Icon";

const DarkMode: React.FC = () => {
  return (
    <span className="flex items-center justify-end w-[58px] bg-lightgray_200 rounded-md cursor-pointer">
      <Icon icon="sun" color="#818181" className="bg-white m-1 rounded-md w-[50%] flex justify-center"/>
    </span>
  );
};

export default DarkMode;
