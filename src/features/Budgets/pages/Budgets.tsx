import { Outlet } from 'react-router-dom';

export default function Budgets() {

  return (
    <div className='space-y-4 pb-6'>
      <Outlet />
    </div>
  );
}
