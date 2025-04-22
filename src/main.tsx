import React, { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import WorkspacePage from '@/pages/WorkspacePage.tsx';
import DocumentPage from '@/pages/DocumentPage.tsx';
import NotFound from '@/pages/NotFound.tsx';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <>{children}</>;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />
        <Route path="/doc/:docId" element={<DocumentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
