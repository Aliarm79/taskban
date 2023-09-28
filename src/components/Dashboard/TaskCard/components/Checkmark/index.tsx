import Icon from "../../../../Common/Icon";

const Checkmark: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-end items-center gap-0.5">
      <span className="text-[#BDC0C6] text-xs leading-5 font-normal">
        ۲ / ۱۲
      </span>
      <div className="flex w-4 h-4 justify-center items-center">
        <Icon size={18} icon="check_round_square" color="#BDC0C6"/>
      </div>
    </div>
  );
};
export default Checkmark;
