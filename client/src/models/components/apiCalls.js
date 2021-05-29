export const getOrder = () => {
  return fetch(`/api/payment`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const grabStatus = (paymentId) => {
  return fetch(`/api/payment/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
