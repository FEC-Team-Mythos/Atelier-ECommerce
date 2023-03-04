import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>
      Hello World!
    </div>
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);