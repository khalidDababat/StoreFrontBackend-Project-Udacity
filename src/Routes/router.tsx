import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import LogINSignUb from '../Components/LogInUser/LogInUser';
import Products from '../Components/Products/Products';
import CreateProduct from '../Components/CreateProduct/CreateProduct';
import Layout from '../Components/Layout/Layout';

import MainLayout  from '../Components/Layout/MainLayout';
import { authLoader } from './authLoader';

export const router = createBrowserRouter([
    {
        path: '/',
        loader: () => redirect('/MainLayout'),
    },
    {path: '/MainLayout', element: <MainLayout />},
    { path: '/login', element: <LogINSignUb /> },
    {
        element: <Layout />,
        loader: authLoader, // Check auth for all nested routes
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/createProduct',
                element: <CreateProduct />,
            },
        ],
    },
]);
