import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import styles from "./Sidebar.module.css";
import { useRecoilState } from "recoil";
import { appState } from "../../recoil/atom/general";

export const currentPageName = () => {
  switch (window.location.pathname) {
    case "/invoices":
      return "Invoices";
    case "/logs":
      return "Logs";
    case "/contracts":
      return "Contracts";
    case "/companies":
      return "Companies";
    default:
      return "Contracts";
  }
};

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [page, setPage] = useRecoilState(appState);

  /* useEffect(() => {
    setPage(currentPageName());
  }, [setPage]);

  useEffect(() => {
    console.log("testbest Sidebar", page);
  }, [page]); */

  return (
    <div className={styles.sidebarWrapper}>
      <Button
        className={styles.hamburgerMenu}
        onClick={() => setShowMenu(!showMenu)}
      >
        <MenuIcon style={{ color: "#173547" }} />
      </Button>
      {showMenu && (
        <div>
          <ul className={styles.listWrapper}>
            <li
              className={
                currentPageName() === "Contracts"
                  ? styles.listItemStyleActive
                  : styles.listItemStyleInactive
              }
            >
              <Link
                className={styles.linkStyle}
                to="/contracts"
                onClick={(e) => {
                  console.log("testbest Sidebar 1", page);
                  setPage("Contracts");
                }}
              >
                Contracts
              </Link>
            </li>
            <li
              className={
                currentPageName() === "Logs"
                  ? styles.listItemStyleActive
                  : styles.listItemStyleInactive
              }
            >
              <Link
                className={styles.linkStyle}
                to="/logs"
                onClick={(e) => {
                  console.log("testbest Sidebar 2", page);
                  setPage("Logs");
                }}
              >
                Logs
              </Link>
            </li>
            <li
              className={
                currentPageName() === "Invoices"
                  ? styles.listItemStyleActive
                  : styles.listItemStyleInactive
              }
            >
              <Link
                className={styles.linkStyle}
                to="/invoices"
                onClick={(e) => {
                  console.log("testbest Sidebar 3", page);
                  setPage("Invoices");
                }}
              >
                Invoices
              </Link>
            </li>
            <li
              className={
                currentPageName() === "Companies"
                  ? styles.listItemStyleActive
                  : styles.listItemStyleInactive
              }
            >
              {
                <Link
                  className={styles.linkStyle}
                  to="/companies"
                  onClick={(e) => {
                    console.log("testbest Sidebar 4", page);
                    setPage("Companies");
                  }}
                >
                  Companies
                </Link>
              }
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
