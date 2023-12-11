/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'; // Add BrowserRouter to simulate routing
import SideBar from '../components/DashBoard/SideBar/SideBar.jsx';

describe('SideBar Component Integration Tests', () => {
  test('renders the sidebar with menu items', () => {
    render(
      <Router>
        <SideBar />
      </Router>
    );

    // expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Expense Management')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('navigates to the correct route on menu item click', async () => {
    render(
      <Router>
        <SideBar />
      </Router>
    );

    fireEvent.click(screen.getByText('Expense Management'));

    // Wait for navigation to complete
    await waitFor(() => {
      expect(window.location.pathname).toBe('/expence-management');
    });
  });

  test('handles Logout button click', async () => {
    render(
      <Router>
        <SideBar />
      </Router>
    );

    // Mock the sessionStorage.clear method
    // const sessionStorageMock = jest.spyOn(window.sessionStorage, 'clear').mockImplementation(() => {});

    fireEvent.click(screen.getByText('Logout'));

    // Wait for navigation to complete
    await waitFor(() => {
    //   expect(sessionStorageMock).toHaveBeenCalled();
      expect(window.location.pathname).toBe('/');
    });

    // Restore the original method
    // sessionStorageMock.mockRestore();
  });

  // Add more tests as needed for different scenarios
});
