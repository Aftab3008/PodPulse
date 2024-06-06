function formatPodcastCount(count: number) {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return (count / 1000000).toFixed(1) + "M";
  }
}
