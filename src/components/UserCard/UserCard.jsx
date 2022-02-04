import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonLink from "../ButtonLink";
import DeleteAlert from "../DeleteAlert";

function UserCard({ user }) {
  const { id, name, username, email, city } = user;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {id}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {username}
        </Typography>
        <Typography variant="body2" component="p">
          {email}
          <br />
          Lives in {city}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonLink color="warning" to={`/edit/${id}`}>
          Edit
        </ButtonLink>
        <DeleteAlert id={id} />
      </CardActions>
    </Card>
  );
}

export default UserCard;
