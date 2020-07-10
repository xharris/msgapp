const rates = {
  mi: 1,
  km: 1.609,
  ft: 5280,
}

export const fromMiles = (v, u) => rates[u] * v
export const toMiles = (v, u) => rates[u] / v
