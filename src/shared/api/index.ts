import axios, { AxiosError } from "axios";
import { getItem } from "../utils/local_storage";
const env = import.meta.env;

function createInstance(baseURL: string, type: string) {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": type,
  };

  const axiosInstance = axios.create({ baseURL, headers });
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const isAuthorization = getItem("Authorization");

      if (isAuthorization && config.headers) {
        config.headers.Authorization = `Bearer ${isAuthorization || ""}`;
      }

      return config;
    },
    (error: any) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    async (res: any) => res,
    (error: AxiosError) => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (error.response?.status === 401 && refreshToken) {
        axios
          .post(
            env.VITE_APP_API_URL + "auth/refresh",
            { refresh: refreshToken },
            {
              headers: {
                ...headers,
                authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          .then((res: any) => {
            localStorage.setItem("Authorization", res.data.token);
            window.location.reload();
          })
          .catch((error: any) => {
            window.location.reload();
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

const instance = createInstance(env.VITE_APP_API_URL, "application/json");

interface Params {
  url: string;
}

interface GetParams extends Params {
  params?: any;
}

interface PostData extends Params {
  data?: any;
}
interface PostDataImg extends Params {
  url: string;
  data?: any;
}
interface DeleteData extends Params {
  data?: any;
}

export const useGet = ({ url, params }: GetParams) => {
  return instance.get(url, { params });
};

export const usePost = ({ url, data }: PostData) => {
  return instance.post(url, data);
};

export const useUpdate = ({ url, data }: DeleteData) => {
  return instance.patch(url, data);
};

export const useDelete = ({ url, data }: DeleteData) => {
  return instance.delete(url, { data });
};
