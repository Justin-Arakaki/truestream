export default function getSubs(token) {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  return fetch('/api/subscriptions', req)
    .then(res => res.json())
    .then(result => {
      if (result.error) console.error(result);
      return result;
    });
}
