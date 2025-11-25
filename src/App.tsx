import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { ArticleTemplate } from './components/ArticleTemplate';
import { articles } from './data/articles';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
