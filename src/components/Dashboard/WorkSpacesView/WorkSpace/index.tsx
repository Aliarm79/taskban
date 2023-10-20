import { useEffect, useRef, useState } from "react";
import WorkSpacesItem from "./WorkSpaceItem";
import { useDraggable } from "react-use-draggable-scroll";
import style from "./style.module.css";
import Icon from "../../../Common/Icon";
import API_URL from "../../../../constants/api.url";
import useAxios from "../../../../hooks/useAxios";
import ProjectModal from "../../ProjectModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { projectUpdate } from "../../../../features/updateSlice";
import { projects } from "../../../../constants/url";

interface IWorkSpaceProps {
  name: string;
  color: string;
  id: number;
}
const WorkSpace: React.FC<IWorkSpaceProps> = ({
  name,
  color,
  id,
}): JSX.Element => {
  const { pathname } = useLocation();
  const [response, error, loading, fetcher] = useAxios();
  const navigate = useNavigate();
  const [projectModal, setProjectModal] = useState<boolean>(false);
  const update = useSelector(projectUpdate);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const colorVariants = {
    grad: `linear-gradient(250deg, ${color} 0%, ${color}90 100%)`,
    btn: color,
  };

  const handleModal = () => {
    if (pathname === "/workspaces") {
      navigate(`${id}/${API_URL.Projects}`);
    } else {
      navigate(`/${projects.gets({ wid: id })}`);
    }
    setProjectModal(!projectModal);
  };

  useEffect(() => {
    fetcher("get", projects.gets({ wid: id }));
  }, [update]);

  return (
    <div
      ref={ref}
      {...events}
      className={`overflow-auto w-full ${style.scroll}`}
      style={{ direction: "rtl" }}
    >
      <div className="shrink-0 ">
        <div className="flex items-center gap-2">
          <h4 className="text-right text-2xl leading-8 font-extrabold">
            {name}
          </h4>
          <button className="mt-1.5" onClick={handleModal}>
            <Icon icon="plus_square" color={colorVariants.btn} size={24} />
          </button>
        </div>

        <div className="flex items-start gap-L my-L">
          {/* {loading ? 'در حال دریافت اطلاعات ...' : null} */}
          {response?.map((item) => {
            return (
              <WorkSpacesItem
                key={item.id}
                {...item}
                workspace_id={id}
                color={colorVariants.grad}
              />
            );
          })}
        </div>
        <div className=" w-full h-0.5 bg-gray-secondary"></div>
      </div>
      {projectModal && (
        <ProjectModal modal={projectModal} setModal={handleModal}  wid={id}/>
      )}
    </div>
  );
};

export default WorkSpace;
