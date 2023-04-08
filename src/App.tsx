import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApplicationDetail from "./pages/application/ApplicationDetail";
import ApplicationList from "./pages/application/ApplicationList";
import ApplicationNew from "./pages/application/ApplicationNew";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<ApplicationList />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/applications/new" element={<ApplicationNew />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
