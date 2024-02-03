const dateConvertion = (date, language) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  let dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return null;
  }

  return dateObj.toLocaleString(language, options);
}

export { dateConvertion }
