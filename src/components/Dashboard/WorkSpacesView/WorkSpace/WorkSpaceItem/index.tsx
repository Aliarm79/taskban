import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../../../../constants/api.url";
import { boards } from "../../../../../constants/url";

interface IWorkSpacesItemProps {
  color: string;
  name: string;
  id: number;
  workspace_id: number;
}
const WorkSpacesItem: React.FC<IWorkSpacesItemProps> = ({
  color,
  name,
  id,
  workspace_id,
}): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (pathname === "/workspaces") {
      navigate(`/${boards.gets({ wid: workspace_id, pid: id })}`);
    } else {
      navigate(`${id}/${API_URL.Boards}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-center w-[200px] cursor-pointer shrink-0 h-20 py-[26px] pr-[71px] pl-[67px] items-center rounded-2xl shadow-taskColumn text-white text-base font-extrabold"
      style={{ background: `${color}` }}
    >
      {name}
    </div>
  );
};

export default WorkSpacesItem;
