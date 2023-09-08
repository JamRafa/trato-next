import { useRouter } from "next/router";
import Footer from "../Components/Footer";
import NavBar from "../Components/navBar";
import styles from "./PaginaPadrao.module.scss";
import { Provider } from "react-redux";
import store from "../store";
import './index.css'

export default function App({ Component, pageProps }) {
  const route = useRouter();

  const returnNav = () => {
    if (route.pathname === "/login/login") {
      return null;
    } else {
      return <NavBar />;
    }
  };
  return (
    <Provider store={store}>
      <div className={styles.container}>
        {returnNav()}
        <div className={styles["container-outlet"]}>
          <Component {...pageProps}></Component>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
