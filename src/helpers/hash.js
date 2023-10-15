import CryptoJS from "crypto-js";
const { VITE_SECRET_KEY_PWD } = import.meta.env;

// export const hasing = (id) => {
//   return CryptoJS.SHA3(id, { outputLength: 256 });
// };

export const encPwd = (password) => {
  return CryptoJS.AES.encrypt(password, VITE_SECRET_KEY_PWD).toString();
};

export const decPwd = (password) => {
  return CryptoJS.AES.decrypt(password, VITE_SECRET_KEY_PWD).toString(
    CryptoJS.enc.Utf8
  );
};
