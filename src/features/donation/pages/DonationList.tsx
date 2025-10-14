import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import DonationForm from '../components/DonationForm';
import { deleteDonation, fetchDonations } from '../redux/donation.slice';
import { IDonation } from '../types/donation.types';
import Container from '../../../components/common/Container';
import PageHeader from '../../../components/common/PageHeader';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import ErrorMessage from '../../../components/common/ErrorMessage';
import EmptyState from '../../../components/common/EmptyState';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Table, { TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../../components/ui/Table';

const DonationsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { donations, loading, error } = useAppSelector(
    (state) => state.donations
  );
  const [selectedDonation, setSelectedDonation] = useState<IDonation | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDonation(id));
  };

  const handleOpenForm = (donation?: IDonation) => {
    setSelectedDonation(donation || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDonation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <Container maxWidth="2xl">
        <PageHeader
          title="Donations"
          actions={
            <>
              <Button
                variant="success"
                leftIcon={<Plus size={18} />}
                onClick={() => handleOpenForm()}
              >
                Add Donation
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('donationDetail')}
              >
                View Details
              </Button>
            </>
          }
        />

        {loading && <LoadingOverlay />}

        {error && <ErrorMessage message={error} className="mb-6" />}

        {!loading && donations.length === 0 && (
          <EmptyState
            title="No donations yet"
            description="Start tracking your charitable donations by adding your first one."
            action={
              <Button
                variant="primary"
                leftIcon={<Plus size={18} />}
                onClick={() => handleOpenForm()}
              >
                Add Your First Donation
              </Button>
            }
          />
        )}

        {!loading && donations.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Amount ($)</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader className="text-center">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.title}</TableCell>
                  <TableCell>${donation.amount.toFixed(2)}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>{donation.category}</TableCell>
                  <TableCell>{donation.description || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={14} />}
                        onClick={() => handleOpenForm(donation)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => handleDelete(donation.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Modal
          isOpen={showForm}
          onClose={handleCloseForm}
          title={selectedDonation ? 'Edit Donation' : 'Add Donation'}
          size="lg"
        >
          <DonationForm
            donation={selectedDonation || undefined}
            onClose={handleCloseForm}
          />
        </Modal>
      </Container>
    </div>
  );
};

export default DonationsList;
