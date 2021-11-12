import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // refreh token implemented with interceptors

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        if (err.response.status === 400) {
          store.dispatch("auth/logout");
          location.reload();
        }
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            if (rs.data.sucess) {
              store.dispatch("auth/setrefreshtoken", rs.data);
              TokenService.setUser(rs.data);

              TokenService.setLocalAccessToken(rs.data.accessToken);
              TokenService.setLocalRefreshToken(rs.data.refreshToken);

              return axiosInstance(originalConfig);
            }
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
