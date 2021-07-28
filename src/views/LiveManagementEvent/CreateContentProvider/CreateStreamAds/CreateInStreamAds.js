import React from 'react'
import {CButton, CCol, CRow} from "@coreui/react";
import {useDispatch} from "react-redux";
import {openPopup} from "../../../../actions/popup";
import {POPUP} from "../../../../constants/constants";

const CreateInStreamAds = (props) => {
  const {
    setNewData,
    newData,
    disable,
    isCreateProvider
  } = props

  const dispatch = useDispatch()

  const onClick = async () => {
    if (isCreateProvider){
      dispatch(openPopup({
        name: POPUP.NAME.IN_STREAM_ADS.CREATE_NEW_INSTREAM_ADS,
        setNewData,
        newData,
      }))
    }else {
      dispatch(openPopup({
        name: POPUP.NAME.IN_STREAM_ADS.CREATE_INSTREAM_ADS,
        setNewData,
        newData,
      }))
    }
  }

    return(
    <div className="p-4" style={{backgroundColor: 'white'}}>
      <CRow className="justify-content-between" >
        <CCol className="col-lg-10">
          <h5 className="mb-0 font-weight-bold">THÊM QUẢNG CÁO</h5>
        </CCol>
        <CCol className="col-lg-2">
          <CButton block color={disable ? "success" : "secondary"} disabled={!disable} onClick={onClick}>Tạo quảng cáo</CButton>
        </CCol>
      </CRow>
    </div>
  )
}

export default CreateInStreamAds
