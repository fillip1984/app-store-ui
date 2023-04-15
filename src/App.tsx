import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nav from "./components/navigation/TopNav";
import ApplicationDetail from "./pages/application/ApplicationDetailPage";
import ApplicationList from "./pages/application/ApplicationListPage";
import TagListPage from "./pages/tag/TagListPage";
import TageDetailPage from "./pages/tag/TageDetailPage";
import AdminPage from "./pages/admin/AdminPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<ApplicationList />} />
            <Route path="/applications" element={<ApplicationList />} />
            <Route path="/applications/:id" element={<ApplicationDetail />} />
            <Route path="/tags" element={<TagListPage />} />
            <Route path="/tags/:id" element={<TageDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
