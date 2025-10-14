import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import PageHeader from '../../../components/common/PageHeader';
import Button from '../../../components/ui/Button';

export default function DonationDetail() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <Container>
        <PageHeader
          title="Donation Detail"
          actions={
            <Button
              variant="success"
              onClick={() => navigate('/donations')}
            >
              Back to Donations
            </Button>
          }
        />
      </Container>
    </div>
  );
}
