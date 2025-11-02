import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import LogINSignUb from '../Components/LogInUser/LogInUser';
import Products from '../Components/Products/Products';
import CreateProduct from '../Components/CreateProduct/CreateProduct';

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
    {
        path: '/products',
        element: <Products />,
        loader: authLoader, // protected
    },
    {
        path: '/createProduct',
        element: <CreateProduct />,
        loader: authLoader,
    },
]);
