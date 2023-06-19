import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import PublicOnlyRoute from "./pages/auth/PublicOnlyRoute";
import { ToastContainer } from "react-toastify";
import ErrorPage from "@/pages/ErrorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route
        path="login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ToastContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
