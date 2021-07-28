import React from "react";
import {CCol, CRow} from "@coreui/react";

const TitleAds = (props) => {
  const {title, isCreateProvider, editContentProvider} = props
  return (
    <CRow className="pt-2 pb-4">
      <CCol className="col-lg-7">
        {isCreateProvider &&
          <h3 className="m-0">
            <span style={{color:'#9B9B9B'}}> Content Provider List </span><strong> / Thêm Content Provider</strong>
          </h3>
        }
        {editContentProvider &&
          <h3 className="m-0">
            <span style={{color:'#9B9B9B'}}> Content Provider List </span><strong> / Sửa Content Provider</strong>
          </h3>
        }
        <h2>{title}</h2>
      </CCol>

    </CRow>
  )
}

export default TitleAds
