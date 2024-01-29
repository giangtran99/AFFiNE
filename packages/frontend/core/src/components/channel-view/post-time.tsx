import { DateTime } from 'luxon';

const PostTime = () => {
  // const relative = '3 days ago';
  // const date = '2024-01-25';
  const time = '14:30 PM';
  return (
    <time
        // {...props}
        className="post__time"
        dateTime={DateTime.fromJSDate(new Date(2024, 0, 27))
          .toLocal()
          .toISO({ includeOffset: false })}
      >
        {time}
      </time>
  );
};

export default PostTime;
