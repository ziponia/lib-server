import React from "react";
import { Switch, Route } from "react-router";
import { routes } from "./routes";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        {routes.map(route => {
          if (route.children && route.children.length > 0) {
            return route.children!.map(child => (
              <Route
                key={`${route.key}${child.key}`}
                path={`${route.key}${child.key}`}
                render={_ =>
                  child.component && <child.component title={child.title} />
                }
                exact={route.exact}
              />
            ));
          } else {
            return (
              <Route
                path={route.key}
                render={_ =>
                  route.component && <route.component title={route.title} />
                }
                key={route.key}
                exact={route.exact}
              />
            );
          }
        })}
      </Switch>
    </>
  );
};

export default App;
