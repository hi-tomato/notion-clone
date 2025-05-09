import React, { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Dashboard from '@/pages/Dashboard.tsx';
import NotFound from '@/pages/NotFound.tsx';
import Diary from '@/components/Diary';
import Layout from '@/components/Layout';
import DiaryPreview from '@/components/DiaryPreview';
import Calendar from '@/pages/Calendar';
import Login from '@/pages/Login';
import User from '@/pages/User';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomCursor from './hooks/CustomCursor';
// import AuthInitializer from '@/pages/AuthInitializer';
import useAuthStore from '@/store/authStore';
import LoadingSpinner from '@/pages/Loading';

// ProtectedRoute를 메모제이션하여 불필요한 재렌더링 방지
interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute = ({ children }: Props) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diary"
              element={
                <ProtectedRoute>
                  <Diary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diary/preview"
              element={
                <ProtectedRoute>
                  <DiaryPreview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
