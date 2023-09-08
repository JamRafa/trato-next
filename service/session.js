import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "./authService";

export function withSession(funcao) {
  return async (ctx) => {

    try {
      const session = await authService.verificaSessao(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return funcao(modifiedCtx);
    } catch(err) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401',
        }
      }
    }
  }
}

export function useSession() {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .verificaSessao()
      .then((resp) => setSession(resp.data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    session,
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();

    if (!session.loading && session.error) {
      router.push("/login/login/?error=401");
    }

    const modifiedProps = {
      ...props,
      session: session.session,
    };

    return <Component {...modifiedProps} />;
  };
}
