import React, {useState} from 'react'
import {CButton, CCol} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import PopupAddVast from "../../Popup/PopupAddVast";
import {parsedNumberUrl} from "../../../../helpers/common";


const VastUrlInStreamAds = (props) => {
  const {itemAds, dataInStreamAdsType, setVastUrl} = props
  const [popupVastUrl, setPopupVast] = useState(false)
  const valueUrl = itemAds?.vast_url
  const onOpenPopupUrl = () => {
    setPopupVast(!popupVastUrl)
  }
  const numberUrl = parsedNumberUrl(valueUrl)

  return(
    <CCol>
      <p className="ml-1 mb-2">Vast URL</p>
      <div>
        <CButton className="btn-group mt-1"
                 color="secondary" variant='outline'
                 style={{color: '#222',width: '120px'}}
                 onClick={onOpenPopupUrl}>
          <div className="d-flex ">
            <span>{numberUrl ? 'Có ' + numberUrl + ' URL' : 'Nhập URL'}</span>
            <CIcon content={freeSet.cilLink}
                   height="18"
                   style={{ margin: '3px', color: "#3AB67A" }}/>
          </div>
        </CButton>
        <PopupAddVast
          isPreRoll={itemAds?.type === dataInStreamAdsType[0].id}
          modal={popupVastUrl}
          setModal={setPopupVast}
          vastUrl={itemAds?.vast_url}
          setVastUrl={setVastUrl}>
        </PopupAddVast>
      </div>
    </CCol>
  )
}
export default VastUrlInStreamAds
