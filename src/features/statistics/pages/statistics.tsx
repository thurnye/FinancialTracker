import React, { useEffect } from 'react';
import { fetchDonationsPerCategory } from '../redux/statistics.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import Container from '../../../components/common/Container';
import PageHeader from '../../../components/common/PageHeader';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import ErrorMessage from '../../../components/common/ErrorMessage';
import EmptyState from '../../../components/common/EmptyState';
import Card from '../../../components/ui/Card';
import BarChartComponent from '../../../components/charts/BarChartComponent';

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { donationAmountPerCategory, loading, error } = useAppSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchDonationsPerCategory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <Container maxWidth="2xl">
        <PageHeader title="Donation Statistics" />

        <Card>
          {loading && <LoadingOverlay />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && donationAmountPerCategory.length === 0 && (
            <EmptyState
              title="No donation data available"
              description="Start adding donations to see statistics here."
            />
          )}

          {!loading && !error && donationAmountPerCategory.length > 0 && (
            <BarChartComponent
              data={donationAmountPerCategory as any}
              bars={[
                {
                  dataKey: 'totalAmount',
                  fill: '#10b981',
                  name: 'Total Amount',
                },
              ]}
              xAxisKey="category"
              height={400}
              showGrid={true}
              showLegend={false}
              showTooltip={true}
            />
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Statistics;
