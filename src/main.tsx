import React, { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard.tsx';
import NotFound from '@/pages/NotFound.tsx';
import Diary from '@/components/Diary';
import Layout from '@/components/Layout';
import DiaryPreview from '@/components/DiaryPreview';
import Calendar from '@/pages/Calendar';

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/preview" element={<DiaryPreview />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
