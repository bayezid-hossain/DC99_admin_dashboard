import clone from 'clone';
import actions from './actions';

const initState = {
  loadingInitData: true,
  view: 'gridView',
  viewTopbarCart: false,
  productQuantity: [],
  products: [],
  categories: [],
};
export default (state = initState, action) => {
  switch (action.type) {
    case actions.INIT_DATA:
      return {
        ...state,
        loadingInitData: false,
        productQuantity: action.payload.total,
        products: action.payload.data,
      };
    case actions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.product._id]: action.payload.product,
        },
      };
    case actions.DELETE_PRODUCT_SUCCESS:
      // Remove the deleted product from the state
      const updatedProducts = clone(state.products);
      delete updatedProducts[action.payload.productId];

      return {
        ...state,
        products: updatedProducts,
      };
    case actions.DELETE_PRODUCT_FAILURE:
      // Handle error case if needed
      return state;
    // Existing cases

    case actions.DELETE_CATEGORY_SUCCESS:
      // Remove the deleted product from the state
      const updatedCategories = clone(state.categories);
      delete updatedCategories[action.payload.categoryId];

      return {
        ...state,
        categories: updatedCategories,
      };
    case actions.DELETE_CATEGORY_FAILURE:
      // Handle error case if needed
      return state;
    // Existing cases

    case actions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload.category],
      };
    case actions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      };

    default:
      return state;
  }
};
