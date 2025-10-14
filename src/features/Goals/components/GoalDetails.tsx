import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
// import { goalsData } from '../utils/goals.data';
import { Goal, GoalDisplay, toGoalDisplay } from '../types/goals.types';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Inbox } from 'lucide-react';
import { deleteGoal } from '../redux/goals.slice';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'sonner';
import { ErrorDialog } from '../../../components';

interface IGoalDetails {
  id: string;
}

export default function GoalDetails({ id }: IGoalDetails) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { goals, loading } = useSelector((state: RootState) => state.goals);
  // const { history } = goalsData; // Still using static data for history until we implement history API
  const [goal, setGoal] = useState<Goal | undefined>();
  const [displayGoal, setDisplayGoal] = useState<GoalDisplay | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Error dialog state
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    if (id && goals.length > 0) {
      const foundGoal = goals.find((el) => el.id === id);
      if (foundGoal) {
        setGoal(foundGoal);
        // Convert to display format with visual properties
        const displayGoalData = toGoalDisplay(foundGoal, {
          icon: 'Target',
          color: '#4f46e5',
          monthly: 500,
        });
        setDisplayGoal(displayGoalData);
      }
    }
  }, [id, goals]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!goal) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteGoal(goal.id)).unwrap();
      toast.success('Goal deleted successfully!');
      setShowDeleteModal(false);
      // Navigate to first goal or show empty state
      if (goals.length > 1) {
        const nextGoal = goals.find((g) => g.id !== goal.id);
        if (nextGoal) {
          navigate(`/goals/overview`);
        }
      }
    } catch (error: any) {
      console.error('Failed to delete goal:', error);
      setShowDeleteModal(false);
      setErrorMessage('Failed to delete goal. Please try again.');
      setErrorDetails(error?.message || JSON.stringify(error, null, 2));
      setShowErrorDialog(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const priorityColors: {
    [key: string]: { style: string; icon: keyof typeof LucideIcons };
  } = {
    High: { style: 'bg-red-100 text-red-800', icon: 'AlertTriangle' },
    Medium: { style: 'bg-yellow-100 text-yellow-800', icon: 'AlertCircle' },
    Low: { style: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
  };

  // Empty state when no goal is selected
  if (!goal && !loading && goals.length > 0) {
    return (
      <div className='bg-white rounded-lg p-8 shadow-sm border border-slate-200 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center'>
            <Inbox size={40} className='text-slate-400' />
          </div>
        </div>
        <h3 className='text-xl font-semibold text-slate-700 mb-2'>
          Select a Goal
        </h3>
        <p className='text-sm text-slate-500'>
          Choose a goal from the list to view its details
        </p>
      </div>
    );
  }

  return (
    <div>
      {goal && displayGoal && (
        <div className='space-y-4'>
          <div className='d-flex align-center justify-between bg-white rounded-xl p-2 px-4 mb-3 shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{goal.goalName}</h3>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => navigate(`/goals/edit-goal/${goal.id}`)}
                className='p-1.5 hover:bg-blue-100 rounded-lg transition-colors'
                title='Edit goal'
              >
                <Edit2 size={14} className='text-blue-600' />
              </button>
              <button
                onClick={handleDeleteClick}
                className='p-1.5 hover:bg-red-100 rounded-lg transition-colors'
                title='Delete goal'
              >
                <Trash2 size={14} className='text-red-600' />
              </button>
            </div>
          </div>

          {/* Description */}
          {goal.goalDescription && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-2'>
                Description
              </h4>
              <p className='text-sm text-slate-600'>{goal.goalDescription}</p>
            </div>
          )}

          {/* Progress Overview */}
          <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'>
            <div className='grid grid-cols-4 gap-3 mb-3'>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Priority</p>
                {goal.priority && priorityColors[goal.priority] && (<div
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${priorityColors[goal.priority].style}`}
                >
                  {goal.priority}
                </div>)} 
                  
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Progress</p>
                <p className='text-xs font-semibold text-slate-800'>
                  {goal.progress || 0}%
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>
                  Target Value
                </p>
                <p className='text-xs font-semibold text-slate-800'>
                  {goal.targetValue
                    ? `$${goal.targetValue.toLocaleString()}`
                    : 'N/A'}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>
                  Target Metric
                </p>
                <p className='text-xs font-semibold text-slate-800'>
                  {goal.targetMetric || 'N/A'}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-slate-100 rounded-full h-2 mb-1'>
              <div
                className='h-2 rounded-full transition-all duration-300'
                style={{
                  width: `${goal.progress || 0}%`,
                  backgroundColor: displayGoal.color,
                }}
              ></div>
            </div>
            <div className='flex justify-between text-[10px] text-slate-600'>
              <span>{(goal.progress || 0).toFixed(0)}% complete</span>
              <span>{(100 - (goal.progress || 0)).toFixed(0)}% remaining</span>
            </div>
          </div>

          {/* Dates Section */}
          <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
            <h4 className='text-sm font-bold text-slate-800 mb-3'>Timeline</h4>
            <div className='grid grid-cols-3 gap-4'>
              {goal.startDate && (
                <div>
                  <p className='text-[10px] text-slate-500 mb-1'>Start Date</p>
                  <p className='text-sm font-semibold text-slate-800'>
                    {new Date(goal.startDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {goal.targetDate && (
                <div>
                  <p className='text-[10px] text-slate-500 mb-1'>Target Date</p>
                  <p className='text-sm font-semibold text-slate-800'>
                    {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {goal.deadline && (
                <div>
                  <p className='text-[10px] text-slate-500 mb-1'>Deadline</p>
                  <p className='text-sm font-semibold text-slate-800'>
                    {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Success Criteria */}
          {goal.successCriteria && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-2'>
                Success Criteria
              </h4>
              <p className='text-sm text-slate-600'>{goal.successCriteria}</p>
            </div>
          )}

          {/* Actions */}
          {goal.actions && goal.actions.length > 0 && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-3'>Actions</h4>
              <ul className='space-y-2'>
                {goal.actions.map((action, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <span className='text-emerald-600 mt-1'>•</span>
                    <span className='text-sm text-slate-600 flex-1'>
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Needed */}
          {goal.resourcesNeeded && goal.resourcesNeeded.length > 0 && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-3'>
                Resources Needed
              </h4>
              <ul className='space-y-2'>
                {goal.resourcesNeeded.map((resource, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <span className='text-blue-600 mt-1'>•</span>
                    <span className='text-sm text-slate-600 flex-1'>
                      {resource}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Obstacles */}
          {goal.obstacles && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-2'>
                Obstacles
              </h4>
              <p className='text-sm text-slate-600'>{goal.obstacles}</p>
            </div>
          )}

          {/* Milestones */}
          {goal.milestones && goal.milestones.length > 0 && (
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h4 className='text-sm font-bold text-slate-800 mb-3'>
                Milestones
              </h4>
              <ul className='space-y-2'>
                {goal.milestones.map((milestone, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <span className='text-purple-600 mt-1'>•</span>
                    <span className='text-sm text-slate-600 flex-1'>
                      {milestone}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* History */}
          {/* <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
            <h3 className='text-base font-bold text-slate-800 mb-3'>History</h3>

            Table Header
            <div className='grid grid-cols-4 gap-2 pb-2 border-b border-slate-200 mb-2'>
              <div className='text-[10px] font-semibold text-slate-600'>
                Date
              </div>
              <div className='text-[10px] font-semibold text-slate-600'>
                Wallet
              </div>
              <div className='text-[10px] font-semibold text-slate-600'>
                Description
              </div>
              <div className='text-[10px] font-semibold text-slate-600 text-right'>
                Amount
              </div>
            </div>

            History Items
            <div className='space-y-2'>
              {history.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-4 gap-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors'
                >
                  <div className='text-[10px] text-slate-600'>{item.date}</div>
                  <div className='text-[10px] text-slate-600'>
                    {item.wallet}
                  </div>
                  <div className='text-[10px] text-slate-700'>
                    {item.description}
                  </div>
                  <div className='text-[10px] font-semibold text-slate-800 text-right'>
                    +${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-0'>
            Are you sure you want to delete the goal{' '}
            <strong>{goal?.goalName}</strong>? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Goal'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Dialog */}
      <ErrorDialog
        show={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title='Delete Goal Failed'
        message={errorMessage}
        details={errorDetails}
      />
    </div>
  );
}
