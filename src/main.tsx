import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { MotionConfig } from 'framer-motion';
import '@mantine/core/styles.css';
import './styles.css';
import App from './App';

const theme = createTheme({ fontFamily: 'Karla, Arial, sans-serif', primaryColor: 'gray', defaultRadius: 4, headings: { fontFamily: 'Cardo, Georgia, serif', fontWeight: '400' } });
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MantineProvider theme={theme} defaultColorScheme="light" forceColorScheme="light"><MotionConfig reducedMotion="user"><App /></MotionConfig></MantineProvider></React.StrictMode>);
