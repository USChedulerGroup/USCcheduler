import { useState, useEffect, useRef } from 'react';
import { debounce } from "lodash";
import axios from 'axios';
import { API_URL } from '../env'
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { generateSchedules } from '../Helpers/getSchedules';
const AddCourseForm = props => {
    const [ query, setQuery ] = useState("");
    const [ options, setOptions ] = useState([]);
    const [ selectedCourses, setSelectedCourses ] = useState([]);
    const attemptQuery = useRef(
        debounce((query, token) => {
            queryCourses(query, token);
        }, 500)
    ).current;

    const queryCourses = (query, cancelToken) => {
        if (!query) {
            setOptions([]);
            return;
        }
        const department = query.match('[^0-9]+')[0].toUpperCase();
        const courseNumber = parseInt(query.match('[0-9]+'));
        console.log(department);
        console.log(courseNumber);
        const url = new URL(API_URL + 'query');
        url.search = new URLSearchParams({ department, courseNumber });
        axios.get(url, {
            cancelToken
        }).then(response => {
            const courses = response.data;
            const courseOptions = courses.map(course => {
                const name = course.department.toUpperCase() + course.courseNumber.toString();
                return {
                    label: name,
                    value: name
                }
            });
            setOptions(courseOptions);
        })
        .catch(error => {
            axios.isCancel(error) || setOptions([]);
        })
    }

    const handleInputChange = input => {
        setQuery(input);
        return input;
    }

    useEffect(() => {
        const { cancel, token } = axios.CancelToken.source();
        attemptQuery(query, token);
        // return () => cancel("Irrelevant request") || attemptQuery.cancel();
        return () => cancel("Irrelevant request");
    }, [ attemptQuery, query ]);

    const handleChange = courses => {
        setSelectedCourses(courses);
    }

    const createSchedules = () => {
        const extracurriculum = null;
        let courses = "";
        if (selectedCourses) {
        selectedCourses.forEach(course => {
            courses += course.value + ',';
        })
        courses = courses.slice(0, -1);
        }
        console.log(courses);
        const startTime = localStorage.getItem("startTime");
        const endTime = localStorage.getItem("endTime");
        const url = new URL(API_URL + 'guest');
        url.search = new URLSearchParams({ courses, extraCurriculum: extracurriculum, startTime, endTime });
        fetch(url, {
        method: 'GET',
        credentials: 'include'
        })
        .then(response => response.json())
        .then(schedules => {
            console.log(schedules)
            localStorage.setItem("schedules", JSON.stringify(schedules));
            const allEvents = generateSchedules(schedules);
            localStorage.setItem("events", JSON.stringify(allEvents));
            console.log('changing to schedules');
            props.history.push('/schedule');
        })
        .catch(error => {
            props.history.push('/schedule')
            console.log(error);
        })
    }

    const styles = {
        container: (provided, state) => ({
            ...provided,
            flex: 1,
            width: '50%',
            float: 'left'
        })
    }


    return (
        <div>
            <Select styles={styles} onChange={handleChange} onInputChange={handleInputChange} options={options} isMulti />
          <p className="text-center">
            <Button style={{float: 'left'}} variant="outline-danger" onClick={createSchedules} >GENERATE SCHEDULES</Button>
          </p>
        </div>
    );
}

export default AddCourseForm;