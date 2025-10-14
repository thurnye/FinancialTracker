import React from 'react';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks/app.hooks';
import { logoutUser } from '../features/auth/redux/slice/asyncThunkServices';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // console.log(isAuthenticated)

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      // Logout failed, but still clear local state and redirect
      console.error('Logout error:', error);
    } finally {
      // Always navigate to login after logout attempt
      navigate('/login', { replace: true });
    }
  };

  return (
    <BsNavbar
      expand='lg'
      className='bg-green-50 border-b border-green-100 shadow-sm'
    >
      <Container className='flex justify-between items-center'>
        {/* Brand */}
        <BsNavbar.Brand
          as={NavLink}
          to='/'
          className='text-3xl font-semibold text-green-700 font-[Brush Script MT] tracking-wide flex-grow-1'
        >
          My Donation Tracker
        </BsNavbar.Brand>

        {/* Toggle (for mobile) */}
        {/* <BsNavbar.Toggle aria-controls='main-navbar' /> */}

        {/* <BsNavbar.Collapse
          id='main-navbar'
          className=' justify-end'
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <Nav className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to='/'
                  className='text-gray-700 hover:text-green-700 transition-colors duration-200'
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/donations'
                  className='text-gray-700 hover:text-green-700 transition-colors duration-200'
                >
                  Donations
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/statistics'
                  className='text-gray-700 hover:text-green-700 transition-colors duration-200'
                >
                  Statistics
                </Nav.Link>
                <Button
                  variant='outline-success'
                  className='ml-3 px-3 py-1 text-sm font-medium border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors duration-200'
                  onClick={() => handleLogout()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to='/register'
                  className='text-gray-700 hover:text-green-700 transition-colors duration-200'
                >
                  Sign up
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/login'
                  className='text-gray-700 hover:text-green-700 transition-colors duration-200'
                >
                  Sign in
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse> */}
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
