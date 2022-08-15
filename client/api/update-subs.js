export default function updateSubs(token, subsId, reqParams) {
  const req = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(reqParams)
  };

  return fetch(`/api/subscriptions/${subsId}`, req)
    .then(res => res.json())
    .then(result => {
      if (result.error) console.error(result);
      return result;
    });
}
