import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
    name: "workouts",
    initialState: {
        detailsWorkouts:[],
        workouts: [],
        currentWorkout: {
            currentPage: 0,
            name: '',
            pictures: [],
            location: {},
            directions:'',
            date_workout: '',
            date_workout_format: '',
            workouts: [],
            start_time: '',
            end_time: '',
            description:'',
            main_language: [],
            secondary_language: [],
            cost: 0,
            instructions: [],
            participants: 0,
        },
        editWorkout: {
            name:'',
            workout_id:'',
            currentPage:0,
            newpictures:[],
            pictures:[],
            location: {},
            directions:'',
            start_time:'',
            end_time:'',
            instructions: [],
            participants: 0,
            description:'',
            cost:0,
            main_language: [],
            secondary_language: [],
        },
        finishedCurrentWorkout: false,
        disabledDots: false, // disable dots when saving workout
        saving: false,
        error: null,
    },
    reducers: {
        updateDetailsWorkouts: (state, action) => {
            state.detailsWorkouts = action.payload
        },
        addWorkout: (state, action) => {
            state.currentWorkout = action.payload;
        },
        getWorkouts: (state, action) => {
            state.workouts = action.payload;
        },
        updateCurrentWorkout: (state, action) => {
            state.currentWorkout = {...state.currentWorkout, ...action.payload};
        },
        editCurrentWorkout: (state, action) => {
            state.editWorkout = {...state.editWorkout, ...action.payload};
        },
        finishCurrentWorkout: (state, action) => {
            state.finishedCurrentWorkout = action.payload;
        },
        disabledDotsSave: (state, action) => {
            state.disabledDots = action.payload;
        },
        savingCurrentWorkout: (state, action) => {
            state.saving = action.payload;
        },
        discardCurrentWorkout: (state, action) => {
            state.currentWorkout = {
                currentPage: 0,
                name: '',
                pictures: [],
                location: {},
                directions:'',
                date_workout: '',
                date_workout_format: '',
                workouts: [],
                start_time: '',
                end_time: '',
                description:'',
                main_language: [],
                secondary_language: [],
                cost: 0,
                instructions: [],
                participants: 0,
            },
            state.saving = false,
            state.finishedCurrentWorkout = false
        }
    }
});

export const { 
    addWorkout, 
    getWorkouts, 
    updateCurrentWorkout,
    editCurrentWorkout,
    updateDetailsWorkouts,
    finishCurrentWorkout, 
    disabledDotsSave, 
    savingCurrentWorkout, 
    discardCurrentWorkout 
} = workoutsSlice.actions;

export const currentWorkout = (state) => state.workouts.currentWorkout
export const editWorkout = (state) => state.workouts.editWorkout
export const totalWorkouts = (state) => state.workouts.workouts
export const finishedCurrentWorkout = (state) => state.workouts.finishedCurrentWorkout
export const disabledDots = (state) => state.workouts.disabledDots
export const savingWorkout = (state) => state.workouts.saving

export default workoutsSlice.reducer;