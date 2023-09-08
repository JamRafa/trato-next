import { configureStore } from "@reduxjs/toolkit";
import carrinho from "./reducers/carrinho";
import busca from "./reducers/busca";
import authUser from "./reducers/authUser";

const store = configureStore({
  reducer: {
    busca: busca,
    carrinho: carrinho,
    perfil: authUser,
  },
});

export default store;
