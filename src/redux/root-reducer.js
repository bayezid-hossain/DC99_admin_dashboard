import { combineReducers } from 'redux';
import Auth from '../authentication/reducer';
import App from '@iso/redux/app/reducer';
import Ecommerce from '@iso/redux/ecommerce/reducer';

export default combineReducers({
  Auth,
  App,
  Ecommerce,
});
