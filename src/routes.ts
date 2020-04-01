/**
 *  Constants for routes in the app
 *
 * Use:
 * import { ROUTES, history } from "routes"
 * import { LinkContainer } from "react-router-bootstrap";
 *
 * <LinkContainer to={ROUTES.EXAMPLE}><a>Link to example</a></LinkContainer>
 * <button onClick={() => history.push(ROUTES.EXAMPLE)}>Example button</button>
 */
import { createBrowserHistory } from "history";

export const ROUTES = {
  DOWNLOAD: "/download",
  UPLOAD: "/",
};

export const history = createBrowserHistory();
