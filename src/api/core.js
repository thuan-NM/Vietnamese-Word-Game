import axios from "axios";

export function apiElement(method, url) {
  return {
    invoke: ({ data, queries, urlParams } = {}) => {
      if (urlParams) {
        for (const key in urlParams) {
          url = url.replace(`:${key}`, urlParams[key]);
        }
      }

      return axios.request({
        baseURL: process.env.REACT_APP_API_URL,
        method,
        url: url,
        data,
        params: queries,
      });
    },
  };
}
