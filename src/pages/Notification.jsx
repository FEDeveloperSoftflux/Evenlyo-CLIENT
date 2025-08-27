import React, { useEffect } from "react";
import ResponsiveHeader from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadNotifications,
  markNotificationAsRead,
  selectNotifications,
  selectLoading,
  selectError,
} from "../store/slices/notificationSlice";




// const notifications = [
//   { id: 1, text: 'Your booking BR001236 has been confirmed .' },
//   { id: 2, text: 'New message from DJ Mike.' },
//   { id: 3, text: 'Your invoice is ready to download.' },
//   { id: 4, text: 'Event reminder: Wedding on 25th June.' },
// ];

function Notification() {
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) dispatch(markNotificationAsRead(notif._id));
    if (notif.booking) {
      navigate(`/bookings/${notif.bookingId}`);
    } else {
      navigate("/notifications");
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <main className="min-h-[60vh] flex flex-col items-center justify-start py-10 px-4 bg-gray-50">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Track your bookings, messages, and reminders here.</p>
        </div>

        <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading notifications...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error loading notifications: {error
            }</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500 text-center">You have no new notifications.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <li
                  key={notif._id}
                  className="py-4 flex items-start cursor-pointer hover:bg-gray-50 rounded-xl transition"
                  onClick={() => handleNotificationClick(notif)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter') handleNotificationClick(notif); }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <img src="/assets/Success.svg" alt="Notification" className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-gray-800 text-base">{notif.message}</div>
                  {!notif.isRead && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-primary-600 inline-block" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Notification; 