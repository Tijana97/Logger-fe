import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.accountWrapper}>
        <Button>
          <AccountCircleIcon style={{ color: "white" }} />
        </Button>
        <h4>Name Surname</h4>
      </div>
      <div className={styles.titleWrapper}>
        <div className={styles.appTitle}>Logger</div>
      </div>
      <Button>
        <LogoutIcon style={{ color: "white" }} />
      </Button>
    </div>
  );
}

export default Navbar;
