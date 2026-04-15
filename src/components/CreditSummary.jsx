import { totalCredits, creditBreakdown } from '../utils/credits';

const CATEGORY_COLORS = {
  Academic:  '#4f8ef7',
  Technical: '#e0643a',
  Cultural:  '#9b5de5',
  Sports:    '#2ec4b6',
};

export default function CreditSummary({ activities }) {
  const total = totalCredits(activities);
  const breakdown = creditBreakdown(activities).filter((b) => b.count > 0);

  if (activities.length === 0) return null;

  return (
    <div className="credit-summary">
      <div className="summary-total">
        <span className="total-number">{total}</span>
        <span className="total-label">PathCredits Earned</span>
      </div>
      {breakdown.length > 0 && (
        <div className="summary-breakdown">
          {breakdown.map((b) => (
            <div key={b.category} className="breakdown-item">
              <span
                className="breakdown-dot"
                style={{ background: CATEGORY_COLORS[b.category] }}
              />
              <span className="breakdown-cat">{b.category}</span>
              <span className="breakdown-val">{b.credits} PC</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
