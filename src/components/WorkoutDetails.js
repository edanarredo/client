import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok) {
            console.log(json.result);
            dispatch({type: 'REMOVE_WORKOUT', payload: json.result});
        }
    };
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    );
};

export default WorkoutDetails;