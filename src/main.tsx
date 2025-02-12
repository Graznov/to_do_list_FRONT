import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Registr from "./Components/Registr/Registr.tsx";
import {NewAccount} from "./Components/NewAccount/NewAccount.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LogInWind} from "./Components/LogInWind/LogInWind.tsx";
import WorkWind from "./Components/WorkWind/WorkWind.tsx";
import TodayList from "./Components/WorkWind/Components/TodayList/TodayList.tsx";
import {Provider} from "react-redux";
import {store} from "./Store/store.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Registr/>,
        // errorElement:<ErrorPage/>,
        children:[
            {
                path:"/",
                // index,
                element: <NewAccount/>
            },
            {
                path:"/login",
                element: <LogInWind/>
            },
        ]
    },
    {
        path: '/workwindow',
        element:<WorkWind/>,
        children:[
            {
                path: '/workwindow/today',
                element: <TodayList/>,
            },
            {
                path: '/workwindow/sevenDaysList',
                element: <TodayList/>
            },
            {
                path: '/workwindow/alllist',
                element: <TodayList/>
            },
            {
                path: '/workwindow/completed',
                element: <TodayList/>
            },
            {
                path: '/workwindow/trash',
                element: <TodayList/>
            },
            {
                path: '/workwindow/tags',
                element: <TodayList/>
            }

        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>

  </React.StrictMode>,
)
