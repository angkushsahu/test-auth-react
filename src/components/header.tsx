import { Link, Outlet } from "react-router-dom";
import { anotherProtectedPageUrl, homeUrl, loginUrl, profileUrl, signupUrl } from "../routing";
import { useDeleteAccountMutation, useGetUserQuery, useLogoutMutation } from "../store";

export function AuthLinks() {
   const [logout] = useLogoutMutation();
   const [deleteAccount] = useDeleteAccountMutation();

   return (
      <>
         <Link to={profileUrl}>Profile</Link>
         <Link to={anotherProtectedPageUrl}>Protected</Link>
         <span className="link" onClick={() => logout()}>
            Logout
         </span>
         <span className="link" onClick={() => deleteAccount()}>
            Delete
         </span>
      </>
   );
}

export function UnauthLinks() {
   return (
      <>
         <Link to={loginUrl}>Login</Link>
         <Link to={signupUrl}>Signup</Link>
      </>
   );
}

export default function Header() {
   const { data, isLoading } = useGetUserQuery();
   const isAuth = data?.user ? true : false;

   return (
      <>
         <header className="header">
            <div className="container">
               <div className="logo">
                  <Link to={homeUrl}>Logo</Link>
               </div>
               <nav>{isLoading ? <></> : isAuth ? <AuthLinks /> : <UnauthLinks />}</nav>
            </div>
         </header>
         <Outlet />
      </>
   );
}
