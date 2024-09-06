import axios from "axios";

const API_URL = "https://manual-api.lambdatest.com";

const serviceAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const onSuccessResponse = (response) => {
  return response;
};

const onErrorResponse = (error) => {
  localStorage.removeItem("sessionToken");
  return Promise.reject(error);
};

// Centralize error handling
serviceAPI.interceptors.response.use(onSuccessResponse, onErrorResponse);

export async function generateAuthToken() {
  serviceAPI.defaults.headers.common["Authorization"] = `Basic ${btoa(
    process.env.REACT_APP_USERNAME + ":" + process.env.REACT_APP_ACCESS_KEY
  )}`;
  const response = await serviceAPI
    .post("/tests/generate-test-session-token")
    .then((res) => res);
  return response;
}

export async function getDeviceList(params) {
  const sessionToken = localStorage.getItem("sessionToken");
  if (typeof sessionToken === "undefined" || sessionToken == null) {
    return false;
  } else {
    serviceAPI.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionToken}`;

    const response = await serviceAPI
      .get("/ltms/device/list", {
        params: params,
      })
      .then((res) => res);
    return response;
  }
}
