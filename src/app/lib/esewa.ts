// utils/esewa.js
export const redirectToEsewa = ({ amount, productId }) => {
  const merchantCode = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE;
  const successUrl = process.env.NEXT_PUBLIC_ESEWA_SUCCESS_URL;
  const failureUrl = process.env.NEXT_PUBLIC_ESEWA_FAILURE_URL;
  const baseUrl = process.env.NEXT_PUBLIC_ESEWA_BASE_URL;

  const esewaURL = `${baseUrl}?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&pid=${productId}&scd=${merchantCode}&su=${successUrl}&fu=${failureUrl}`;

  window.location.href = esewaURL;
};
