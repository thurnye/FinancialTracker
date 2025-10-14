// /**
//  * Dashboard Hooks
//  * Custom hooks for managing dashboard state and API calls
//  */

// import { useState, useEffect, useCallback } from 'react';
// import { dashboardApiService } from '../services/dashboard.api.service';

// export const useDashboard = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDashboard = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await dashboardApiService.getDashboardData();
//       setDashboardData(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDashboard();
//   }, [fetchDashboard]);

//   return { dashboardData, loading, error, refetch: fetchDashboard };
// };
