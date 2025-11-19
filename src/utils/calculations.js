// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get logs for today
export const getTodayLogs = (logs) => {
  const today = getTodayDate();
  return logs.filter(log => log.date === today);
};

// Get logs for this week
export const getWeekLogs = (logs) => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    return logDate >= weekAgo && logDate <= today;
  });
};

// Get logs for this month
export const getMonthLogs = (logs) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    return logDate.getMonth() === month && logDate.getFullYear() === year;
  });
};

// Calculate money spent
export const calculateMoneySpent = (logs, pricePerCigarette) => {
  const total = logs.length * pricePerCigarette;
  return total.toFixed(2);
};

// Calculate daily average
export const calculateDailyAverage = (logs) => {
  if (logs.length === 0) return 0;
  
  // Group logs by date
  const logsByDate = {};
  logs.forEach(log => {
    if (!logsByDate[log.date]) {
      logsByDate[log.date] = 0;
    }
    logsByDate[log.date]++;
  });
  
  const days = Object.keys(logsByDate).length;
  const total = logs.length;
  
  return (total / days).toFixed(1);
};

// Format timestamp to readable time
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
};

// Format date to readable format
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};