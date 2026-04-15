// PathCredit weights per category
const CREDIT_WEIGHTS = {
  Academic:  10,
  Technical:  9,
  Cultural:   7,
  Sports:     6,
};

/**
 * Returns the PathCredit value for a given category.
 */
export function getCredits(category) {
  return CREDIT_WEIGHTS[category] ?? 5;
}

/**
 * Calculates total PathCredits from an array of activities.
 */
export function totalCredits(activities) {
  return activities.reduce((sum, a) => sum + getCredits(a.category), 0);
}

/**
 * Returns a breakdown of credits per category.
 */
export function creditBreakdown(activities) {
  return Object.keys(CREDIT_WEIGHTS).map((cat) => {
    const items = activities.filter((a) => a.category === cat);
    return {
      category: cat,
      count: items.length,
      credits: items.reduce((s, a) => s + getCredits(a.category), 0),
    };
  });
}

export const CATEGORIES = Object.keys(CREDIT_WEIGHTS);
