import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSignupMutation } from "../store";
import { profileUrl } from "../routing";

export default function Signup() {
   const [signupValues, setSignupValues] = useState({ name: "", email: "", password: "" });
   const [signup, { isLoading }] = useSignupMutation();
   const navigate = useNavigate();
   const location = useLocation();
   const navigateTo = location?.state?.from?.pathname || profileUrl;

   async function onSignup(e: FormEvent) {
      e.preventDefault();
      if (isLoading) return;
      if (!signupValues.email || !signupValues.password) return window.alert("Please validate all the required fields");

      try {
         const response = await signup({ ...signupValues }).unwrap();
         if (response.success) navigate(navigateTo, { replace: true });
         else window.alert(response.message);
      } catch (err: any) {
         window.alert(err.data.message as string);
      }
   }

   function onChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setSignupValues((prev) => ({ ...prev, [name]: value }));
   }

   return (
      <main className="page">
         <div className="container">
            <form onSubmit={onSignup}>
               <label htmlFor="name">Name:</label>
               <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. John Doe"
                  value={signupValues.name}
                  onChange={onChange}
               />
               <label htmlFor="email">E-mail:</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. johndoe@gmail.com"
                  value={signupValues.email}
                  onChange={onChange}
               />
               <label htmlFor="password">Password:</label>
               <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a strong password"
                  value={signupValues.password}
                  onChange={onChange}
               />
               <button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading ...." : "Signup"}
               </button>
            </form>
         </div>
      </main>
   );
}
