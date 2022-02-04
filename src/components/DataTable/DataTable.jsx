import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import ButtonLink from "../ButtonLink";
import DeleteAlert from "../DeleteAlert";

function renderData(data, order) {
  if (data.length)
    return stableSort(data, getComparator(order, "username")).map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>
          <ButtonLink color="warning" to={`/edit/${row.id}`}>
            Edit
          </ButtonLink>
        </TableCell>
        <TableCell>
          <DeleteAlert id={row.id} />
        </TableCell>
      </TableRow>
    ));

  return (
    <TableRow>
      <TableCell colSpan={7}>No users to display</TableCell>
    </TableRow>
  );
}

function descendingComparator(a, b, orderBy) {
  const al = a[orderBy].toLowerCase();
  const bl = b[orderBy].toLowerCase();

  if (bl < al) {
    return -1;
  }
  if (bl > al) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function DataTable({ data, isLoading }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell sortDirection={orderBy === "username" ? order : false}>
              <TableSortLabel
                active={orderBy === "username"}
                direction={orderBy === "username" ? order : "asc"}
                onClick={createSortHandler("username")}
              >
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell style={{ width: 0 }}>Edit</TableCell>
            <TableCell style={{ width: 0 }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            renderData(data, order)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
