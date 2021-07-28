import React, {useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheHeader
} from './index'

import { useDispatch, useSelector} from 'react-redux'
import {getUser} from "../actions/user";
import {setToken} from "../actions/app";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Popup from "../views/LiveManagementEvent/Popup/Popup";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import Cookie from "react-cookies";
import ConfigCookie from "../config/ConfigCookie";
import LocalStorage from "../config/LocalStorage";
import {handleLocalStorage} from "../helpers/common";


const TheLayout = () => {

    const dispatch = useDispatch()
    const dataProfile = useSelector(state => state?.User)
    const location = useLocation();
    const history = useHistory()
    const currentPath = location.pathname
    const search = location.search


    let checkUserLogin = Cookie.load(ConfigCookie.getTokenKey())

    useEffect(()=>{
        const checkLogin = () => {
            if (checkUserLogin){
                const idUser = handleLocalStorage(LocalStorage.GET, 'idUser')
                dispatch(setToken())
                dispatch(getUser({idUser}))
                history.push(
                    currentPath !== '/'
                        ? (currentPath + search)
                        : '/live/content-live-list'
                )
            }else {
                history.push('/login?rel=' + (currentPath + search))
            }
        }
        checkLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[checkUserLogin])

    return(
      <div className="c-app c-default-layout">
        <TheHeader profile={dataProfile?.PROFILE}/>
        <TheSidebar/>
        <div className="c-wrapper" style={{marginTop: '3rem'}}>
          <div className="c-body">
            <TheContent/>
          </div>
        </div>
        <Popup/>
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

        />
      </div>
    )
}

export default TheLayout

