import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginMutation } from "../store";
import { profileUrl } from "../routing";

export default function Login() {
   const [loginValues, setLoginValues] = useState({ email: "", password: "" });
   const [login, { error, isError, isLoading }] = useLoginMutation();
   const navigate = useNavigate();
   const location = useLocation();
   const navigateTo = location?.state?.from?.pathname || profileUrl;

   async function onLogin(e: FormEvent) {
      e.preventDefault();
      if (isLoading) return;
      if (!loginValues.email || !loginValues.password) return window.alert("Please validate all the required fields");

      try {
         await login({ ...loginValues }).unwrap();
         navigate(navigateTo, { replace: true });
      } catch (err: any) {
         window.alert(err.data.message as string);
      }
   }

   function onChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setLoginValues((prev) => ({ ...prev, [name]: value }));
   }

   return (
      <main className="page">
         <div className="container">
            <form onSubmit={onLogin}>
               <label htmlFor="email">E-mail:</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. johndoe@gmail.com"
                  value={loginValues.email}
                  onChange={onChange}
               />
               <label htmlFor="password">Password:</label>
               <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a strong password"
                  value={loginValues.password}
                  onChange={onChange}
               />
               <button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading ...." : "Login"}
               </button>
            </form>
         </div>
         {isError ? <p>{(error as any).message}</p> : null}
      </main>
   );
}
