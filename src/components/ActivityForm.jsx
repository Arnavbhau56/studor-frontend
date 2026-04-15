import { useState } from 'react';
import { CATEGORIES, getCredits } from '../utils/credits';

const today = () => new Date().toISOString().split('T')[0];

const EMPTY_FORM = {
  name: '',
  category: '',
  date: today(),
};

export default function ActivityForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate(data) {
    const e = {};
    if (!data.name.trim()) e.name = 'Activity name is required.';
    if (data.name.trim().length > 100) e.name = 'Keep it under 100 characters.';
    if (!data.category) e.category = 'Pick a category.';
    if (!data.date) e.date = 'Date is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const activity = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category,
      date: form.date,
      credits: getCredits(form.category),
      createdAt: new Date().toISOString(),
    };

    onAdd(activity);
    setForm(EMPTY_FORM);
    setErrors({});

    // Brief success flash
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1800);
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <span className="form-label">LOG ACTIVITY</span>
        {submitted && <span className="success-badge">✓ Added</span>}
      </div>

      <div className="field-row">
        <div className={`field ${errors.name ? 'field--error' : ''}`}>
          <label htmlFor="name">Activity Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Hackathon project, Essay submission…"
            autoComplete="off"
            maxLength={100}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>
      </div>

      <div className="field-row field-row--split">
        <div className={`field ${errors.category ? 'field--error' : ''}`}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            <option value="">— Select —</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-msg">{errors.category}</span>}
        </div>

        <div className={`field ${errors.date ? 'field--error' : ''}`}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            max={today()}
          />
          {errors.date && <span className="error-msg">{errors.date}</span>}
        </div>
      </div>

      {form.category && (
        <div className="credit-preview">
          This activity earns <strong>{getCredits(form.category)} PathCredits</strong>
        </div>
      )}

      <button type="submit" className="submit-btn">
        + Add to Feed
      </button>
    </form>
  );
}
