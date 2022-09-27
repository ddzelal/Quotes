import { computeHeadingLevel } from "@testing-library/react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenFromStorage } from "../helpers";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      
      render={props => {

        if (getTokenFromStorage() !== null) {
          return <Component {...props} />;
        }
         else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
//