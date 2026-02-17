import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MyMPFPage from './pages/MyMPFPage';
import InvestPage from './pages/InvestPage';
import SelectPlanPage from './pages/SelectPlanPage';
import FundTransferPage from './pages/FundTransferPage';
import ConfirmPage from './pages/ConfirmPage';
import TermsPage from './pages/TermsPage';
import SuccessPage from './pages/SuccessPage';
import RecordsPage from './pages/RecordsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyMPFPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/invest/select-plan" element={<SelectPlanPage />} />
        <Route path="/invest/fund-transfer" element={<FundTransferPage />} />
        <Route path="/invest/confirm" element={<ConfirmPage />} />
        <Route path="/invest/terms" element={<TermsPage />} />
        <Route path="/invest/success" element={<SuccessPage />} />
        <Route path="/invest/records" element={<RecordsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
