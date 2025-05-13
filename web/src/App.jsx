import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// 페이지 컴포넌트들 import
// import Home from './pages/Home';
// import About from './pages/About';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* 라우트 설정 예시 */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;