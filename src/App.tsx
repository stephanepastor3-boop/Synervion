import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { StudyPage } from './pages/StudyPage';
import CalculatorPage from './pages/CalculatorPage';
import { ArticleTemplate } from './components/ArticleTemplate';
import { articles } from './data/articles';
import ScrollToHashElement from './components/ScrollToHashElement';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study/:id" element={<StudyPage />} />
          <Route path="/calculator/cordyceps-goal-planner" element={<CalculatorPage />} />
          {articles.map((article) => (
            <Route
              key={article.slug}
              path={`/${article.slug}`}
              element={<ArticleTemplate article={article} />}
            />
          ))}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
