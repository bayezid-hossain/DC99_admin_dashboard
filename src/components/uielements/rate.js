import { Rate } from 'antd';
import Ratings from './styles/rating.style';
import WithDirection from '@iso/library/helpers/rtl';
const AntRating = Ratings(Rate);
const Rating = WithDirection(AntRating);
export default Rating;
