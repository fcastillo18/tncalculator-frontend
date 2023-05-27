import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import OperationsRecords from '../OperationRecords';
import { sampleOperationRecords } from '../../../mocks/mocks';

// TODO this can be refactored to a helper
const server = setupServer(
  rest.get('/api/records', (req, res, ctx) => {
    return res(ctx.json(sampleOperationRecords));
  })
);

// TODO this can be moved to a single place, fi: jest.config
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('OperationsRecords', () => {
  test('renders OperationsRecords', async () => {
    render(<OperationsRecords />);

    expect(await screen.findByText(/ADDITION/i)).toBeInTheDocument();
    // More assertions...
  });
});
