import { useState } from 'react';
import LandingPage from './components/LandingPage';
import BirthdayPage from './components/BirthdayPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <LandingPage onAuthenticate={() => setIsAuthenticated(true)} />
      ) : (
        <BirthdayPage />
      )}
    </div>
  );
}

export default App;
