import React, { useRef, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Box,
  Alert,
} from '@mui/material';
import ContainerLayout from '../../components/Layouts/ContainerLayout';
import BodyLayout from '../../components/Layouts/BodyLayout';
import { OperationData, OperationResult } from '../../types/RecordTypes';
import { sampleOperationResult } from '../../mocks/mocks';

const Operation: React.FC = () => {
  const [operationData, setOperationData] = useState<OperationData>({
    userId: 2,
    num1: 0,
    num2: 0,
  });

  const [operationResult, setOperationResult] =
    useState<OperationResult | null>(sampleOperationResult);

  const [operationType, setOperationType] = useState('Addition');
  const [showAlert, setShowAlert] = useState(true); // TODO change to false, after implementation
  const num1Ref = useRef<HTMLInputElement | null>(null);
  const num2Ref = useRef<HTMLInputElement | null>(null);

  const handleOperationTypeChange = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    setOperationType(event.target.value as string);
  };

  const handleNum1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationData({ ...operationData, num1: Number(event.target.value) });
  };

  const handleNum2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationData({ ...operationData, num2: Number(event.target.value) });
  };

  const handleSubmit = () => {
    // TODO: Call the API with operationData and operationType
    // On response, call setOperationResult with the response data
  };

  const handleNum1KeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && num2Ref.current) {
      num2Ref.current.focus();
    }
  };

  return (
    <ContainerLayout>
      <BodyLayout>
        <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 6 }}>
          Operation page
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pr: 2,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" gutterBottom>
            User:{'Franklin Castillo '}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Remaining Balance:{' $'}
            {operationResult ? operationResult.userRemainingBalance : 'N/A'}
          </Typography>
        </Box>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="operation-type-label">Operation</InputLabel>
          <Select
            labelId="operation-type-label"
            value={operationType as unknown as { value: unknown }}
            onChange={handleOperationTypeChange}
            label="Operation"
          >
            <MenuItem value={'Addition'}>Addition</MenuItem>
            <MenuItem value={'Subtraction'}>Subtraction</MenuItem>
            <MenuItem value={'Multiplication'}>Multiplication</MenuItem>
            <MenuItem value={'Division'}>Division</MenuItem>
            <MenuItem value={'Square Root'}>Square Root</MenuItem>
            <MenuItem value={'Random String'}>Random String</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          Operation Cost:{' '}
          {operationResult ? operationResult.operationCost : 'N/A'}
        </Typography>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="num1">Number 1</InputLabel>
          <OutlinedInput
            id="num1"
            value={operationData.num1}
            onChange={handleNum1Change}
            label="Number 1"
            onKeyDown={handleNum1KeyDown}
            inputRef={num1Ref}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="num2">Number 2</InputLabel>

          <OutlinedInput
            id="num2"
            value={operationData.num2}
            onChange={handleNum2Change}
            label="Number 2"
            inputRef={num2Ref}
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>

        {showAlert && operationResult && (
          <Alert
            severity="info"
            onClose={() => setShowAlert(false)}
            sx={{ mt: 2 }}
          >
            Operation Result: {operationResult.operationResult}
          </Alert>
        )}
      </BodyLayout>
    </ContainerLayout>
  );
};

export default Operation;
