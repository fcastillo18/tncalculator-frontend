import React, { useContext, useEffect, useRef, useState } from 'react';
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
import {
  Operation,
  OperationRequestData,
  OperationResult,
  OperationType,
} from '../../types/RecordTypes';
import { sampleOperationResult } from '../../mocks/mocks';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createOperation,
  fetchAllOperations,
  generateRandomString,
} from '../../api/api';
import { capitalizeString } from '../../utils/Utils';
import { AuthContext } from '../../auth/AuthContext';

const CreateOperation: React.FC = () => {
  const [operationData, setOperationData] = useState<OperationRequestData>({
    userId: 1,
    num1: 0,
    num2: 0,
  });

  const [operationResult, setOperationResult] =
    useState<OperationResult | null>(sampleOperationResult);

  const [operationType, setOperationType] = useState<OperationType>(
    OperationType.ADDITION
  );
  const [showAlert, setShowAlert] = useState(false);
  const [randomString, setRandomString] = useState<string | null>(null);
  const num1Ref = useRef<HTMLInputElement | null>(null);
  const num2Ref = useRef<HTMLInputElement | null>(null);

  const [operations, setOperations] = useState<Operation[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['operations'], // TODO refactor this and create constant
    queryFn: fetchAllOperations,
  });

  const { signedInUser } = useContext(AuthContext);

  const apiKey = '19bf67d3-2070-4520-bfc6-62699bca655d'; // TODO create this as a ENV variable

  const {
    data: randomStringData,
    isLoading: randomStringIsLoading,
    error: randomStringError,
  } = useQuery<string[]>(['generateString', apiKey], () =>
    generateRandomString(apiKey)
  );

  useEffect(() => {
    if (!randomStringIsLoading && randomStringData) {
      setRandomString(randomStringData[0]);
    }
  }, [randomStringIsLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      const operations: Operation[] = data.content;
      setOperations(operations);
    }
  }, [isLoading, data]);

  const handleOperationTypeChange = (
    event: SelectChangeEvent<OperationType>
  ) => {
    setOperationType(event.target.value as OperationType);
    setShowAlert(false);
  };

  const handleNum1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationData({ ...operationData, num1: Number(event.target.value) });
    setShowAlert(false);
  };

  const handleNum2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationData({ ...operationData, num2: Number(event.target.value) });
    setShowAlert(false);
  };

  const handleNum2KeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const createOperationMutation = useMutation(
    (operationData: OperationRequestData) =>
      createOperation(operationType, operationData),
    {
      onError: (error) => {
        console.error('Error creating operation:', error);
      },
      onSuccess: (data) => {
        setOperationResult(data);
        setShowAlert(true);
        // Clear the input fields after the operation
        setOperationData({ ...operationData, num1: 0, num2: 0 });
      },
    }
  );

  const handleSubmit = () => {
    createOperationMutation.mutate({
      ...operationData,
    });
    setShowAlert(true);
  };

  const handleNum1KeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && num2Ref.current) {
      num2Ref.current.focus();
    }
  };

  const shouldDisableInput =
    operationType === OperationType.RANDOM_STRING ||
    operationType === OperationType.SQUARE_ROOT;

  return isLoading ? ( // TODO refactor this and create components for loading and error states
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{`An error occurred: ${error}`}</h2>
  ) : (
    <ContainerLayout>
      <BodyLayout>
        <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 6 }}>
          Operation page
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: 'right' }}
          >
            Remaining Balance:{' $'}
            {signedInUser?.balance ?? 'N/A'}
          </Typography>
        </Box>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="operation-type-label">Operation</InputLabel>
          <Select
            data-testid="operation-type-id"
            value={operationType}
            onChange={handleOperationTypeChange}
            label="Operation Type"
          >
            {operations
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((operation, index) => {
                return (
                  <MenuItem value={operation.type} key={index}>
                    {capitalizeString(operation.type)}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
          Operation Cost:{' $'}
          {operations.find((o) => o.type === operationType)?.cost ?? 'N/A'}
        </Typography>

        <FormControl variant="outlined" fullWidth margin="normal">
          {operationType === OperationType.RANDOM_STRING ? (
            <>
              <InputLabel htmlFor="num1">Random String</InputLabel>
              <OutlinedInput
                id="num1"
                value={randomString}
                onChange={handleNum1Change}
                label="Number 1"
                onKeyDown={handleNum1KeyDown}
                inputRef={num1Ref}
              />
            </>
          ) : (
            <>
              <InputLabel htmlFor="num1">Number 1</InputLabel>
              <OutlinedInput
                id="num1"
                value={operationData.num1}
                onChange={handleNum1Change}
                label="Number 1"
                onKeyDown={handleNum1KeyDown}
                inputRef={num1Ref}
              />
            </>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={shouldDisableInput}
        >
          <InputLabel htmlFor="num2">Number 2</InputLabel>

          <OutlinedInput
            id="num2"
            value={operationData.num2}
            onChange={handleNum2Change}
            onKeyDown={handleNum2KeyDown}
            label="Number 2"
            inputRef={num2Ref}
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Calculate
        </Button>

        {showAlert && operationResult && (
          <Alert
            severity="info"
            onClose={() => setShowAlert(false)}
            sx={{ mt: 3 }}
          >
            {capitalizeString(operationType)} result ={' '}
            {operationResult.operationResult}
          </Alert>
        )}
      </BodyLayout>
    </ContainerLayout>
  );
};

export default CreateOperation;
