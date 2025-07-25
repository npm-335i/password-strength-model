import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Password from './components/password';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App