import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Landing from "./pages/Landing";
import AddUser from "./pages/AddUser";
import UserEdit from "./pages/UserEdit";
import Header from "./components/Header";

function Routes() {
  return (
    <Container component="main">
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/add" component={AddUser} />
        <Route exact path="/edit/:id" component={UserEdit} />
      </Switch>
    </Container>
  );
}

export default Routes;
