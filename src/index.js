import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import '../node_modules/bootstrap/dist/css/bootstrap-utilities.css'; 
 




import reportWebVitals from './reportWebVitals';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SiginPage from './pages/login';
import CreateAccountPage from './pages/createAccount';
import HomePage from './pages/home';
import ErrorPage from './pages/error';
import MainNavigationPage from './pages/mainNaviagtion';
import ProfileEditPage from './pages/profileEdit';
import CreateProgressPage from './pages/createProgress';
import DietPage from './pages/showDiet';
import WorkoutPage from './pages/workoutDetails';
import ExercicesList from './pages/exercicesList';
import TermsAndConditions from './pages/termsAndConditions';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <SiginPage />,
  },
  {
    path: "/login", 
    element: <SiginPage />,
  },
  {
    path: "/terms-and-conditions", 
    element: <TermsAndConditions />,
  },
  
  {
    path: "/create-account", 
    element: <CreateAccountPage />,
  },
  {
    path: "/home",
    element: <MainNavigationPage />,
  },
  {
    path: "/profile/edit",
    element: <ProfileEditPage />,
  },
  {
    path: "/profile/progress/add",
    element: <CreateProgressPage />,
  },
  {
    path: "/app/diet",
    element: <DietPage />,
  },
  {
    path: "/app/workout",
    element: <WorkoutPage />,
  },
  {
    path: "/app/workout/exercices-list",
    element: <ExercicesList />,
  }

  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
 

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
 
reportWebVitals();
