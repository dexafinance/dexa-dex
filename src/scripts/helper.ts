/* helpers */
export const getBadgeClassName = (status: string): string => {
  const suffix: { [status: string]: string } = {
    active: 'success',
    inactive: 'warning',
    jailed: 'danger',
    unbonding: 'danger',
  }

  return `badge-${suffix[status]}`
}
