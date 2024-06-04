import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import './styles/authentication.css';
import './styles/profile.css';
import './styles/dialog.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
