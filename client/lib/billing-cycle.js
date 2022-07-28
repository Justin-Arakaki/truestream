export default class BillingCycle {
  constructor(cycleStart, billingCycle) {
    this.cycleStart = new Date(cycleStart);
    this.billingCycle = billingCycle;
  }

  get length() {
    return this.billingCycle === 'monthly' ? 30 : 365;
  }

  get daysElapsed() {
    const todaysDate = Date.now();
    return (todaysDate - this.cycleStart) / 86400000;
  }

  get daysUntilPayment() {
    return Math.floor(this.daysElapsed % this.length);
  }

  get progress() {
    return (this.daysUntilPayment / this.length) * 100;
  }
}
