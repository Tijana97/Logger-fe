import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Menu,
  MenuItem,
  TablePagination,
} from "@mui/material";
import LEDIndicator from "../../components/LEDIndicator/LEDIndicator";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Contracts.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import React from "react";
import { number } from "yup";

const columnData = {
  columns: [
    {
      field: "companyName",
      type: "string",
      sortable: true,
      headerName: "Company Name",
      width: 70,
    },
    {
      field: "hourlyRate",
      type: "number",
      sortable: true,
      headerName: "Hourly Rate",
      width: 130,
    },
    {
      field: "startDate",
      type: "string",
      sortable: true,
      headerName: "Start Date",
      width: 130,
    },
    {
      field: "endDate",
      type: "string",
      sortable: true,
      headerName: "End Date",
      width: 130,
    },
    {
      field: "isActive",
      type: "boolean",
      headerName: "Status",
      sortable: true,
      width: 60,
    },
    {
      field: "actions",
      type: "boolean",
      headerName: "Actions",
      sortable: false,
      width: 60,
    },
  ],
};

const Contracts = () => {
  const [contractsTableData, setContractsTableData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [contractId, setContractId] = useState<string>("");
  const [anchorElCompany, setAnchorElCompany] =
    React.useState<null | HTMLElement>(null);
  const [anchorElDate, setAnchorElDate] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElStatus, setAnchorElStatus] =
    React.useState<null | HTMLElement>(null);
  const openCompany = Boolean(anchorElCompany);
  const openDate = Boolean(anchorElDate);
  const openStatus = Boolean(anchorElStatus);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [companyFilter, setCompanyFilter] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);

  const handleClickCompany = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCompany(event.currentTarget);
    setCompanyMenuOpen(true);
    setDateMenuOpen(false);
    setStatusMenuOpen(false);
  };
  const handleCloseCompany = () => {
    setAnchorElCompany(null);
    setCompanyMenuOpen(false);
    setAnchorElCompany(null);
  };

  const handleClickDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
    setDateMenuOpen(true);
    setStatusMenuOpen(false);
    setCompanyMenuOpen(false);
  };
  const handleCloseDate = () => {
    setAnchorElDate(null);
    setDateMenuOpen(false);
    setAnchorElDate(null);
  };

  const handleClickStatus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStatus(event.currentTarget);
    setStatusMenuOpen(true);
    setCompanyMenuOpen(false);
    setDateMenuOpen(false);
  };
  const handleCloseStatus = () => {
    setAnchorElStatus(null);
    setStatusMenuOpen(false);
    setAnchorElStatus(null);
  };

  const handleClickButton = (
    columnName: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (columnName === "Start Date") {
      handleClickDate(event);
    } else if (columnName === "Company Name") {
      handleClickCompany(event);
    } else if (columnName === "Status") {
      handleClickStatus(event);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.get(
      `http://localhost:8080/contracts/me?skip=0`,
      config
    );
    const tableDataList = response.data.results.map((el: any) => {
      return el.contracts;
    });
    setTotalCount(response.data.totalCount);
    setContractsTableData(tableDataList);
  };

  const handleFilterChange = async (event: any) => {
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    if (companyFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=0&company=${companyFilter}`,
        config
      );
      console.log("DATUM:", dateFilter);
      console.log("FIRMA: ", companyFilter);
      console.log("STATUS", statusFilter);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else if (dateFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=0&dateStart=${dateFilter}`,
        config
      );
      console.log("DATUM:", dateFilter);
      console.log("FIRMA: ", companyFilter);
      console.log("STATUS", statusFilter);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });

      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else if (statusFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=0&status=${statusFilter}`,
        config
      );
      console.log("DATUM:", dateFilter);
      console.log("FIRMA: ", companyFilter);
      console.log("STATUS", statusFilter);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=0`,
        config
      );
      console.log("DATUM:", dateFilter);
      console.log("FIRMA: ", companyFilter);
      console.log("STATUS", statusFilter);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    }
  };

  // useEffect()

  const handlePageChange = async (event: any, page: any) => {
    let newSkip = 5;
    if (page < currentPage) newSkip *= -1;
    setCurrentPage(page);
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    console.log("MOLIM TE", companyFilter);
    if (companyFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=${
          skip + newSkip
        }&company=${companyFilter}`,
        config
      );
      setSkip(skip + newSkip);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else if (dateFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=${
          skip + newSkip
        }&dateStart=${dateFilter}`,
        config
      );
      setSkip(skip + newSkip);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else if (statusFilter != null) {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=${
          skip + newSkip
        }&status=${statusFilter}`,
        config
      );
      setSkip(skip + newSkip);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    } else {
      const response = await axios.get(
        `http://localhost:8080/contracts/me?skip=${skip + newSkip}`,
        config
      );
      setSkip(skip + newSkip);
      const tableDataList = response.data.results.map((el: any) => {
        return el.contracts;
      });
      setTotalCount(response.data.totalCount);
      setContractsTableData(tableDataList);
    }
  };
  const handleEndDate = async () => {
    const data = { endDate: endDate, isActive: true };

    const response = await axios.put(
      `http://localhost:8080/contracts/${contractId}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setIsModalOpen(false);
    fetchTableData();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columnData.columns.map((column) => (
              <TableCell key={column.headerName}>
                <div className={styles.TitleDiv}>
                  {column.headerName}
                  {column.headerName === "Company Name" ||
                  column.headerName === "Start Date" ||
                  column.headerName === "Status" ? (
                    <div className={styles.ArrowCellWrapper}>
                      <Button
                        onClick={(event) =>
                          handleClickButton(column.headerName, event)
                        }
                      >
                        <ExpandCircleDownIcon
                          style={{
                            color: "#355E76",
                            cursor: "pointer",
                            fontSize: "medium",
                            marginLeft: "8px",
                          }}
                        />
                      </Button>
                      {companyMenuOpen && (
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorElCompany}
                          open={openCompany}
                          onClose={handleCloseCompany}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            value={1}
                            onClick={(event) => {
                              setCompanyFilter(1);
                              setDateFilter(null);
                              setStatusFilter(null);
                              handleCloseCompany();
                              handleFilterChange(event);
                            }}
                          >
                            A - Z
                          </MenuItem>
                          <MenuItem
                            value={0}
                            onClick={(event) => {
                              setCompanyFilter(0);
                              setDateFilter(null);
                              setStatusFilter(null);
                              handleCloseCompany();
                              handleFilterChange(event);
                            }}
                          >
                            Z - A
                          </MenuItem>
                        </Menu>
                      )}
                      {dateMenuOpen && (
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorElDate}
                          open={openDate}
                          onClose={handleCloseDate}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            value={0}
                            onClick={(event) => {
                              console.log("hehe");
                              setDateFilter(1);
                              setStatusFilter(null);
                              setCompanyFilter(null);
                              handleCloseDate();
                              handleFilterChange(event);
                            }}
                          >
                            Oldest to Newest
                          </MenuItem>
                          <MenuItem
                            value={1}
                            onClick={(event) => {
                              console.log("hihi");
                              setCompanyFilter(null);
                              setStatusFilter(null);
                              setDateFilter(0);
                              handleCloseDate();
                              handleFilterChange(event);
                            }}
                          >
                            Newest to Oldest
                          </MenuItem>
                        </Menu>
                      )}
                      {statusMenuOpen && (
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorElStatus}
                          open={openStatus}
                          onClose={handleCloseStatus}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            value={1}
                            onClick={(event) => {
                              setStatusFilter(0);
                              setDateFilter(null);
                              setCompanyFilter(null);
                              handleFilterChange(event);
                              handleCloseStatus();
                            }}
                          >
                            Active
                          </MenuItem>
                          <MenuItem
                            value={0}
                            onClick={(event) => {
                              setStatusFilter(1);
                              setDateFilter(null);
                              setCompanyFilter(null);
                              handleFilterChange(event);
                              handleCloseStatus();
                            }}
                          >
                            Concluded
                          </MenuItem>
                        </Menu>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {contractsTableData.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                key={row.id + "-companyName"}
                component="th"
                scope="row"
              >
                {row.companyName}
              </TableCell>
              <TableCell key={row.id + "-hourlyRate"} align="left">
                {row.hourlyRate}
              </TableCell>
              <TableCell key={row.id + "-startDate"} align="left">
                {new Date(row.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell key={row.id + "-endDate"} align="left">
                {row.endDate
                  ? new Date(row.endDate).toLocaleDateString()
                  : "Unknown"}
              </TableCell>
              <TableCell key={row.id + "-isActive"} align="left">
                <LEDIndicator status={Boolean(row.isActive)} />
              </TableCell>
              <TableCell
                key={row.id + "-actions"}
                align="left"
                //style={{ cursor: "pointer" }}
              >
                <EditIcon
                  style={{ color: "#355E76", cursor: "pointer" }}
                  onClick={() => {
                    setIsModalOpen(true);
                    setContractId(row._id);
                    setEndDate(
                      row.endDate === "Unknown"
                        ? new Date()
                        : new Date(row.endDate)
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          key="pagination-component"
          rowsPerPageOptions={[5]}
          component="div"
          count={totalCount}
          rowsPerPage={5}
          page={currentPage}
          onPageChange={async (event: any, page) =>
            await handlePageChange(event, page)
          }
          onRowsPerPageChange={() => console.log("rows per paper changed")}
        />
        <Dialog
          open={isModalOpen}
          aria-labelledby="form-dialog-title"
          onClose={() => setIsModalOpen(false)}
        >
          <DialogContent>
            <DialogContentText>Select end date:</DialogContentText>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={endDate}
                  onChange={(value: Date | null) => setEndDate(value)}
                  className={styles.DialogWrapper}
                  minDate={new Date()}
                />
              </LocalizationProvider>

              <DialogActions>
                <button
                  onClick={() => {
                    endDate ? handleEndDate() : setIsModalOpen(false);
                  }}
                >
                  Save End Date
                </button>
                <button onClick={() => setIsModalOpen(false)}>
                  Close Modal
                </button>
              </DialogActions>
            </div>
          </DialogContent>
        </Dialog>
      </Table>
    </TableContainer>
  );
};

export default Contracts;
