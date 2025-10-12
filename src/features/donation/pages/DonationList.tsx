import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import DonationForm from '../components/DonationForm';
import { deleteDonation, fetchDonations } from '../redux/donation.slice';
import { IDonation } from '../types/donation.types';
import { useNavigate } from 'react-router-dom';

const DonationsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { donations, loading, error } = useAppSelector(
    (state) => state.donations
  );
  const [selectedDonation, setSelectedDonation] = useState<IDonation | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDonation(id));
  };

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-semibold text-green-700'>Donations</h1>
          <Button
            variant='success'
            className='text-white bg-green-600 hover:bg-green-700'
            onClick={() => {
              setSelectedDonation(null);
              setShowForm(true);
            }}
          >
            + Add Donations
          </Button>
          <Button
            variant='success'
            className='text-white bg-green-600 hover:bg-green-700'
            onClick={() => navigate('donationDetail')}
          >
            to Donations details
          </Button>
        </div>

        {loading && (
          <div className='flex justify-center items-center py-20'>
            <Spinner animation='border' variant='success' />
          </div>
        )}

        {error && (
          <p className='text-red-600 text-center font-medium py-4'>{error}</p>
        )}

        {!loading && donations.length === 0 && (
          <p className='text-center text-gray-500'>
            No donations available yet.
          </p>
        )}

        {!loading && donations.length > 0 && (
          <div className='overflow-x-auto'>
            <Table hover responsive bordered>
              <thead className='bg-green-50 text-green-800'>
                <tr>
                  <th>Title</th>
                  <th>Amount ($)</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.title}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.date}</td>
                    <td>{donation.category}</td>
                    <td>{donation.description || '-'}</td>
                    <td className='text-center space-x-2'>
                      <Button
                        variant='outline-success'
                        size='sm'
                        onClick={() => {
                          setSelectedDonation(donation);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={() => handleDelete(donation.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Form Modal */}
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedDonation ? 'Edit Donation' : 'Add Donation'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DonationForm
              donation={selectedDonation || undefined}
              onClose={() => setShowForm(false)}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DonationsList;
