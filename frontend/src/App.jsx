import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import SignUp from "../src/pages/Auth/SignUp";
import Dashboard from "../src/pages/Admin/Dashboard";
import ManageTasks from "../src/pages/Admin/ManageTasks";
import CreateTask from "../src/pages/Admin/CreateTask";
import ManageUsers from "../src/pages/Admin/ManageUsers";
import UserDashboard from "../src/pages/User/UserDashboard";
import MyTasks from "../src/pages/User/MyTasks";
import ViewTaskDetails from "../src/pages/User/ViewTaskDetails";
import PrivateRoute from "../src/routes/PrivateRoute";
import UserProvider, { UserContext } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* Users Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route
                path="/user/task-details/:id"
                element={<ViewTaskDetails />}
              />
            </Route>
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
