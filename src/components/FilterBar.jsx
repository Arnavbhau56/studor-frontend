import { CATEGORIES } from '../utils/credits';

const CATEGORY_COLORS = {
  Academic: '#4f8ef7',
  Technical: '#e0643a',
  Cultural: '#9b5de5',
  Sports: '#2ec4b6',
};

export default function FilterBar({ active, onChange, counts }) {
  const all = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="filter-bar">
      <button
        className={`filter-chip ${active === 'All' ? 'filter-chip--active' : ''}`}
        onClick={() => onChange('All')}
      >
        All <span className="chip-count">{all}</span>
      </button>

      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`filter-chip ${active === cat ? 'filter-chip--active' : ''}`}
          style={active === cat ? { '--chip-color': CATEGORY_COLORS[cat] } : {}}
          onClick={() => onChange(cat)}
        >
          {cat} <span className="chip-count">{counts?.[cat] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
