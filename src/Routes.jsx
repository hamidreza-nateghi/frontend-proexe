import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import DashboardWrapper from "./components/DashboardWrapper";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import UserAdd from "./pages/UserAdd";
import UserEdit from "./pages/UserEdit";

function Routes() {
  return (
    <Container component="main">
      <Switch>
        <Route exact path={["/", "/add", "/edit/:id"]}>
          <Header />
          <Switch>
            <DashboardWrapper>
              <Route exact path={process.env.PUBLIC_URL + "/"} component={Landing} />
              <Route path={process.env.PUBLIC_URL + "/add"} component={UserAdd} />
              <Route path={process.env.PUBLIC_URL + "/edit/:id"} component={UserEdit} />
            </DashboardWrapper>
          </Switch>
        </Route>
        <Route>
          <div>Not Found</div>
        </Route>
      </Switch>
    </Container>
  );
}

export default Routes;
