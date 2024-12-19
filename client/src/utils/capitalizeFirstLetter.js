const capitalizeFirstLetter = (string) => {
  if (!string) return ""; // Handle empty or null input
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default capitalizeFirstLetter;
