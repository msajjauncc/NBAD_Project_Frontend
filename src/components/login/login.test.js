import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../redux/login/reducer';
import Login from './login';

// Mock the helper to avoid actual implementation details in tests
jest.mock('../../helpers/helper', () => ({
  sendNotification: jest.fn(),
  useSelector: jest.fn()
}));

describe('Login Component', () => {
  let store;
  let history;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        login: loginReducer,
      },
    });
    history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
  });

  it('renders the login form with all fields', () => {
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('allows entering email and password', async () => {
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('dispatches signIn action with correct data on form submit', async () => {
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions.some(action => action.type === 'login/signIn')).toBeTruthy();
    });
  });

  it('navigates to home on successful login', async () => {
    store.dispatch({ type: 'login/SIGN_SUCCESS' }); // Simulate successful login

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });

  it('shows loading spinner when isLoading is true', () => {
    store.dispatch({ type: 'login/setLoading', payload: true });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
