import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BasicExamplesPage } from './pages/BasicExamplesPage';
import { SortingFilteringPage } from './pages/SortingFilteringPage';
import { PaginationPage } from './pages/PaginationPage';
import { VirtualizationPage } from './pages/VirtualizationPage';
import { CustomRenderingPage } from './pages/CustomRenderingPage';
import { AdvancedFeaturesPage } from './pages/AdvancedFeaturesPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic" element={<BasicExamplesPage />} />
          <Route path="/sorting-filtering" element={<SortingFilteringPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/virtualization" element={<VirtualizationPage />} />
          <Route path="/custom-rendering" element={<CustomRenderingPage />} />
          <Route path="/advanced" element={<AdvancedFeaturesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;