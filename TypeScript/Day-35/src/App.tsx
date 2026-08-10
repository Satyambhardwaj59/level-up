// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAppDispatch } from "./store/hooks";
import { restoreAuth } from "./store/slices/authSlice";
import { useTheme } from "./hooks/useTheme";

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const TaskList = React.lazy(() => import("./pages/TaskList"));
const TaskFormPage = React.lazy(() => import("./pages/TaskFormPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/new" element={<TaskFormPage />} />
          <Route path="tasks/:id/edit" element={<TaskFormPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;