const truncateBody = (text) => {
  const words = text.split(' ');
  if (words.length > 111) {
    return words.slice(0, 111).join(' ') + '...';
  }
  return text;
};

export { truncateBody }