import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CarimboPage } from './pages/carimbo';
import { Header } from './components/Header';
import { store } from './store';
import { EnvelopePage } from './pages/envelope';
import 'antd/dist/antd.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CarimboPage />} />
          <Route path="/carimbo" element={<CarimboPage />} />
          <Route path="/envelope" element={<EnvelopePage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}
