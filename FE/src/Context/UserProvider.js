import React, {useState, createContext, useContext, useEffect} from 'react';
import { API_URL } from '../env'
const UserContext = createContext();
const UserProvider = (props) => {
    const [userProfile, setUser ] = useState({
        firstName: null,
        lastName: null,
        favoriteSchedule: null
    });
    const [ courses, setCourses ] = useState([])
    const [ preferences, setPreferences ] = useState({
        startTime: null,
        endTime: null,
        extracurriculars: []
    })

    useEffect(() => {
        // this function is called everytime the browser is refreshed
        getUser();
    });

    const getUser = async () => {
        // gets the user information from the server database
        // must be logged on in order to communicate with database
        await fetch(API_URL + "users", {
            method: "GET",
        }).then(response => response.json())
        .then(data => {
            // calls setUser, setCourses, and setPreferences
            // waiting on response format from backend
        })
        .catch(error => {
            console.log(error)
        });
    }

    // All components that nested under this component will have access to these elements, and will be able to call these functions
    return <UserContext.Provider value={{userProfile, courses, preferences, getUser}} {...props}/>;
}

// useAuth returns an object containing the elements in the provider
const useUser = () => useContext(UserContext);
export { UserProvider, useUser };

// to use this provider, a component must import useAuth and call it as a function for it to return an object