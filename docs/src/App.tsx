import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BasicExamplesPage } from './pages/BasicExamplesPage';
import { SortingFilteringPage } from './pages/SortingFilteringPage';
import { FilteringExamplesPage } from './pages/FilteringExamplesPage';
import { PaginationPage } from './pages/PaginationPage';
import { VirtualizationPage } from './pages/VirtualizationPage';
import { CustomRenderingPage } from './pages/CustomRenderingPage';
import { AdvancedFeaturesPage } from './pages/AdvancedFeaturesPage';
import { ApiReferencePage } from './pages/ApiReferencePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic" element={<BasicExamplesPage />} />
          <Route path="/sorting-filtering" element={<SortingFilteringPage />} />
          <Route path="/filtering" element={<FilteringExamplesPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/virtualization" element={<VirtualizationPage />} />
          <Route path="/custom-rendering" element={<CustomRenderingPage />} />
          <Route path="/advanced" element={<AdvancedFeaturesPage />} />
          <Route path="/api-reference" element={<ApiReferencePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;