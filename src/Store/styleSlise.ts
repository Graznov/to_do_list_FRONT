import {createSlice} from '@reduxjs/toolkit'
import {Task} from "./defSlice.ts";

export interface StyleState {
    visibleAddTask:boolean,
    styleDeletedWind:boolean,
    styleAdaptiveVisible:boolean,
    styleSearchStatus:boolean,
    styleSearchList:Array<Task>,
    listTasks:string,
    styleTagActive:Array<string>,
    tags:Array<string>,
    input_AddTaskWind:{
        inputTitle:boolean,
        inputTag:boolean,
        inputDate:boolean
    },
    numberTasksMenu:{//количество задач для кнопки в левом меню
        today:number,
        sevenDays:number,
        all:number,
        completed:number,
        trash:number
    },
    language:string,
    theme:string,
}

const initialState:StyleState = {
    visibleAddTask:false, //для включенья/выключения окна добавления задач
    styleDeletedWind:false,
    styleAdaptiveVisible:false,
    styleSearchStatus:false,
    styleSearchList:[],
    listTasks:'Today',
    styleTagActive:[],
    tags:[], //теги для My List в меню
    input_AddTaskWind:{ //для валидации поолей в окне добавления задач
        inputTitle:true,
        inputTag:true,
        inputDate:true
    },
    numberTasksMenu:{//количество задач для кнопки в левом меню
        today:0,
        sevenDays:0,
        all:0,
        completed:0,
        trash:0
    },
    language:'en',
    theme:'light',
}

const styleSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers:{
        styleVisibleAddTask (state, action)  {
            state.visibleAddTask=action.payload
        },
        // changeVisibleChangeForm(state, action)  {
        //     state.visibleChangeForm=action.payload
        // },
        // setChangedTask (state, action)  {
        //     state.changedTask=action.payload
        // },
        changeTaskList (state, action){
            state.listTasks=action.payload
        },
        setStyleTagActive(state, action){
            if(state.styleTagActive.includes(action.payload)){
                state.styleTagActive.splice(state.styleTagActive.indexOf(action.payload),1)
            } else {
                state.styleTagActive.push(action.payload)
            }
        },
        plusTag(state, action){
            if(!state.tags.includes(action.payload))state.tags.push(action.payload)
        },

        change_input_AddTaskWind(state, action){
            if (action.payload==='NO TITLE'){
                state.input_AddTaskWind.inputTitle=false
            }
            if (action.payload==='NO TAG'){
                state.input_AddTaskWind.inputTag=false
            }
            if (action.payload==='NO DATA'){
                state.input_AddTaskWind.inputDate=false
            }
            if (action.payload==='CANCEL'){
                state.input_AddTaskWind.inputTitle=true
                state.input_AddTaskWind.inputTag=true
                state.input_AddTaskWind.inputDate=true
            }
        },
        setNumberTasksMenu(state, action){
            const currentDateArr = new Date().toISOString().split('');
            currentDateArr.splice(10)
            const currentDate=currentDateArr.join('')

            const currentDateMin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2).toISOString().split('');
            currentDateMin.splice(10)
            const minData =  currentDateMin.join('')

            const currentDateMax = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+8).toISOString().split('');
            currentDateMax.splice(10)
            const maxData =  currentDateMax.join('')

            const afterDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1, 23,59,59)//вчерашний день, все что меньше - просрочено

            state.numberTasksMenu.today = 0
            state.numberTasksMenu.sevenDays = 0
            state.numberTasksMenu.all = 0
            state.numberTasksMenu.completed = 0
            state.numberTasksMenu.trash = 0

            action.payload.forEach((e: { dueDate: string | number | Date | string[]; isCompleted: boolean }) => {

                if(typeof e.dueDate === 'string'){
                    if(e.dueDate.split('T')[0] === currentDate && !e.isCompleted){
                        state.numberTasksMenu.today++
                    }
                    if(e.isCompleted){
                        state.numberTasksMenu.completed++
                    }
                    if(e.dueDate.split('T')[0] >= currentDate && !e.isCompleted){
                        state.numberTasksMenu.all++
                    }
                    if(new Date(e.dueDate.split('T')[0])<afterDay){
                        state.numberTasksMenu.trash++
                    }
                    if(e.dueDate>=minData && e.dueDate<=maxData && !e.isCompleted){
                        state.numberTasksMenu.sevenDays++
                    }
                }


            })

        },

        setStyleDeletedWind(state, action){
            state.styleDeletedWind=action.payload
        },
        setAdaptiveVisible(state, action){
            state.styleAdaptiveVisible=action.payload
        },
        setSearchStatus(state, action){
                state.styleSearchStatus=action.payload
        },
        setStyleSearchList(state, action){
                state.styleSearchList = action.payload
        },
        setTheme(state,action){
            state.theme=action.payload
        },
        setLang(state, action){
            state.language=action.payload
        }


    },

})

export const {
    styleVisibleAddTask,
    // changeVisibleChangeForm,
    // setChangedTask,
    changeTaskList,
    plusTag,
    change_input_AddTaskWind,
    setNumberTasksMenu,
    setStyleTagActive,
    setStyleDeletedWind,
    setAdaptiveVisible,
    setSearchStatus,
    setStyleSearchList,
    setTheme,
    setLang

} = styleSlice.actions;
export default styleSlice.reducer