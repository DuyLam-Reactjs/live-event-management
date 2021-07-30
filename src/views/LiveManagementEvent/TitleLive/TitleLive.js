import React from "react";
import {CCol, CRow} from "@coreui/react";

const TitleLive = (props) => {
  const {title, isCreateProvider} = props
  return (
    <CRow className="pt-2 pb-4">
      <CCol className="col-lg-7">
        {isCreateProvider &&
          <h3 className="m-0">
            <span style={{color:'#9B9B9B'}}> Live Event Management List </span><strong> / Thêm Live Entity</strong>
          </h3>
        }
        <h2>{title}</h2>
      </CCol>
    </CRow>
  )
}
export default TitleLive
