import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/stores/stores';
import { deleteCategory } from '../redux/settings.slice';
import { Category } from '../types/settings.types';
import { IconStyle } from '../../../components';
import { Modal, Button, Spinner } from 'react-bootstrap';

interface ICategoryTypeList {
  data: Category[];
  type: string;
  onEdit: (category: Category) => void;
}

export default function CategoryTypeList({ data, type, onEdit }: ICategoryTypeList) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (category: Category) => {
    onEdit(category);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  return (
    <>
      <div className='bg-white rounded-lg mb-4 p-4 shadow-sm border border-slate-200'>
        <h3 className='text-base font-bold text-slate-800 mb-3'>{type}</h3>
        <div className='space-y-2'>
          {data.length === 0 ? (
            <p className='text-xs text-slate-500 text-center py-4'>
              No categories found. Create one to get started.
            </p>
          ) : (
            data.map((category) => (
              <div
                key={category.id}
                className='flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors'
              >
                <div className='flex items-center gap-2'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center mb-2'
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <IconStyle
                      backgroundColor={`${category.color}20`}
                      iconName={category.icon}
                      size={18}
                      color={category.color}
                    />
                  </div>
                  <span className='text-xs font-medium text-slate-800'>
                    {category.name}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handleEditClick(category)}
                    className='p-1.5 hover:bg-blue-100 rounded-lg transition-colors'
                    title='Edit category'
                  >
                    <Edit2 size={14} className='text-blue-600' />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className='p-1.5 hover:bg-red-100 rounded-lg transition-colors'
                    title='Delete category'
                  >
                    <Trash2 size={14} className='text-red-600' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Spinner animation='border' size='sm' className='me-2' />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
