import "./styles.css";

const Screen = ({ children }) => {
  return <div className="container-screen fullscreen">{children}</div>;
};

const LeftSidebar = ({ children }) => {
  return <div className="container-left">{children}</div>;
};

const RightSidebar = ({ children }) => {
  return (
    <div className="container-right">
      <div className="container-right__content">{children}</div>
    </div>
  );
};

export { Screen, LeftSidebar, RightSidebar };
