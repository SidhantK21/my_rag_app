import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';
import { FileUpload } from './components/FileUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
