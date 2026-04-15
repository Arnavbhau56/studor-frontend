import { useState, useCallback } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityFeed from './components/ActivityFeed';
import FilterBar from './components/FilterBar';
import CreditSummary from './components/CreditSummary';
import { loadActivities, saveActivities } from './utils/storage';
import { CATEGORIES } from './utils/credits';
import './index.css';

function getCounts(activities) {
  return CATEGORIES.reduce((acc, cat) => {
    acc[cat] = activities.filter((a) => a.category === cat).length;
    return acc;
  }, {});
}

export default function App() {
  const [activities, setActivities] = useState(() => loadActivities());
  const [filter, setFilter] = useState('All');

  const handleAdd = useCallback((activity) => {
    setActivities((prev) => {
      const next = [activity, ...prev];
      saveActivities(next);
      return next;
    });
  }, []);

  const handleDelete = useCallback((id) => {
    setActivities((prev) => {
      const next = prev.filter((a) => a.id !== id);
      saveActivities(next);
      return next;
    });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-mark">◈</span>
            <span className="brand-name">PathCredit Logger</span>
          </div>
          <span className="brand-sub">by Studor</span>
        </div>
      </header>

      <main className="app-main">
        <section className="section-form">
          <ActivityForm onAdd={handleAdd} />
          <CreditSummary activities={activities} />
        </section>

        <section className="section-feed">
          <div className="feed-header">
            <span className="feed-title">Activity Feed</span>
            <span className="feed-count">{activities.length} logged</span>
          </div>

          <FilterBar
            active={filter}
            onChange={setFilter}
            counts={getCounts(activities)}
          />

          <ActivityFeed
            activities={activities}
            filter={filter}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
