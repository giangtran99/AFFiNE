import { DateTime } from 'luxon';

const PostTime = ({ timestamp }) => {
  const formatTime = (timestamp: any) => {
    var date = new Date(timestamp * 1000);
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Extract day of the week, hours, and minutes
    var dayOfWeek = daysOfWeek[date.getUTCDay()];
    // Extract hours and minutes
    let hours = date.getHours() as any;
    let minutes = date.getMinutes() as any;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Formatted time string
    return `${dayOfWeek}, ${hours}:${minutes}`;
  };
  return (
    <time
      // {...props}
      className="post__time"
      dateTime={DateTime.fromJSDate(new Date(2024, 0, 27))
        .toLocal()
        .toISO({ includeOffset: false })}
    >
      {formatTime(timestamp)}
    </time>
  );
};

export default PostTime;
