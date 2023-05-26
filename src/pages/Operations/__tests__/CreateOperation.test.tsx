import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateOperation from '../CreateOperation';

test('renders CreateOperation', async () => {
  render(<CreateOperation />);

  // Check if certain elements are in the document
  await screen.findByTestId(/operation-type-id/i);
  // expect(screen.findByTestId(/operation-type-label/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number 1/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number 2/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Calculate/i })
  ).toBeInTheDocument();
});

test('handles input and button click', async () => {
  render(<CreateOperation />);

  await screen.findByTestId(/operation-type-id/i);
  // Type into the input fields
  userEvent.type(screen.getByLabelText(/Number 1/i), '10');
  userEvent.type(screen.getByLabelText(/Number 2/i), '20');

  // Select an option from the select field
  // userEvent.selectOptions(screen.getByTestId(/operation-type-id/i), [
  //   'Addition',
  //   'Addition',
  // ]); This is not working cuz' of the way MUI render the elements in the Select

  userEvent.click(screen.getByText(/Addition/i));

  // Click the button
  userEvent.click(screen.getByRole('button', { name: /Calculate/i }));

  // TODO need to be implemented after api integration
  // Check that an alert was called
  // expect(screen.findByText('Operation Result:'));
});
