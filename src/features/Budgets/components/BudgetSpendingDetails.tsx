import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/stores/stores';
import { deleteBudget } from '../redux/budgets.slice';
import { budgetsData } from '../utils/budgets.data';
import { Budget, BudgetCategory } from '../types/budgets.types';
import Card from '../../../components/ui/Card';
import AreaChartComponent from '../../../components/charts/AreaChartComponent';
import { Edit2, Trash2, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks/app.hooks';
import { Modal, Button } from 'react-bootstrap';

interface IBudgetSpendingDetails {
  id: string;
}

export default function BudgetSpendingDetails({ id }: IBudgetSpendingDetails) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { spendingTrend } = budgetsData;
  const [budget, setBudget] = useState<Budget | undefined>();
  const { budgets, loading, error } = useAppSelector((state) => state.budgets);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const foundBudget = budgets.find((el) => el.id === id);
      setBudget(foundBudget);
    }
  }, [id, budgets]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!budget) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteBudget(budget.id)).unwrap();
      setShowDeleteModal(false);
      // Navigate to first budget or show empty state
      if (budgets.length > 1) {
        const nextBudget = budgets.find(b => b.id !== budget.id);
        if (nextBudget) {
          navigate(`/budgets/overview`);
        }
      }
    } catch (error) {
      console.error('Failed to delete budget:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Empty state when no budget is selected
  if (!budget && !loading && budgets.length > 0) {
    return (
      <div className='bg-white rounded-lg p-8 shadow-sm border border-slate-200 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center'>
            <Inbox size={40} className='text-slate-400' />
          </div>
        </div>
        <h3 className='text-xl font-semibold text-slate-700 mb-2'>Select a Budget</h3>
        <p className='text-sm text-slate-500'>
          Choose a budget from the list to view its details
        </p>
      </div>
    );
  }

  return (
    <>
      {budget && (
        <>
          <div className='d-flex align-center justify-between bg-white rounded-xl p-2 px-4 mb-3 shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{budget.budgetName}</h3>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => navigate(`/budgets/edit-budget/${budget.id}`)}
                className='p-1.5 hover:bg-blue-100 rounded-lg transition-colors'
                title='Edit budget'
              >
                <Edit2 size={14} className='text-blue-600' />
              </button>
              <button
                onClick={handleDeleteClick}
                className='p-1.5 hover:bg-red-100 rounded-lg transition-colors'
                title='Delete budget'
              >
                <Trash2 size={14} className='text-red-600' />
              </button>
            </div>
          </div>
          <div className=''>
            {/* <button className='bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors'>
              Manage
            </button> */}
            <div className=' mb-5 bg-white rounded-xl p-4 shadow-lg'>
              <div className='flex justify-between items-start'>
                <div>
                  <p className='text-xs opacity-90'>Spent</p>
                  <h2 className='text-2xl font-bold -mt-2'>
                    ${budget?.amountSpent?.toFixed(2)}
                  </h2>
                </div>
                <div>
                  <p className='text-xs opacity-90 text-end'>Budget</p>
                  <h2 className='text-2xl font-bold -mt-2'>
                    ${budget.budgetAmount.toFixed(2)}
                  </h2>
                </div>
              </div>
              {/* Progress Bar */}
              <div className='relative'>
                <div className='w-full bg-slate-100 rounded-full h-2'>
                  <div
                    className='h-2 rounded-full transition-all duration-300 bg-gradient-to-br from-indigo-600 to-purple-700 '
                    style={{
                      width: `${(( budget?.amountSpent|| 0) / budget.budgetAmount) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <span className='text-[10px] text-slate-600'>
                    {((( budget?.amountSpent|| 0)  / budget.budgetAmount) * 100).toFixed(0)}% used
                  </span>
                  <span className='text-[10px] text-slate-600'>
                    {(100 - (( budget?.amountSpent|| 0)  / budget.budgetAmount) * 100).toFixed(0)}
                    % left
                  </span>
                </div>
              </div>
            </div>

            <div className=' mb-5 bg-white rounded-xl border border-slate-200 p-4  shadow-sm'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70 '>Last Month</p>
                  <p className='text-sm font-semibold'>
                    ${budget.budgetAmount.toFixed(2)}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70 '>Spent</p>
                  <p className='text-sm font-semibold'>
                    ${(budget.budgetAmount).toFixed(2)}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70'>Savings</p>
                  <p className='text-sm font-semibold'>
                    ${((0)).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>

            <Card className='rounded-xl'>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Spending Trend
              </h3>
              <AreaChartComponent
                data={spendingTrend as any}
                areas={[
                  {
                    dataKey: 'amount',
                    fill: '#8b5cf6',
                    stroke: '#8b5cf6',
                    fillOpacity: 0.3,
                  },
                ]}
                xAxisKey='month'
                height={150}
                showGrid={true}
                showLegend={false}
              />
            </Card>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-0'>
            Are you sure you want to delete the budget <strong>{budget?.budgetName}</strong>? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Budget'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
