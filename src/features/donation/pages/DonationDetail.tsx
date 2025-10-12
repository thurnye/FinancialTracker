import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function DonationDetail() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>DonationDetail</h1>
      <Button
        variant='success'
        className='text-white bg-green-600 hover:bg-green-700'
        onClick={() => navigate('/donations')}
      >
        to Donations
      </Button>
    </div>
  );
}
