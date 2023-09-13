import { Suspense } from "react";
import { router } from "./routing";
import { Loading } from "./components";
import { RouterProvider } from "react-router-dom";

export default function App() {
   return (
      <div className="app-root">
         <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
         </Suspense>
      </div>
   );
}
