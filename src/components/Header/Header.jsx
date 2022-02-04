import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontWeight: "bold",
    marginBottom: 16,
  },
});

function Header() {
  const classes = useStyles();

  return (
    <Typography variant="h4" component="h1" classes={classes}>
      Dashboard
    </Typography>
  );
}

export default Header;
