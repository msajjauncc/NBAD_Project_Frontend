import axios from "axios";
import Helper from "./helper";

function callApi(method, callUrl, requestPayload) {
  const token = Helper.getItem("TOKEN");
  const endpoint = "https://king-prawn-app-2i8vt.ondigitalocean.app";
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    switch (method.toLowerCase()) {
      case "post":
        axios
          .post(endpoint + callUrl, requestPayload, {
            headers: headers,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        break;

      case "get":
        axios
          .get(endpoint + callUrl, {
            headers: headers,
            params: requestPayload,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        break;

      case "delete":
        axios
          .delete(endpoint + callUrl, {
            headers: { ...headers, ...requestPayload },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        break;

      default:
        reject(new Error("Unsupported HTTP method"));
        break;
    }
  });
}

export default callApi;
