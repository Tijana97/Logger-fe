import { ReactNode, useEffect } from "react";
import styles from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Sidebar, { currentPageName } from "../sidebar/Sidebar";
import React from "react";
import { useRecoilState } from "recoil";
import { appState } from "../../recoil/atom/general";

interface ChildrenNode {
  children: ReactNode;
}

const Layout: React.FC<ChildrenNode> = ({ children }) => {
  const [title, setTitle] = useRecoilState(appState);

  useEffect(() => {
    setTitle(currentPageName());
  }, [setTitle]);

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.topnavWrapper}>
        <Navbar />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={styles.contentWrapper}>
          <h3>{title}</h3>
          <div> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
