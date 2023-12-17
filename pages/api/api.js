import axios from "axios";

const getApiUrl = (apiPath) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}${apiPath || ""}`;
  return apiUrl;
};

export const apiBuilder = (apiPath) => {
  const apiUrl = getApiUrl(apiPath);

  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 300000
  });

  return instance.get();
};
