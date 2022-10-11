export default {
  // namespace: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  mutations: {
    addProductToCart(state, data) {
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === data.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: data.id,
          title: data.title,
          image: data.image,
          price: data.price,
          qty: 1,
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += data.price;
    },

    removeProductFromCart(state, prodId) {
      const productInCartIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    },
  },

  actions: {
    addToCart(context, data) {
      context.commit('addProductToCart', data);
    },

    removeFromCart(context, prodId) {
      context.commit('removeProductFromCart', prodId);
    },
  },

  getters: {
    total(state) {
      return state.total;
    },

    items(state) {
      return state.items;
    },

    qty(state) {
      return state.qty;
    },
  },
};
