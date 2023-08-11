export default function searchMatch(ArrayData, stringMatch, arrayKeys) {
  const upperCase = stringMatch.toUpperCase();
  const arrayMatch = ArrayData?.filter((obj, index) => {
    const arrayValues = Object.values(obj);
    let matchValue = false;
    arrayValues.map((value, index) => {
      const regex = new RegExp(value, 'g');

      if (regex.test(upperCase)) matchValue = true;
    });
    if (matchValue) return true;
  });
  console.log('esto es el array final :' + arrayMatch);
  return arrayMatch;
}
