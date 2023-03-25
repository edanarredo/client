import React from "react";
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, weight, reps };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout)
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            dispatch({type: 'ADD_WORKOUT', payload: json.result});
            console.log(`New workout added. ${title} ${weight} ${reps}`);
            setError(null);
            setTitle('');
            setWeight('');
            setReps('');

        }
    };

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input  
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}>
            </input>

            <label>Weight (in lbs):</label>
            <input  
                type="text"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}>
            </input>

            <label>Reps:</label>
            <input  
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}>
            </input>

            <button>Add Workout</button>
            {error && <div classtitle="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;