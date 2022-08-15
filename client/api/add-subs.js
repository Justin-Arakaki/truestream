export default function addSubs(token, reqParams) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(reqParams)
  };

  return fetch('/api/subscriptions/', req)
    .then(res => res.json())
    .then(result => {
      if (result.error) console.error(result);
      return result;
    });
}
