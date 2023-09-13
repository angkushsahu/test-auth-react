import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../store";
import { loginUrl } from "../routing";

export default function Profile() {
   const navigate = useNavigate();
   const { data, isLoading } = useGetUserQuery();

   if (isLoading) return <></>;
   else if (!data || !data.user) navigate(loginUrl, { replace: true });

   return (
      <main className="page">
         <div className="container">
            <div className="details">
               <span>Name: </span>
               <span>{data?.user.name}</span>
            </div>
            <div className="details">
               <span>E-mail: </span>
               <span>{data?.user.email}</span>
            </div>
         </div>
      </main>
   );
}
