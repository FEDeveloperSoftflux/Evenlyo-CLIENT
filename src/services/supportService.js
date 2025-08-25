import Api from './index';
import { endPoints, requestType } from '../constants/api';

export const createTicket = (data) => {
  return Api(endPoints.support.createTicket, { data }, requestType.POST);
};