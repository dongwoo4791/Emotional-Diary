import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import React from 'react';
import styled from 'styled-components';

const OurDiaryStyle = styled.div`
  display: grid;
  max-width: 100%;
  align-content: baseline;
  grid-template-columns: 100%;
  padding: 10px 10px;
`;
const OurDiary = () => {
  let eventGuid = 0;

  function INITIAL_EVENTS() {
    //최초 데이터 불러오는것
  }

  function renderEventContent() {
    //잘모름
  }

  function handleEventClick() {
    //클릭했을때 동작
  }

  function handleEvents() {
    //
  }
  function createEventId() {
    return String(eventGuid++);
  }
  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }
  return (
    <OurDiaryStyle>
      <h1>교환 다이어리!</h1>
      <br />
      {/*       <MyCalendar /> */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, bootstrapPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        themeSystem="bootstrap"
        contentHeight="auto"
        handleWindowResize={true}
        locale="ko"
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        //initialEvents={boards} // alternatively, use the `events` setting to fetch from a feed
        //vents={boards}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
                   eventAdd={function(){}}
                   eventChange={function(){}}
                   eventRemove={function(){}}
                   */
      />
    </OurDiaryStyle>
  );
};

export default OurDiary;
