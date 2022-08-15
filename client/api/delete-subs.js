export default function deleteSubs(token, subsId) {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  return fetch(`/api/subscriptions/${subsId}`, req)
    .then(res => res.json())
    .then(result => {
      if (result.error) console.error(result);
      return result;
    });
}
