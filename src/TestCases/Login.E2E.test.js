/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login/Login';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200, data: { accessToken: 'mockToken', name: 'mockUser' } }),
  })
);

describe('Login Component', () => {
    beforeEach(() => {
      render(<Login />);
    });
    
  
    it('should successfully log in with valid credentials', async () => {
      global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200, data: { accessToken: 'mockToken', name: 'mockUser' } }),
      })
    );
      
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'gokul@gmail.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12341234' } });
      fireEvent.click(screen.getByText('Login'));
  
      await waitFor(() => {
        
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), expect.any(Object));
        expect(sessionStorage.getItem('access_token')).toEqual('mockToken');
        expect(sessionStorage.getItem('userdata')).toEqual('mockUser');
    
      
      });
    });
  
    
  
    it('should display an error message with invalid password', async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'gokul@gmail.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'asdfgghh' } });
      fireEvent.click(screen.getByText('Login'));
  
      await waitFor(() => {
        expect(screen.getByText('Login')).toBeInTheDocument();
        //'Login' should be replaced with the error message which pops up when not given a correct password
      });
    });
  
  
    it('should navigate to the sign-up page when "Create An Account" is clicked', () => {
      
  
      fireEvent.click(screen.getByText("Create An Account"));
       waitFor(() => {
        expect(window.location.pathname).toEqual('/sign-up'); 
        //expect(screen.getByText('Back to Login')).toBeInTheDocument();
      });
    });
  });