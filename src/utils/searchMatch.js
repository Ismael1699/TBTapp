export default function searchMatch(ArrayData, stringMatch, arrayKeys) {
  const upperCase = stringMatch.toUpperCase();
  const arrayMatch = ArrayData?.filter((obj, index) => {
    const arrayValues = Object.values(obj);
    let matchValue = false;
    console.log(arrayValues);
    arrayValues.map((value, index) => {
      const isMatchString =
        typeof value === 'number' || typeof value === 'object'
          ? value === upperCase
          : value.toUpperCase() === upperCase;
      console.log(value + ' is :' + isMatchString);
      isMatchString ? (matchValue = true) : null;
    });
    console.log('Array pasa preuba: ' + matchValue);
    console.log('-----');
    if (matchValue) return true;
  });

  return arrayMatch;
}
