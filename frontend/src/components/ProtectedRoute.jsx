import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, ...props }) {
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to="/signin" />}
    </Route>
  );
}

export default ProtectedRoute;