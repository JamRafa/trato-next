import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "../../service/session";
import styles from "./perfil.module.scss";
import { isLogin } from "../../utils/isLogin";

export default function Perfil() {
  const router = useRouter();
  
  const {nome} = isLogin.islogged()

  return (
    <div className={styles.login} onClick={() => router.push("/login/login")}>
      {nome?.slice(0, 7)}
    </div>
  );
}
