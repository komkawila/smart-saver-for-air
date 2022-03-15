import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Createuser from "./pages/User/userCreate";
import Edituser from "./pages/User/userEdit";
import Listuser from "./pages/User/userList";
import Airtype from "./pages/Airtype/airtype";
import Airbrand from "./pages/Airbrand/airbrand";
import Airspecies from "./pages/Airspecies/airspecies";

const Routers = () => {
  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props}></Component>
        </Layout>
      )}
    ></Route>
  );
  return (
    <Switch>
      <AppRoute
        path="/login"
        exact={true}
        layout={LoginLayout}
        component={Login}
      />
      <AppRoute
        path="/dashboard"
        // path="/dashboard/:id"
        exact={true}
        layout={MainLayout}
        component={Dashboard}
      />
      <AppRoute
        path="/airtype"
        exact={true}
        layout={MainLayout}
        component={Airtype}
      />
      <AppRoute
        path="/airspecies"
        exact={true}
        layout={MainLayout}
        component={Airspecies}
      />
      <AppRoute
        path="/airbrand"
        exact={true}
        layout={MainLayout}
        component={Airbrand}
      />
      <AppRoute
        path="/"
        exact={true}
        layout={MainLayout}
        component={Listuser}
      />
      <AppRoute
        path="/usercreate"
        exact={true}
        layout={MainLayout}
        component={Createuser}
      />
      <AppRoute
        path="/useredit/:id"
        exact={true}
        layout={MainLayout}
        component={Edituser}
      />
    </Switch>
  );
};

export default Routers;
