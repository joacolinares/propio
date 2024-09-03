export interface MessagesNotifications {
    id: number;
    msg: string;
    isRead: boolean;
    date: Date;
    time: string;
  }
  
  export const messagesNotifications: any[] = Array(0)
    .fill(null)
    .map((_, index) => {
      const today = new Date();
      const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24); // Yesterday's date
  
      // Assign date based on index range
      const date = index < 10 // Today's messages (first 10)
        ? today
        : index < 20 // Yesterday's messages (next 10)
          ? yesterday
          : new Date(2024, 3, Math.floor(Math.random() * 30) + 1); // Random older date
  
      // Generate random time for each message
      const hours = Math.floor(Math.random() * 24); // Random hour between 0 and 23
      const minutes = Math.floor(Math.random() * 60); // Random minute between 0 and 59
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; // Formatted time string
  
      return {
        id: index + 1,
        msg: `You just staked $100.00 succesfully (message ${index + 1})`,
        isRead: index % 2 === 0,
        date,
        time,
      };
    });
  