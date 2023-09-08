import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    salvarCarrinho: (state, { payload }) => {
      state.push(payload);
    },
    deletaCarrinho: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    mudarQuantidade: (state, { payload }) => {
        state.map(itemNocarrinho => {
          if (itemNocarrinho.id === payload.id) itemNocarrinho.quantidade += payload.quantidade
          return itemNocarrinho
        })
      },
      restarCarrinho: () => initialState,
  },
});

export const { salvarCarrinho, deletaCarrinho, mudarQuantidade, restarCarrinho } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
