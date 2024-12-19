const formatDate = (dateString) => {
  const givenDate = new Date(dateString); // Convert input to Date object

  if (isNaN(givenDate.getTime())) {
    return "Invalid Date"; // Handle invalid date input
  }

  const month = String(givenDate.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed)
  const day = String(givenDate.getDate()).padStart(2, "0"); // Get day
  const year = givenDate.getFullYear(); // Get year

  return `${month}-${day}-${year}`; // Return formatted date
};

export default formatDate;
