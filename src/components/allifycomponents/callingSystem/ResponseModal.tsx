'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Student = {
  user_id: number;
  name: string;
};

const ResponseModal = ({
  isOpen,
  closeModal,
  selectedRow,
}: {
  isOpen: boolean;
  closeModal: () => void;
  selectedRow: Student | null;
}) => {
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async () => {
    if (!response) return;

    try {
      console.log('Submitting response:', response, 'for', selectedRow?.name);

      // TODO: Replace this with actual API call
      // await updateStudentResponse(selectedRow.user_id, response);

      toast.success('Response submitted successfully');
      closeModal();
      setResponse('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit response');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      PaperProps={{
        sx: {
          width: '500px',      // Adjust width
          height: '300px',     // Adjust height
          padding: 2,
        },
      }}
    >
      <DialogTitle>Calling Response</DialogTitle>
      <DialogContent>
        <p>Please select a response for <strong>{selectedRow?.name}</strong>:</p>
        <RadioGroup
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        >
          <FormControlLabel value="Interested" control={<Radio />} label="Interested" />
          <FormControlLabel value="Not Interested" control={<Radio />} label="Not Interested" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!response}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponseModal;
