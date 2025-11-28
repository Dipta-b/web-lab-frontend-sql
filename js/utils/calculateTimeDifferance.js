function timeDiff(dateTimeString) {
    const now = new Date();
    const past = new Date(dateTimeString);

    let diff = Math.floor((now - past) / 1000);  // seconds

    const days = Math.floor(diff / (60 * 60 * 24));
    diff = days * 60 * 60 * 24;

    const hours = Math.floor(diff / (60 * 60));
    diff -= hours * 60 * 60;

    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;

    const seconds = diff;

    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    if (minutes > 0) return `${minutes} minutes`;
    return `${seconds} seconds`;
}
timeDiff()