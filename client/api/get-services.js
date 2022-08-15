export default function getServices(token) {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  return fetch('/api/subscriptions/services', req)
    .then(res => res.json())
    .then(result => {
      if (result.error) return console.error(result);
      return result;
    });
}
