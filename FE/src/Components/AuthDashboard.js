import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup"
import { API_URL } from '../env'
import { generateSchedules } from '../Helpers/getSchedules'
import { isPropsEqual } from "@fullcalendar/react";
import { useUser } from '../Context/UserProvider'

const AuthDashboard = (props) => {
    // displays current chosen courses
  // allows user to add new courses
  // saves course preferences in localStorage so that preferences don't get deleted later on
  const [courses, setCourses] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [changedPreferences, setChanged] = useState(false);
  const { getUser } = useUser();

  useEffect(() => {
    let courseData = JSON.parse(localStorage.getItem("courses"));
    let extracurricularData = JSON.parse(localStorage.getItem("extracurriculars"));
    let startTimeData = localStorage.getItem("startTime");
    let endTimeData = localStorage.getItem("endTime");
    if (courseData != null) {
      setCourses(courseData)
    }
    else setCourses([])
    if (extracurricularData != null) {
      setExtracurriculars(extracurricularData);
    }
    else setExtracurriculars([])
    if (startTimeData != null) {
      setStartTime(startTimeData);
    }
    else setStartTime(null)
    if (endTimeData != null) {
      setEndTime(endTimeData);
    }
    else setEndTime(null);
  }, [changedPreferences])

  const addCourse = (event) => {
    event.preventDefault();
    // given a course, communicates with the server to check if course is valid
    // if valid, display course on dashboard add to courses, and save to localStorage
    const courseName = event.target.elements.add.value.toUpperCase().split(" ");
    const department = courseName[0];
    const courseNumber = parseInt(courseName[1]);
    console.log(department)
    console.log(courseNumber)
    verifyCourse(department, courseNumber, true)
    .then(() => {
      alert("Valid Course!");
      getUser()
      .then(() => {
        setChanged(!changedPreferences)
      })
    })
    .catch(() => {
      alert("Invalid course.");
    });
  };

  const verifyCourse = (department, courseNumber, add) => {
    const url = new URL(API_URL + "courses")
    url.search = new URLSearchParams({department, courseNumber, clear: 0})
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: add ? "GET": "DELETE",
        credentials: 'include'
      }).then(response => response.json())
      .then(response => {
        console.log(response)
          if (Object.keys(response).length === 0 && response.constructor === Object) {
            return reject();
          }
          else {
            return resolve();
          }
      })
      .catch(error => {
        // testing purposes, later change to false
          console.log(error)
          return reject();
      });
    })
  };

  const removeCourse = (event) => {
    event.preventDefault();
    const courseName = event.target.elements.remove.value.toUpperCase().split(" ");
    const department = courseName[0];
    const courseNumber = parseInt(courseName[1]);
    // given a course, removes course from list of courses
    verifyCourse(department, courseNumber, false)
    .then(() => {
      alert("Valid Course!");
      getUser()
      .then(() => {
        setChanged(!changedPreferences)
      })
    }).catch(error => {
      alert("Course does not exist")
    })
  };

  const addExtracurricular = (event) => {
      event.preventDefault();
      const start = event.target.elements.start.value;
      const end = event.target.elements.end.value;
      const extracurricular = [start + " " + end];
      let extracurricularData = JSON.parse(localStorage.getItem("extracurriculars"));
      if (extracurricularData == null) {
        extracurricularData = [ extracurricular ]
      }
      else {
        extracurricularData.push(extracurricular);
      }
      console.log(extracurricularData);
      localStorage.setItem("extracurriculars", JSON.stringify(extracurricularData));
      setChanged(!changedPreferences);
  }

  const addTimes = event => {
    event.preventDefault();
    const start = event.target.elements.start.value;
    const end = event.target.elements.end.value;
    if (start != "") {
      localStorage.setItem("startTime", start);
    }
    if( end != "") {
      localStorage.setItem("endTime", end);
    }
    setChanged(!changedPreferences);
  }

  const generateEvents = () => {
    const prefURL = new URL(API_URL + "pref")
    const generateURL = new URL(API_URL + "generate");
    const extracurriculars = JSON.parse(localStorage.getItem("extracurriculars"))
    let extracurriculum = "";
    if (extracurriculars != null) {
      extracurriculars.forEach(extracurricular => {
        const strFormat = JSON.stringify(extracurricular) + ",";
        extracurriculum += strFormat;
      })
      extracurriculum = extracurriculum.slice(0, -1)
    }
    else {
      extracurriculum = null;
    }
    
    const startTime = localStorage.getItem("startTime");
    const endTime = localStorage.getItem("endTime");
    prefURL.search = new URLSearchParams({startTime, endTime, extraCurriculum: extracurriculum})
    fetch(prefURL, {
      method: 'POST',
      credentials: 'include'
    })
    .then(() => {
      fetch(generateURL, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(schedules => {
        localStorage.setItem("schedules", JSON.stringify(schedules));
        const allEvents = generateSchedules(schedules);
        localStorage.setItem("events", JSON.stringify(allEvents));
        props.history.push('/')

      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  const clearPreferences = () => {
    localStorage.removeItem("extracurriculars");
    localStorage.removeItem("startTime");
    localStorage.removeItem("endTime");
    setChanged(!changedPreferences);
  }

  const clearCourses = () => {
    const url = new URL(API_URL + 'courses');
    url.search = new URLSearchParams({clear: 1});
    fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json())
    .then(response => {
      if (Object.keys(response).length === 0 && response.constructor === Object) {
        console.log("error");
        alert("Error");
      }
      else {
        console.log(response)
        alert("Success!");
        getUser()
        .then(() => {
          setChanged(!changedPreferences);
        })
      }
    })
    .catch(error => {
      console.log(error);
      alert("Error");
    })
  }

  return (
    <div>
      <Button variant="primary" onClick={clearPreferences}>Clear Preferences</Button>
      <Button variant="primary" onClick={clearCourses}>Clear courses</Button>
      <br/>
      <br/>
      <Container>
        <Row>
          <Col>
          <Form onSubmit={addCourse}>
          {" "}
          <Form.Group controlId="add">
          <Form.Label>Add a class:</Form.Label>
          <Form.Control type="text" placeholder="Enter a class e.g. CSCI 201" />
          <Form.Text>Make sure there is a space between department and course number</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
          </Col>
          <Col>
          <Form onSubmit={removeCourse}>
        {" "}
        <Form.Group controlId="remove">
          <Form.Label>Remove a class:</Form.Label>
          <Form.Control type="text" placeholder="Enter a class e.g. CSCI 201" />
          <Form.Text>Make sure there is a space between department and course number</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Remove
        </Button>
      </Form>
          </Col>
        </Row>
        <br/>
        </Container>
          <Form onSubmit={addExtracurricular}>
            <Container fluid>
              <Row>
                <Col>
                <Form.Group controlId="start">
                <Form.Label>Extracurricular start time:</Form.Label>
                <Form.Control type="time" placeholder="00:00"/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="end">
                <Form.Label>Extracurricular end time:</Form.Label>
                <Form.Control type="time" placeholder="00:00"/>
                </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                </Col>
              </Row>
            </Container>
      </Form>
      <br/>
      <Form onSubmit={addTimes}>
        <Container>
          <Row>
            <Col>
            <Form.Group controlId="start">
            <Form.Label>Earliest start time:</Form.Label>
            <Form.Control type="time" placeholder="00:00"/>
          </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="end">
            <Form.Label>Latest end time:</Form.Label>
            <Form.Control type="time" placeholder="00:00"/>
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button variant="primary" type="submit">
            Submit
          </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <br/>
      <Container fluid>
        <Button style={{background: 'red'}} variant="primary" onClick={generateEvents} block>
            GENERATE EVENTS
        </Button>
      </Container>
      <br/>

      <Container fluid>
        <Row>
          <Col>
          <h4>Current Courses </h4>
          <div>
          <ListGroup>
              {courses.map((course) => (
                  <ListGroup.Item>{course.department + course.courseNumber.toString()}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          </Col>
          <Col>
          <div>
            <h4>Extracurriculars </h4>
          <ListGroup>
              {extracurriculars.map(extracurricular => {
                const times = extracurricular[0].split(' ');
              return <ListGroup.Item>Start: {times[0]} <br/> End: {times[1]}</ListGroup.Item>
              })}
            </ListGroup>
          </div>
          </Col>
          <Col>
              <ListGroup>
                {startTime ?  <ListGroup.Item>Start Time: {startTime}</ListGroup.Item> : null}
                {endTime ? <ListGroup.Item>End Time: {endTime}</ListGroup.Item> : null}
              </ListGroup>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default AuthDashboard
