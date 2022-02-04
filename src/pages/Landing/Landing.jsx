import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DataTable from "../../components/DataTable";
import ButtonLink from "../../components/ButtonLink";
import { fetchUsers } from "../../features/userSlice";

function Landing() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.status === "idle") dispatch(fetchUsers());
  }, [users.status, dispatch]);

  const isLoading = users.status === "loading";

  return <DataTable data={users.data} isLoading={isLoading} />;
}

export default Landing;
