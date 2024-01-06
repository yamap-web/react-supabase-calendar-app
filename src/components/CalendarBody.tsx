import React from 'react';

interface CalendarEvent {
  id: number | null,
  title: string,
  startDateTime: string,
  endDateTime: string
}

interface CalendarBodyProps {
  date: Date,
  events: CalendarEvent[],
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>
}

const CalendarBody = (props: CalendarBodyProps) => {
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();

  const today = new Date(); // 今日の日付オブジェクト
  const thisFirstDayOfWeek = new Date(thisYear, thisMonth, 1).getDay(); // 今月初日の曜日
  const thisLastDay = new Date(thisYear, thisMonth + 1, 0).getDate(); // 今月末日
  const lastDayOfLastMonth = new Date(thisYear, thisMonth, 0).getDate(); // 先月末日
  const rowNumber = Math.ceil((thisFirstDayOfWeek + thisLastDay) / 7); // カレンダーの行数（（今月初日の曜日 + 今月末日） / 7）
  let dayCount = 1;

  return (
    <div className="text-center calendar">
      <DayOfWeekHead />
      { [...Array(rowNumber)].map((_, week) => {
        return (
          <div className="calendar_table-row d-flex" key={week}>
            {[...Array(7)].map((_, day) => {
              if(week === 0 && day < thisFirstDayOfWeek) {
                const num = lastDayOfLastMonth - thisFirstDayOfWeek + day + 1;

                return (
                  <div className="calendar_table-data p-1 is-disabled" key={day}>
                    <span className="calendar_date">{num}</span>

                    <EventBadges events={props.events} year={thisYear} month={thisMonth - 1} date={num} setTargetEvent={props.setTargetEvent} />

                  </div>
                )

              } else if(dayCount > thisLastDay) {
                const num = dayCount - thisLastDay;
                dayCount++;
                return (
                  <div className="calendar_table-data p-1 is-disabled" key={day}>
                    <span className="calendar_date">{num}</span>

                    <EventBadges events={props.events} year={thisYear} month={thisMonth + 1} date={num} setTargetEvent={props.setTargetEvent} />

                  </div>
                )

              } else if(today.getFullYear() === thisYear && today.getMonth()  === thisMonth && today.getDate() === dayCount) {
                const num = dayCount;
                dayCount++;
                return(
                  <div className="calendar_table-data p-1 js_calendar-date" key={day}>
                    <span className="calendar_date bg-primary text-white">{num}</span>

                    <EventBadges events={props.events} year={thisYear} month={thisMonth} date={num} setTargetEvent={props.setTargetEvent} />

                  </div>
                )

              } else {
                const num = dayCount;
                dayCount++;
                return (
                  <div className="calendar_table-data p-1" key={day}>
                    <span className="calendar_date">{num}</span>

                    <EventBadges events={props.events} year={thisYear} month={thisMonth} date={num} setTargetEvent={props.setTargetEvent} />

                  </div>
                )
              }
            })}
          </div>
        )
      })}
    </div>
  )
}

const DayOfWeekHead = () => {
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="calendar_table-head d-flex align-items-center">
      {weeks.map((week, index) => {
        return <div className="calendar_table-data" key={index}>{week}</div>
      })}
    </div>
  )
}

interface EventBadgesProps {
  events: CalendarEvent[],
  year: number,
  month: number,
  date: number,
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>
}

const EventBadges = (props: EventBadgesProps) => {
  const { events, year, month, date, setTargetEvent } = props;

  return (
    <>
      {events.map((event) => {
        const { id, title, startDateTime } = event;
        const eventDate = new Date(startDateTime);
        const eventTime = `${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`;

        if( eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === date) {
          return <span key={id} className="badge calendar_event" onClick={() => setTargetEvent(event)}>{eventTime} {title}</span>;
        } else {
          return
        }
      })}
    </>
  )
}

export default CalendarBody;
