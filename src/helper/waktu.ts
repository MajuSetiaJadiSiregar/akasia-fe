export function timeAgo(timestamp: string): string {
    const timestamps = new Date(timestamp);
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - timestamps.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const diffMonths = Math.ceil(diffDays / 30);
    const diffYears = Math.ceil(diffMonths / 12);
    const timeAgo = `${diffYears} years, ${diffMonths % 12} months, ${diffDays % 30} days ago`;
    return timeAgo
}
  