import style from "./LEDIndicator.module.css";

const LEDIndicator = ({ status }: { status: boolean }) => {
  return (
    <div
      className={
        status ? style.indicatorActiveStyle : style.indicatorInactiveStyle
      }
    ></div>
  );
};

export default LEDIndicator;
