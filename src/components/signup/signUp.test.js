import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import SignUp from './signUp';
import rootReducer from '../../redux'; // import the root reducer or a specific configured store

// Mock the useDispatch and useSelector hooks from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignUp Component', () => {
  const initialState = { login: { isLoading: false, operationType: null } };
  const store = createStore(rootReducer, initialState);

  const setup = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the sign-up form', () => {
    setup();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('submits the form with name, email, and password', async () => {
    setup();
    const nameInput = screen.getByPlaceholderText('Enter name');
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: 'Sign up' });

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(emailInput, 'john@example.com');
    userEvent.type(passwordInput, 'password123');

    userEvent.click(submitButton);

    // Assuming signUp dispatches an action, we would want to confirm that here
    // This would typically involve more detailed mocking or a spy on the dispatch function
    // For example, you could use `const dispatch = useDispatch();` and then check `dispatch` was called with the signUp action.
  });

  it('navigates to home on SIGN_UP_SUCCESS', async () => {
    store.dispatch({ type: 'SIGN_UP_SUCCESS' });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  it('shows spinner when isLoading is true', () => {
    store.dispatch({ type: 'LOADING_STATE', payload: true });
    setup();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
