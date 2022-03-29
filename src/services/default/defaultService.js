import axiosConfig from '../../configurations/axiosConfig';

const handleResponse = (error) => {
  if (
    error.response &&
    (error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 422)
  ) {
    return error.response && error.response.data;
  }
  return error.response && error.response.data;
};

export const fetchSmartContractListService = () =>
  axiosConfig
    .get(`/smart-contracts/list`)
    .then((response) => response.data)
    .catch(handleResponse);

export const createSmartContractService = (data) =>
  axiosConfig
    .post(`/hook/carban/deploy`, data)
    .then((response) => response.data)
    .catch(handleResponse);

export const testSmartContractService = (data) =>
  axiosConfig
    .post(`/hook/carban/pay`, data)
    .then((response) => response.data)
    .catch(handleResponse);
