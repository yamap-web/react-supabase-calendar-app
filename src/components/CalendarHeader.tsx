import React from 'react';
import { Container, Button } from 'react-bootstrap';

interface CalendarHeaderProps {
  date: Date,
  onModalOpen: () => void,
  setDate: React.Dispatch<React.SetStateAction<Date>>,
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();

  const handleChangeCalendar = (pager: string) => {
    if(pager === 'prev') {
      props.setDate(new Date(thisYear, thisMonth - 1));
    } else if(pager === 'next') {
      props.setDate(new Date(thisYear, thisMonth + 1));
    }
  }

  return (
    <header className="l_header py-3 ms-0">
      <Container fluid className='d-flex justify-content-between'>
        <div className="d-flex align-items-center">
          <Button variant="link" className="btn me-3 text-white" onClick={() => handleChangeCalendar('prev')}>
            <i className="bi bi-chevron-left" />
          </Button>
          <h1 className="l_header-title mb-0 fs-2 fw-bold text-white text-center" id="js_calendar-header">{thisYear}年{thisMonth + 1}月</h1>
          <Button variant="link" className="btn ms-3 text-white" onClick={() => handleChangeCalendar('next')}>
            <i className="bi bi-chevron-right" />
          </Button>
        </div>
        <div>
          <Button variant="link" className="btn btn-lg text-white" onClick={props.onModalOpen}>
            <i className="bi bi-calendar-plus" style={{fontSize: '2rem'}} />
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default CalendarHeader;
