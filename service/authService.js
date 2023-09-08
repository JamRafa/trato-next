import Api from "../api/api";
import { tokenService } from "./tokenService";

export const authService = {
  async login({ nome, senha }) {
    return await Api.post("/login", {
      nome,
      password: senha,
    }).then((rep) => {
      if (rep.data.message === "invalid")
        return alert("Usuário ou senha inválidos!");
      const { access_token, refresh_token } = rep.data;

      tokenService.salvaToken(access_token);
      tokenService.salvaRefreshToken(refresh_token);
    });
  },

  async verificaSessao(ctx = null) {
    const token = tokenService.pegaToken(ctx);
    const headers = {
      Authorization: `Bearer ${token}`,
      ctx,
      refresh: true,
    };
    try {
      const response = await Api.get("/verifySession", { headers });

      return response;
    } catch (erro) {
      if (erro.response.data.status === 401) {
        const refreshTokenOld = tokenService.pegaRefreshToken(ctx);
        const headers = {
          Authorization: `Bearer ${refreshTokenOld}`,
          refresh: true,
        };

        const response = await Api.get("/refresh", { headers });

        const { accessToken, refreshToken } = response.data.newTokens;

        tokenService.salvaToken(accessToken);
        //tokenService.salvaRefreshToken(refreshToken);
        const retyResponse = await Api.get("/verifySession", {
          headers: { Authorization: `Bearer ${accessToken}`, refresh: true },
        });
        return retyResponse;
      }
    }
  },
};
