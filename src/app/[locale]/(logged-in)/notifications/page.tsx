import React from "react";
import Notifications from "./Notifications";
import { messagesNotifications } from "./components/moskData";

const getMessages = async () => {
  const messagesNotification = messagesNotifications;
  return messagesNotification;
};

const NotificationsPage = async () => {
  const messages = await getMessages();
  return (
    <div className="page-notificacions">
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
