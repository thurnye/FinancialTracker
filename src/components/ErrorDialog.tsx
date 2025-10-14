import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

interface ErrorDialogProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
}

export default function ErrorDialog({
  show,
  onClose,
  title = 'Error',
  message,
  details,
}: ErrorDialogProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className='border-0 pb-0'>
        <Modal.Title className='d-flex align-items-center gap-2'>
          <AlertCircle className='text-danger' size={24} />
          <span>{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='danger' className='mb-3'>
          <p className='mb-0'>{message}</p>
        </Alert>
        {details && (
          <div className='mt-3'>
            <p className='text-sm font-semibold text-slate-700 mb-1'>Details:</p>
            <pre className='text-xs bg-slate-100 p-3 rounded text-slate-600 overflow-auto' style={{ maxHeight: '200px' }}>
              {details}
            </pre>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='border-0'>
        <Button variant='primary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
