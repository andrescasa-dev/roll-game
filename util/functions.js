/**
 * transform all the properties name to "_property"
 * @param {Object} obj 
 * @returns an Object with properties name modified.
 */
export function privateProperties(obj){
  const copy = {}
  for (const prop in obj) {
    copy[`_${prop}`] = obj[prop];
  }
  return copy;
}