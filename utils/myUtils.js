/**
 * transform all the properties name to "_property"
 * @param {Object} obj 
 * @returns an Object with properties name modified.
 */
export function objPrivProp(obj){
  const copy = {}
  for (const prop in obj) {
    copy[`_${prop}`] = obj[prop];
  }
  return copy;
}

export const compose = (...fns) => (initial) => fns.reduceRight((acc, fn) => { return fn(acc)}, initial);