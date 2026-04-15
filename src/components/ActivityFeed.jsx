const CATEGORY_META = {
  Academic:  { color: '#4f8ef7', icon: '📚' },
  Technical: { color: '#e0643a', icon: '⚙️' },
  Cultural:  { color: '#9b5de5', icon: '🎭' },
  Sports:    { color: '#2ec4b6', icon: '🏅' },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ActivityFeed({ activities, filter, onDelete }) {
  const filtered =
    filter === 'All' ? activities : activities.filter((a) => a.category === filter);

  if (activities.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p className="empty-title">No activities yet</p>
        <p className="empty-sub">Log your first activity above to start earning PathCredits.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p className="empty-title">No {filter} activities</p>
        <p className="empty-sub">Try a different category filter.</p>
      </div>
    );
  }

  return (
    <ul className="activity-feed">
      {filtered.map((activity, idx) => {
        const meta = CATEGORY_META[activity.category] ?? { color: '#888', icon: '•' };
        return (
          <li
            key={activity.id}
            className="activity-card"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <span className="activity-icon">{meta.icon}</span>

            <div className="activity-body">
              <span className="activity-name">{activity.name}</span>
              <div className="activity-meta">
                <span
                  className="activity-category"
                  style={{ color: meta.color, borderColor: meta.color }}
                >
                  {activity.category}
                </span>
                <span className="activity-date">{formatDate(activity.date)}</span>
              </div>
            </div>

            <div className="activity-right">
              <span className="activity-credits">+{activity.credits} PC</span>
              <button
                className="delete-btn"
                onClick={() => onDelete(activity.id)}
                aria-label="Delete activity"
                title="Remove"
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
