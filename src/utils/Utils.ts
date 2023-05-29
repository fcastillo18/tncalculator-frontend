export const capitalizeString = (inputString: string): string => {
  // Convert the string to lowercase and split it on underscores
  const words = inputString.toLowerCase().split('_');

  // Capitalize the first letter of each word and join them back together with spaces
  const result = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return result;
};
