import Api from './index';
import { endPoints, requestType } from '../constants/api';

// Fetch all notifications for the current user
export async function fetchNotifications() {
  const res = await Api(endPoints.notifications.all, {}, requestType.GET);
  const response = res.data ? res.data : res;
  if (!response.success || !Array.isArray(response.data)) {
    throw new Error("Failed to load notifications.");
  }
  return res.data;
}

// Mark a single notification as read
export async function markNotificationRead(id) {
  // PATCH request to mark a notification as read
  return Api(endPoints.notifications.markRead(id), {}, requestType.PATCH);
}

// Mark all notifications as read
export async function markAllNotificationsRead() {
  // PATCH request to mark all notifications as read
  return Api(endPoints.notifications.markAllRead, {}, requestType.PATCH);
}