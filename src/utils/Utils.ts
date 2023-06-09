export const capitalizeString = (inputString: string): string => {
  // Convert the string to lowercase and split it on underscores
  const words = inputString.toLowerCase().split('_');

  // Capitalize the first letter of each word and join them back together with spaces
  const result = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return result;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}
