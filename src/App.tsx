import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarProviderT";

import { Layout } from "./components/Layout/Layout";
import { PAGE_ENDPOINTS } from "./constants/pageEndPoints";
import { HomeContainer } from "./pages/HomePages/HomeContainer";
import { IndexContainer } from "./pages/IndexPages/IndexContainer";
import { ProjectContainer } from "./pages/ProjectPages/ProjectContainer";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: PAGE_ENDPOINTS.HOME,
        element: <HomeContainer />,
      },
      {
        path: PAGE_ENDPOINTS.PROJECT,
        element: <ProjectContainer />,
      },
      {
        path: PAGE_ENDPOINTS.INDEX,
        element: <IndexContainer />,
      },

      // {
      //   path: "*",
      //   element: <DefaultPage />,
      // },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </HelmetProvider>
  );
}

export default App;
