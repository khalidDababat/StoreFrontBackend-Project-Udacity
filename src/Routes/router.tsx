import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import LogINSignUb from '../Components/LogInUser/LogInUser';
import { authLoader } from './authLoader';

export const router = createBrowserRouter([
    {
        path: '/',
        loader: () => redirect('/login'),
    },
    { path: '/login', element: <LogINSignUb /> },
    {
        path: '/dashboard',
        element: <Dashboard />,
        loader: authLoader, // protected
    },
]);
