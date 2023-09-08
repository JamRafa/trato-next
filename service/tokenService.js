import nookies from "nookies";
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  salvaToken(tokenDeAcesso, ctx =null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, tokenDeAcesso, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  salvaRefreshToken(refresh_token, ctx = null ){
    nookies.set(ctx, REFRESH_TOKEN_KEY, refresh_token, {
      maxAge: ONE_YEAR,
      sameSite: "lax",
      path: "/"
    })
  },
  pegaToken(ctx = null) {
    const cookies = nookies.get(ctx);
    //console.log(cookies)
    return cookies[ACCESS_TOKEN_KEY] || "";
  },
  pegaRefreshToken(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies.REFRESH_TOKEN_KEY || "";
  },
  deletaToken(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, REFRESH_TOKEN_KEY);
  },
};
