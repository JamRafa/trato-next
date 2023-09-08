import { useSession } from "../service/session";

export const isLogin = {
  islogged() {
    const session = useSession();

    let login = {};

    !session.loading && session.error
      ? (login = {
          idAuth: 0,
          nome: "login",
        })
      : (login = {
          idAuth: session?.session?.user?.userId,
          nome: session?.session?.user?.username,
        });

    return login;
  },
};
