import { environment } from './environment';

export const URL = {
  API_BASE_URL: `${environment.apiUrl}`,
};

export const CONFIG = {
  AUTH: {
    LOGIN: `${URL.API_BASE_URL}/user/login`,
    REGISTER: `${URL.API_BASE_URL}/user/register`,
  },
//   USER: {
//     UPDATE: `${URL.API_BASE_URL}/user/update-password`,
//     DELETE: `${URL.API_BASE_URL}/user/delete`,
//   },
  PRODUCT:{
    GETPRODUCTS: `${URL.API_BASE_URL}/product`,
    CREATEORDER: `${URL.API_BASE_URL}/Order`,
    ORDERHISTORY: `${URL.API_BASE_URL}/OrderHistory`,
    CARTHISTORY: `${URL.API_BASE_URL}/CartHistory`,
    ADDTOCART: `${URL.API_BASE_URL}/Cart`,
    PRODUCTDETAILS: `${URL.API_BASE_URL}/product`,
    REMOVEFROMCART: `${URL.API_BASE_URL}/removeItem`,
    DELETECARTHISTORY: `${URL.API_BASE_URL}/DeleteCart`,
  }
};