import axiosClient from './Axios';

export const getProducts = (): any => {
  try {
    const response = axiosClient.get('/product');
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProductById = (id: any): any => {
  try {
    const response = axiosClient.get(`/product/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const saveProduct = (payload): any => {
  try {
    const response = axiosClient.post(`/cart`, payload);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
