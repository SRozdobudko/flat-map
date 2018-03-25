export function toNumberIfNumber(value) {
  return (isNaN(value) || value === null || Array.isArray(value) || value === '') ? value : Number(value);
}

export function toArray(object) {
  return Object.keys(object).map(key => {
    return {id: toNumberIfNumber(key), name: object[key]};
  });
}
