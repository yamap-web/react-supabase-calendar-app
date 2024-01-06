import React, { useState, useEffect } from 'react';

import './css/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/style.css';

import CalendarHeader from './components/CalendarHeader';
import CalendarBody from './components/CalendarBody';
import EventModal from './components/EventModal';

const API_URL = 'http://localhost:3000/events/';

interface CalendarEvent {
  id: number | null,
  title: string,
  startDateTime: string,
  endDateTime: string
}

const App = () => {
  const [date, setDate] = useState(new Date());
  const [modalFlg, setModalFlg] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [targetEvent, setTargetEvent] = useState<CalendarEvent>({
    id: null,
    title: "",
    startDateTime: "",
    endDateTime: ""
  });

	const onModalOpen = () => setModalFlg(true);
	const onModalClose = () => setModalFlg(false);

  // 初回レンダー用フラグ
  let isFirst = false;

  useEffect(() => {
    fetchEvent();
    isFirst = true;
  }, [])

	useEffect(() => {
    if(!isFirst && targetEvent.id !== null) {
      setModalFlg(true);
    }
  }, [targetEvent])

  const fetchEvent = () => {
    fetch(API_URL).then(
      (responseData) => {
        return responseData.json();
    }).then(
      (result) => {
        setEvents(result);
    });
  }

  const addEvent = (title: string, startDateTime: string, endDateTime: string) => {
    const addData = { title, startDateTime, endDateTime };
    fetch(API_URL, {
      body: JSON.stringify(addData),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(fetchEvent);
  }

  const deleteEvent = (id: number | null) => {
    const targetUrl = API_URL + id;
    fetch(targetUrl, {
      method: 'DELETE'
    }).then(fetchEvent);
  }

  const editEvent = (id: number | null, title: string, startDateTime: string, endDateTime: string) => {
    const targetUrl = API_URL + id;
    const editData = {id, title, startDateTime, endDateTime};
    fetch(targetUrl, {
      body: JSON.stringify(editData),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(fetchEvent);
  }

  return (
    <>
      <CalendarHeader date={date} setDate={setDate} onModalOpen={onModalOpen} />
      <CalendarBody date={date} events={events} setTargetEvent={setTargetEvent} />
      <EventModal modalFlg={modalFlg} onModalClose={onModalClose} addEvent={addEvent} deleteEvent={deleteEvent} targetEvent={targetEvent} setTargetEvent={setTargetEvent} editEvent={editEvent} />
    </>
  )
}

export default App;
