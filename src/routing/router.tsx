import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Header, ProtectRoute } from "../components";
import * as Page from "./lazyImports";
import * as routes from "./routes";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Header />}>
         <Route element={<ProtectRoute type="public" />}>
            <Route path={routes.homeUrl} element={<Page.Home />} />
            <Route path={routes.loginUrl} element={<Page.Login />} />
            <Route path={routes.signupUrl} element={<Page.Signup />} />
         </Route>
         <Route element={<ProtectRoute type="private" />}>
            <Route path={routes.profileUrl} element={<Page.Profile />} />
            <Route path={routes.anotherProtectedPageUrl} element={<Page.AnotherProtected />} />
         </Route>
         <Route path="*" element={<Page.Error />} />
      </Route>
   )
);

export default router;
