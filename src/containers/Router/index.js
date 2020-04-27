import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import FormRegister from "../FormRegister";
import ListPosts from "../ListPosts";
import PostDetails from "../PostDetails";




export const routes = {
  root: "/",
  register: "/formRegister",
  listPosts: "/listPosts",
  postDetails: "/postDetails"

  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.register} component={FormRegister} />
        <Route exact path={routes.listPosts} component={ListPosts} />
        <Route exact path={routes.postDetails} component={PostDetails} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
