import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicationDetail from "./pages/application/ApplicationDetail";
import ApplicationList from "./pages/application/ApplicationList";

const App = () => {
  return (
    <div className="App h-full bg-slate-200">
      <Router>
        <Routes>
          <Route path="/" element={<ApplicationList />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
