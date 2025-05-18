import CryptoJS from "crypto-js";

// const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
// const secretKey = "lIpNCz3u91RyzQC3XOl+Fji8PzYsmLciBmut4Q7p77o=";
// const IV = "0123456789abcdef"; // The same IV as in the backend

// export const encrypt = (data) => {
//   const key = CryptoJS.enc.Base64.parse(secretKey);
//   const iv = CryptoJS.enc.Utf8.parse(IV);

//   const encrypted = CryptoJS.AES.encrypt(data, key, {
//     iv: iv,
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC,
//   });

//   return encrypted.toString();
// };

// export const decrypt = (ciphertext) => {
//   const key = CryptoJS.enc.Base64.parse(secretKey);
//   const iv = CryptoJS.enc.Utf8.parse(IV);

//   const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
//     iv: iv,
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC,
//   });

//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

const secretKey = "lIpNCz3u91RyzQC3XOl+Fji8PzYsmLciBmut4Q7p77o=";

export const encrypt = (data) => {
  // Generate random IV using Web Crypto API (12 bytes for GCM)
  const ivArray = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = CryptoJS.lib.WordArray.create(ivArray);

  // Convert the secret key into a WordArray
  const key = CryptoJS.enc.Base64.parse(secretKey);

  // Encrypt the data using AES-GCM
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const jsonObject = {
    iv: iv.toString(CryptoJS.enc.Base64), // IV as Base64 string
    data: encrypted.toString(), // Encrypted data in Base64
  };

  // Convert the jsonObject to a JSON string
  const jsonString = JSON.stringify(jsonObject);

  // Convert JSON string to Base64
  const base64String = btoa(jsonString);

  // Return Base64 string
  return base64String;
};

export const decrypt = (base64EncodedJson) => {
  // Decode the Base64-encoded JSON string
  const decodedJsonString = atob(base64EncodedJson);

  // Parse the JSON string
  const { iv, data } = JSON.parse(decodedJsonString);

  // Convert the secret key and IV from Base64 into WordArray
  const key = CryptoJS.enc.Base64.parse(secretKey);
  const ivWordArray = CryptoJS.enc.Base64.parse(iv);

  // Decrypt the data using AES-GCM
  const decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: ivWordArray,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
