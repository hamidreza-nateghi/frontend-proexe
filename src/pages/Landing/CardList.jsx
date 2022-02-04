import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserCard from "../../components/UserCard";

function renderData(data) {
  if (data.length)
    return (
      <Grid container spacing={2}>
        {data.map((user) => (
          <Grid key={user.id} item xs={12}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    );

  return "No users to display";
}

function CardList({ data, isLoading }) {
  return (
    <Box display="grid" justifyContent="center">
      {isLoading ? <CircularProgress /> : renderData(data)}
    </Box>
  );
}

export default CardList;
