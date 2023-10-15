import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/app';

const container: Element | DocumentFragment = document.getElementById('root') || document.createElement('div');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);