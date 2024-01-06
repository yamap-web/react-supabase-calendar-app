import React, { useState, useEffect } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

interface CalendarEvent {
  id: number | null,
  title: string,
  startDateTime: string,
  endDateTime: string
}

interface EventModalProps {
  modalFlg: boolean,
  onModalClose: () => void,
  addEvent: (title: string, startDateTime: string, endDateTime: string) => void,
  targetEvent: CalendarEvent,
  deleteEvent: (id: number | null) => void,
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>
  editEvent: (id: number | null, title: string, startDateTime: string, endDateTime: string) => void,
}

const EventModal = (props: EventModalProps) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayFormat = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;
  const initData = {
    title: "",
    date: todayFormat,
    startTime: "00:00",
    endTime: "00:00"
  }
  const [form, setForm] = useState(initData);

  useEffect(() => {
    const { id, title, startDateTime, endDateTime } = props.targetEvent;

    if(id !== null) {
      const targetStartDate = new Date(startDateTime);
      const targetEndDate = new Date(endDateTime);

      // 開始日付
      const targetStartYear = targetStartDate.getFullYear();
      const targetStartMonth = targetStartDate.getMonth();
      const targetStartDay = targetStartDate.getDate();
      const targetStartHours = targetStartDate.getHours();
      const targetStartMinutes = targetStartDate.getMinutes();
      const targetDateFormat = `${targetStartYear}-${String(targetStartMonth + 1).padStart(2, '0')}-${String(targetStartDay).padStart(2, '0')}`;
      const targetStartTime = `${String(targetStartHours).padStart(2, '0')}:${String(targetStartMinutes).padStart(2, '0')}`;

      // 終了日付
      const targetEndHours = targetEndDate.getHours();
      const targetEndMinutes = targetEndDate.getMinutes();
      const targetEndTime = `${String(targetEndHours).padStart(2, '0')}:${String(targetEndMinutes).padStart(2, '0')}`;

      setForm({
        title: title,
        date: targetDateFormat,
        startTime: targetStartTime,
        endTime: targetEndTime
      })
    } else {
      setForm(initData);
    }
  }, [props.targetEvent])

  const addScheduleOption = () => {
    const options = [];
    let num = 1;

    for (let hour = 0; hour <= 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        if(minute % 15 == 0) {
          const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          options.push(
            <option key={num} value={time}>{time}</option>
          )
          num++;
        }
      }
    }
    return options;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>): void => {
    const { value, name } = e.target;
    setForm({
      ...form, [name]: value
    });
  }

  const handleClose = () => {
    props.onModalClose();
    setForm(initData);
    props.setTargetEvent({
      id: null,
      title: "",
      startDateTime: "",
      endDateTime: ""
    })
  }

  const handleSubmit = () => {
    const {title, date, startTime, endTime } = form;
    const startDateTime = `${date} ${startTime}`;
    const endDateTime =  `${date} ${endTime}`;

    if(title === "") {
      return alert('予定タイトルを入力してください');
    } else if(startTime >= endTime) {
      return alert('終了時間を開始時間より前に設定してください');
    }

    if(props.targetEvent.id === null) {
      props.addEvent(title, startDateTime, endDateTime);
    } else {
      props.editEvent(props.targetEvent.id, title, startDateTime, endDateTime);
    }

    handleClose();
  }

  const handleDelete = () => {
    props.deleteEvent(props.targetEvent.id);
    handleClose();
  }

  return (
    <Modal show={props.modalFlg} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          <h5>{props.targetEvent.id === null ? "予定の追加" : "予定の編集・削除"}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control type="text" className="fs-5" placeholder="予定タイトル" autoComplete="off" name="title" defaultValue={form.title} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mt-3">
          <InputGroup>
            <Form.Control type="date" name="date" defaultValue={form.date} onChange={handleInputChange} />
            <Form.Select name="startTime" defaultValue={form.startTime} onChange={handleInputChange}>
              {addScheduleOption()}
            </Form.Select>
            <span className="p-1">–</span>
            <Form.Select name="endTime" defaultValue={form.endTime} onChange={handleInputChange}>
              {addScheduleOption()}
            </Form.Select>
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {props.targetEvent.id === null
            ? (
                <>
                  <Button variant="secondary" onClick={handleClose}>取り消し</Button>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>追加</Button>
                </>
              )
            : (
                <>
                  <Button variant="danger" onClick={handleDelete}>削除</Button>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>編集</Button>
                </>
              )
          }
      </Modal.Footer>
    </Modal>
  )
}

export default EventModal;
