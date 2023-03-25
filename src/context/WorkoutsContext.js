import { createContext, useReducer } from "react";
import React from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_WORKOUT":
            return {
                workouts: [...state.workouts, action.payload]
            };
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            };
        case "REMOVE_WORKOUT":
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}