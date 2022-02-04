import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DataTable from "../../components/DataTable";
import Button from "../../components/ButtonLink";
import { fetchUsers } from "../../features/userSlice";

function Landing() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.status === "idle") dispatch(fetchUsers());
  }, [users.status, dispatch]);

  console.log(users);
  return (
    <Paper elevation={1}>
      <Box component="header" display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h6" component="h2">
          Users List
        </Typography>
        <Button to="/add" color="primary">
          Add
        </Button>
      </Box>
      <Divider />
      <Box p={2}>
        <DataTable data={users.data} />
      </Box>
    </Paper>
  );
}

export default Landing;
