import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import Success from './pages/Success';

function AppContent() {
  const { page } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'landing': return <Landing />;
      case 'login': return <Login />;
      case 'register': return <Register />;
      case 'dashboard': return <Dashboard />;
      case 'wizard': return <Wizard />;
      case 'success': return <Success />;
      default: return <Landing />;
    }
  };

  return (
    <>
      <Navbar />
      <main>{renderPage()}</main>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
