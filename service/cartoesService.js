import Api from "../api/api";
import { tokenService } from "./tokenService";

export const cartoesService = {
  async userCards(ctx =null) {
    const token = tokenService.pegaToken(ctx);
    return await Api.get("/getCartoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
