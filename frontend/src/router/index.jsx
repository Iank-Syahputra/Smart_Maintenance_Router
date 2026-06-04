import { createBrowserRouter } from "react-router-dom";

// USER
import Feed from "../pages/Feed";
import ReportDetail from "../pages/ReportDetail";
import CreateReport from "../pages/CreateReport";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import MyReports from "../pages/MyReports";

// ADMIN
import AdminDashboard from "../pages/AdminDashboard";
import AdminReportDetail from "../pages/AdminReportDetail";
import AdminUsers from "../pages/AdminUsers";

// ERROR
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  // ======================
  // PUBLIC
  // ======================

  {
    path: "/",
    element: <Feed />
  },

  {
    path: "/report/:id",
    element: <ReportDetail />
  },

  // ======================
  // AUTH
  // ======================

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/register",
    element: <Register />
  },

  // ======================
  // USER
  // ======================

  {
    path: "/create",
    element: <CreateReport />
  },

  {
    path: "/profile",
    element: <Profile />
  },

  {
    path: "/edit-profile",
    element: <EditProfile />
  },

  {
    path: "/my-reports",
    element: <MyReports />
  },

  // ======================
  // ADMIN
  // ======================

  {
    path: "/admin",
    element: <AdminDashboard />
  },

  {
    path: "/admin/report/:id",
    element: <AdminReportDetail />
  },

  {
    path: "/admin/users",
    element: <AdminUsers />
  },

  // ======================
  // 404
  // ======================

  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;