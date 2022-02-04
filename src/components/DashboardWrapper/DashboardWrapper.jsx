import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ButtonLink from "../ButtonLink";

function DashboardWrapper({ children }) {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  const title = isLanding ? "Users List" : "Form";

  return (
    <Paper elevation={1}>
      <Box component="header" display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {isLanding && (
          <ButtonLink to="/add" color="primary">
            Add
          </ButtonLink>
        )}
      </Box>
      <Divider />
      <Box p={2}>{children}</Box>
    </Paper>
  );
}

export default DashboardWrapper;
