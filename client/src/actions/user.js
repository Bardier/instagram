export const authorization = async (action, data) => {
  return await fetch(`http://localhost:5000/api/auth/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
