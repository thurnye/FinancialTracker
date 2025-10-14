// App.tsx
import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { Toaster } from '../../components/Toaster';
import AppRoutes from '../routes/app.routes';
import Navbar from '../../components/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks/app.hooks';
import { initializeAuth } from '../../features/auth/redux/slice/asyncThunkServices';

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [isInitialized, setIsInitialized] = React.useState(false);
const initRef = React.useRef(false);

useEffect(() => {
  if (initRef.current) return; // ✅ Prevent rerun
  initRef.current = true;

  dispatch(initializeAuth())
    // .then(() => console.log('[App] Initialization successful'))
    // .catch((err) => console.error('[App] Initialization failed:', err))
    // .finally(() => setIsInitialized(true));
    setIsInitialized(true);
}, [dispatch]);


  // Show loading screen while initializing auth (only on first load)
  if (!isInitialized) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='text-xl font-semibold'>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}
