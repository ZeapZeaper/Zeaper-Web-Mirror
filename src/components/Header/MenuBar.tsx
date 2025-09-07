"use client";

export interface MenuBarProps {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}
const MenuBar: React.FC<MenuBarProps> = ({ isSideBarOpen, toggleSideBar }) => {
  const toggleMenu = () => toggleSideBar();

  return (
    <>
      <div>
        <button className="relative group" onClick={toggleMenu}>
          <div className="relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all  duration-200">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div
                className={`bg-slate-900 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isSideBarOpen ? "translate-x-10" : "translate-x-0"
                } delay-75`}
              ></div>
              <div
                className={`bg-slate-900 h-[2px] w-3 rounded transform transition-all duration-300 ${
                  isSideBarOpen ? "translate-x-10" : "translate-x-0"
                } delay-75`}
              ></div>
              <div
                className={`bg-slate-900 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isSideBarOpen ? "translate-x-10" : "translate-x-0"
                } delay-150`}
              ></div>
            </div>
            <div
              className={`flex flex-col items-center justify-between transform transition-all duration-500  -translate-x-10 ${
                isSideBarOpen ? "translate-x-0" : "translate-x-10"
              } delay-300`}
            >
              <div
                className={`absolute bg-slate-900 h-[2px] w-7 transform transition-all duration-500 rotate-0 delay-300 ${
                  isSideBarOpen ? "rotate-45" : ""
                }`}
              ></div>
              <div
                className={`absolute bg-slate-900 h-[2px] w-7 transform transition-all duration-500 -rotate-0 delay-300 ${
                  isSideBarOpen ? "-rotate-45" : ""
                }`}
              ></div>
            </div>
          </div>
        </button>
      </div>

      {/* {renderContent()} */}
    </>
  );
};

export default MenuBar;
