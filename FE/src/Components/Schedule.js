import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { generateSchedules } from '../Helpers/getSchedules';
import { API_URL } from '../env';
import { useAuth } from '../Context/AuthProvider'

const Schedule = () => {
    const [ schedules, setSchedules ] = useState([])
    const [scheduleIndex, setIndex] = useState(0)
    const { auth } = useAuth();
    const handleRightClick = () => {
        if(scheduleIndex < schedules.length - 1) {
            setIndex(scheduleIndex + 1)
        }
        else {
            setIndex(0)
        }
    }
    const handleLeftClick = () => {
        if(scheduleIndex > 0) {
            setIndex(scheduleIndex - 1)
        }
        else {
            setIndex(schedules.length - 1)
        }
    }

    const handleGetSavedSchedule = () => {
        if (!auth) {
            alert("You must be logged in to get your schedule!");
        }
        else {
            const url = new URL(API_URL + 'saveschedule');
            fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const events = generateSchedules([response], false);
                localStorage.setItem("events", JSON.stringify(events))
                localStorage.setItem("schedules", JSON.stringify([response]))
                setSchedules(events)
                setIndex(0)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const handleSelectFavoriteSchedule = () => {
        if (!auth) {
            alert("Must be logged in to save a schedule!");
        }
        else {
            const schedules = JSON.parse(localStorage.getItem("schedules"));
            if (schedules != null ) {
                console.log("SENDING SCHEDULES");
                let id = "";
                console.log(schedules)
                schedules[scheduleIndex].forEach(section => {
                    id += section.sectionId.toString() + ',';
                })
                if (id.charAt(id.length - 1) === ',') {
                    id = id.slice(0, id.length-1);
                }
                const url = new URL(API_URL + 'saveschedule');
                url.search = new URLSearchParams({ id })
                fetch(url, {
                    method: 'POST',
                    credentials: 'include'
                })
                .then(() => {
                    alert("Success!");
                })
                .catch(error => {
                    console.log(error);
                    alert("Error saving schedule");
                })
            }
        } 
    }

    const handleClearSchedule = () => {
        localStorage.removeItem("schedules");
        localStorage.removeItem("events");
        setSchedules([]);
    }

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem("events"));
        if (events != null) {
            setSchedules(events);
        }
        else {
            setSchedules([]);
        }
    }, [])
    

    return (
        <div>
            <FullCalendar
                schedulerLicenseKey={'CC-Attribution-NonCommercial-NoDerivatives'}
                plugins={[ timeGridPlugin ]}
                initialView={'timeGridWeek'}
                initialDate={'2020-12-07'}
                hiddenDays={[0, 6]}
                dayHeaderFormat={{weekday: 'long'}}
                events={schedules[scheduleIndex]}
                allDaySlot={false}
                slotMinTime={'07:00:00'}
                slotMaxTime={'22:00:00'}
                customButtons={{
                    right: {
                        text: 'Next Schedule',
                        click: handleRightClick
                    },
                    left: {
                        text: 'Prev Schedule',
                        click: handleLeftClick
                    },
                    select: {
                        text: 'Save this schedule',
                        click: handleSelectFavoriteSchedule
                    },
                    getSaved: {
                        text: 'Get saved schedule',
                        click: handleGetSavedSchedule
                    },
                    clear: {
                        text: 'Clear Schedules',
                        click: handleClearSchedule
                    }
                }}
                headerToolbar = {{
                    left: 'select clear',
                    right: 'getSaved',
                    title: 'title',
                    center: 'left right'
                }}
            />
        </div>
    );
}

export default Schedule;