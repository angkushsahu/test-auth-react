import { lazy } from "react";

export const Home = lazy(() => import("../pages/home"));
export const Error = lazy(() => import("../pages/error"));
export const Login = lazy(() => import("../pages/login"));
export const Signup = lazy(() => import("../pages/signup"));
export const Profile = lazy(() => import("../pages/profile"));
export const AnotherProtected = lazy(() => import("../pages/anotherProtectedPage"));
