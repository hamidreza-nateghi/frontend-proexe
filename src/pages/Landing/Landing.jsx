import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@material-ui/core";
import DataTable from "../../components/DataTable";
import { fetchUsers } from "../../features/userSlice";
import CardList from "./CardList";

function Landing() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"), { noSsr: true });

  useEffect(() => {
    if (users.status === "idle") dispatch(fetchUsers());
  }, [users.status, dispatch]);

  const isLoading = users.status === "loading";

  if (isPhone) return <CardList data={users.data} isLoading={isLoading} />;

  return <DataTable data={users.data} isLoading={isLoading} />;
}

export default Landing;
