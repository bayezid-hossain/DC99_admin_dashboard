import { all, takeEvery, takeLatest, put } from 'redux-saga/effects';
import actions from './actions';
import { toast } from 'react-toastify';
export function* changedCard() {
  yield takeEvery(actions.CHANGE_CARDS, function* () {});
}
export function* initData() {
  try {
    const response = yield fetch('http://localhost:4000/api/v1/products');
    const data = yield response.json();
    console.log(data);
    yield put(actions.fetchCategories());
    yield put({
      type: actions.INIT_DATA,
      payload: data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export function* createProduct(action) {
  try {
    const { payload } = action;
    const { productData, navigate } = payload;
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', '0');
    formData.append('description', productData.description);
    const categoryIds = productData.categories.map((category) => category);
    formData.append('category', JSON.stringify({ ids: categoryIds }));
    console.log(productData.categories);
    // Append each image file to the FormData object
    productData.images.forEach((image, index) => {
      formData.append('images', image);
    });
    console.log(formData);
    console.log(productData);

    // Make the createProduct API call with the formData
    const response = yield fetch(
      'http://localhost:4000/api/v1/admin/products/new',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );

    if (response.ok) {
      // Product successfully created
      const data = yield response.json();

      // Dispatch the create product success action
      yield put({
        type: actions.CREATE_PRODUCT_SUCCESS,
        payload: {
          product: data.product,
        },
      });

      // Navigate to the dashboard/products page
      navigate.replace('/dashboard/');
    } else {
      // Handle error response
      yield put({
        type: actions.CREATE_PRODUCT_FAILURE,
        payload: {
          error: response.statusText,
        },
      });
    }
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.CREATE_PRODUCT_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}

export function* deleteProduct(action) {
  try {
    // Make the deleteProduct API call with the specified product ID
    const response = yield fetch(
      `http://localhost:4000/api/v1/admin/products/${action.payload.productId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      // Product successfully deleted
      yield put({
        type: actions.DELETE_PRODUCT_SUCCESS,
        payload: {
          productId: action.payload.productId,
        },
      });
    } else {
      // Handle error response
      yield put({
        type: actions.DELETE_PRODUCT_FAILURE,
        payload: {
          error: response.statusText,
        },
      });
    }
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.DELETE_PRODUCT_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
export function* deleteCategory(action) {
  try {
    // Make the deleteProduct API call with the specified product ID
    const response = yield fetch(
      `http://localhost:4000/api/v1/admin/categories/${action.payload.categoryId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      // Product successfully deleted
      yield put({
        type: actions.DELETE_CATEGORY_SUCCESS,
        payload: {
          productId: action.payload.productId,
        },
      });
    } else {
      // Handle error response
      yield put({
        type: actions.DELETE_CATEGORY_FAILURE,
        payload: {
          error: response.statusText,
        },
      });
    }
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.DELETE_CATEGORY_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
export function* createCategory(action) {
  try {
    const { payload } = action;
    const { categoryData, navigate } = payload;
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('price', '0');
    formData.append('description', categoryData.description);
    // Append each image file to the FormData object
    formData.append('image', categoryData.image);

    // Make the createCategory API call with the formData
    const response = yield fetch(
      'http://localhost:4000/api/v1/admin/categories/new',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );

    if (response.ok) {
      // Product successfully created
      const data = yield response.json();

      // Dispatch the create CATEGORY success action
      yield put({
        type: actions.CREATE_CATEGORY_SUCCESS,
        payload: {
          category: data.category,
        },
      });

      // Navigate to the dashboard/categories page
      navigate.replace('/dashboard/categories');
    } else {
      // Handle error response
      yield put({
        type: actions.CREATE_CATEGORY_FAILURE,
        payload: {
          error: response.statusText,
        },
      });
    }
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.CREATE_CATEGORY_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}

export function* updateCategories(action) {
  try {
    const { payload } = action;
    const { categoryData, navigate } = payload;
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('price', '0');
    formData.append('description', categoryData.description);
    // Append each image file to the FormData object
    formData.append('image', categoryData.image);

    // Make the createCategory API call with the formData
    const response = yield fetch(
      `http://localhost:4000/api/v1/admin/categories/${categoryData.id}`,
      {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }
    );

    if (response.ok) {
      // Product successfully created
      const data = yield response.json();

      // Dispatch the create CATEGORY success action
      yield put({
        type: actions.UPDATE_CATEGORIES_SUCCESS,
        payload: {
          category: data.category,
        },
      });

      // Navigate to the dashboard/categories page
      //navigate.replace('/dashboard/categories');
      navigate(`/dashboard/categories/`);
    } else {
      // Handle error response
      yield put({
        type: actions.UPDATE_CATEGORIES_FAILURE,
        payload: {
          error: response.statusText,
        },
      });
    }
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.UPDATE_CATEGORIES_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}

export function* fetchCategories() {
  try {
    // Make the API call to fetch the categories
    const response = yield fetch('http://localhost:4000/api/v1/categories');
    const data = yield response.json();
    console.log(data);
    // Dispatch the success action with the fetched categories
    yield put({
      type: actions.FETCH_CATEGORIES_SUCCESS,
      payload: {
        categories: data.data,
      },
    });
  } catch (error) {
    // Handle network or other errors
    yield put({
      type: actions.FETCH_CATEGORIES_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}

function* handleUpdateCategorySuccess(action) {
  const { category } = action.payload;

  // Show the success toast notification
  toast.success('Category updated successfully');

  // Perform other logic if needed
  // ...
}

function* handleUpdateCategoryFailure(action) {
  const { error } = action.payload;
  toast.error(error);
}
export default function* Saga() {
  yield all([
    takeEvery(actions.INIT_DATA_SAGA, initData),
    takeEvery(actions.DELETE_PRODUCT, deleteProduct),
    takeEvery(actions.CREATE_PRODUCT, createProduct),
    takeEvery(actions.CREATE_CATEGORY, createCategory),
    takeEvery(actions.FETCH_CATEGORIES, fetchCategories),
    takeEvery(actions.DELETE_CATEGORY, deleteCategory),
    takeEvery(actions.UPDATE_CATEGORIES, updateCategories),
    takeLatest(actions.UPDATE_CATEGORIES_SUCCESS, handleUpdateCategorySuccess),
    takeLatest(actions.UPDATE_CATEGORIES_FAILURE, handleUpdateCategoryFailure),
  ]);
}
