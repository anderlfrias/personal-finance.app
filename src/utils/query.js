export function getQueryByObject (obj) {
  return Object.keys(obj).map(key => {
      return `${key}=${obj[key]}`;
  }).join('&');
}

export function getObjectByQuery (query) {
  const obj = {};
  if (!query) return obj;
  const arr = query.split('&');
  arr.forEach(item => {
      const [key, value] = item.split('=');
      obj[key] = value;
  })
  return obj;
}