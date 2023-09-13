import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loginUrl, profileUrl } from "../routing";
import { useGetUserQuery } from "../store";
import { Loading } from ".";

export interface ProtectRouteProps {
   type: "private" | "public";
}

export default function ProtectRoute({ type }: ProtectRouteProps) {
   const { data, isLoading } = useGetUserQuery();
   const location = useLocation();

   const user = data?.user;

   if (isLoading) return <Loading />;
   else if ((user && type === "private") || (!user && type === "public")) return <Outlet />;
   else if (user && type === "public") return <Navigate to={profileUrl} state={{ from: location }} />;
   else if (!user && type === "private") return <Navigate to={loginUrl} state={{ from: location }} />;
   else return null;
}
