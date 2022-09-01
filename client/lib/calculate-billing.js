export default function calculateBilling(subscriptions) {
  let totalCost = 0;
  let totalSavings = 0;
  for (const sub of subscriptions) {
    const monthlyCost = sub.billingCycle === 'monthly'
      ? sub.cost
      : sub.cost / 12;

    if (sub.isActive) {
      totalCost += monthlyCost;
      continue;
    }
    totalSavings += monthlyCost;
  }
  return { totalCost, totalSavings };
}
