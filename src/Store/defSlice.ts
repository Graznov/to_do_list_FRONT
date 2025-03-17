import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Task {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    category: string,
    color: string,
    isCompleted: boolean,

}
export interface Note {
    id: string,
    title: string,
    description: string,
    addDate: string,
    lastRedactDate: string,
    color: string,
    deg:number
}
export interface TaskState{
    // noteWindRedactVisible: any
    tasks:Task[],
    notes:Note[],
    name:string,
    email:string,
    creatDat:string,
    // token:string,
    accessToken:string|undefined
    id:string,
    pathImg:string,
    redactedNote: undefined | Note
}


const initialState:TaskState = {
    tasks:[],
    notes:[],
    name: "",
    email: "",
    creatDat: "",
    accessToken: undefined,
    id:"",
    pathImg:'',
    redactedNote: undefined,
}

const defSlice = createSlice({
    name: 'defSlice',
    initialState,
    reducers:{

        resetState(state) {
            state.tasks=initialState.tasks
            state.name=initialState.name
            state.email=initialState.email
            state.creatDat=initialState.creatDat
            state.accessToken=initialState.accessToken
            state.id=initialState.id
        },

        setName (state, action){
            state.name = action.payload
        },

        setEmail (state, action){
            state.email = action.payload
        },
        setCreatDat (state, action){
            state.creatDat = action.payload
        },
        // setToken (state, action){
        //     state.token = action.payload
        // },
        setAccessToken (state, action){
            state.accessToken = action.payload
        },

        setTasks (state, action){
            state.tasks = action.payload
        },

        setId (state, action){
            state.id = action.payload
        },

        // addTaskState (state, action){
        //
        // },

        addTask (state, {payload}:PayloadAction<Task>)  {
            // console.log(payload)
            state.tasks.push(payload)
        },

        checkTask (state, action){
            // console.log(`CHEKED tasks "${action.payload}"`)
            state.tasks.forEach(e => {
                if (e.id === action.payload) e.isCompleted = !e.isCompleted;
            })
        },
        defChangeTask (state, action){
            // console.log(`defChangeTask: ${action.payload}`)
            // console.log(action.payload)
            state.tasks.forEach((e,i)=>{
                if(e.id === action.payload.id) {
                    state.tasks.splice(i,1,action.payload)
                    return
                }
            })
        },
        defDelitTask(state, action){
            // state.tasks.forEach((e,i)=>{
            //     if(e.id === action.payload) {
            //         state.tasks.splice(i,1)
            //         return
            //     }
            // })

            state.tasks = state.tasks.filter(a=> a.id !== action.payload)
            console.log(state.tasks)

        },
        setPathImg(state, action){
            state.pathImg = action.payload
        },
        setNotesList(state, action){
            state.notes = action.payload
        },
        addNewNote(state, action){
            state.notes.push(action.payload)
        },
        changeNote(state, action){
            const index = state.notes.reduce((r,e, i)=> {
                if(e.id === action.payload.id) r=i
                return r
            },0)
            // console.log(action.payload)
            // state.notes[index]=action.payload
            // console.log(state.notes)
            state.notes.splice(index,1,action.payload)
            // state.notes.push(action.payload)

        },
        setRedactedNote(state, action){
            state.redactedNote = action.payload
        },
        updateNoteList(state, action){
            const index = state.notes.findIndex(e=>e.id === action.payload.id)
            state.notes.splice(index,1,action.payload)
        },
        deleteNote(state, action){
            const index = state.notes.findIndex(e=>e.id === action.payload)
            console.log(`action.payload:${action.payload}\nindex:${index}`)
            state.notes.splice(index,1)
        }
    }

})

export const {
    resetState,
    setName,
    setEmail,
    setCreatDat,
    setTasks,
    addTask,
    checkTask,
    defChangeTask,
    defDelitTask,
    setId,
    setPathImg,
    setNotesList,
    addNewNote,
    setRedactedNote,
    updateNoteList,
    deleteNote
} = defSlice.actions;
export default defSlice.reducer