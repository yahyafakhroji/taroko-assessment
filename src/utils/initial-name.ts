export function generateInitialName(str: string) {
  const nameArray = str.split(' ');
  const firstName = nameArray[0].charAt(0).toUpperCase();
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  return firstName + lastName;
}
