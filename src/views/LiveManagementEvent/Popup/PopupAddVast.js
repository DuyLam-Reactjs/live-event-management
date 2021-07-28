import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CInput,
  CInputGroup,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {sendToast} from "../../../helpers/common";


const PopupAddVast = (props) => {
  const { isPreRoll, vastUrl, setVastUrl, modal, setModal } = props;
  const [bumperTime, setBumperTime] = useState({
    hour: '00',
    minute: '00',
    second: '00'
  })

  const [data, setData] = useState(vastUrl)

  useEffect(() => {
    setData(vastUrl);
  }, [vastUrl])

  const handleChangeField = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleChangeBumper = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/, '');
    value = value.replace(/[:]/, '');

    if (value !== null && value.length !== 0) {
      // lấy 6 số đầu tiên
      value = value.match(/.{1,6}/g)[0];

      // chia thành nhóm 2 số
      value = value.match(/.{1,2}/g);

      // kiểm tra giới hạn giờ, phút, giây
      switch (value.length) {
        case 1:
          value[0] = Number(value[0]) > 59 ? '59' : value[0];
          setBumperTime({
            ...bumperTime,
            hour: '00',
            minute: '00',
            second: value[0]
          })
          break;
        case 2:
          value[0] = Number(value[0]) > 59 ? '59' : value[0];
          value[1] = Number(value[1]) > 59 ? '59' : value[1];
          setBumperTime({
            ...bumperTime,
            hour: '00',
            minute: value[0],
            second: value[1]
          })
          break;
        case 3:
          value[0] = Number(value[0]) > 23 ? '23' : value[0];
          value[1] = Number(value[1]) > 59 ? '59' : value[1];
          value[2] = Number(value[2]) > 59 ? '59' : value[2];
          setBumperTime({
            ...bumperTime,
            hour: value[0],
            minute: value[1],
            second: value[2]
          })
          break;
        default:
          break
      }

      value = value.join(":")
    }
    setData({
      ...data,
      bumper: value
    });
  }

  const handleClose = () => {
    setModal(false);
    setData(vastUrl)
  }

  const checkBlank = (str) => {
    return str == null || str.trim() === ''
  }
  const handleSave = () => {
    let errorString = ''
    if (checkBlank(data.url_1) && isPreRoll && checkBlank(data.bumper)){
      errorString = "Vui lòng nhập Vast URL 01 và thông tin bumper"
      sendToast({message: errorString})
    }
    if (checkBlank(data.url_1) && !isPreRoll) {
      errorString = "Vui lòng nhập Vast URL 01"
      sendToast({message: errorString})
    }
    if (checkBlank(data.url_1) && isPreRoll && !checkBlank(data.bumper)) {
      errorString = "Vui lòng nhập Vast URL 01"
      sendToast({message: errorString})
    }
    if (isPreRoll && checkBlank(data.bumper) && !checkBlank(data.url_1)) {
      errorString = "Vui lòng nhập thông tin bumper"
      sendToast({message: errorString})
    }
    if (isPreRoll && !checkBlank(data.bumper) && !checkBlank(data.url_1)){
      setModal(false);
      data.bumper = [bumperTime.hour, bumperTime.minute, bumperTime.second].join(":")
      setVastUrl(data);
    }
    if (!isPreRoll && !checkBlank(data.url_1)){
      setModal(false)
      setVastUrl(data)
    }
  }


  return (
    <React.Fragment>
      <CModal closeOnBackdrop={false} show={modal} onClose={handleClose} centered={true}>
        <CModalHeader style={{ backgroundColor: '#646464' }}>
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
            <h4 className="mb-0">Vast URL & bumper</h4>
            <CButton className='p-0 shadow-none' onClick={handleClose}>
              <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          <div >
            <div className="d-flex flex-column mb-2">
              <p className="mb-1"><strong>VastURL</strong></p>
              {
                dataVastURl.map((item, index) => {
                  let vastUrlItem = ''
                  const id = item?.id
                  if (id === 1 ) vastUrlItem = data?.url_1
                  if (id === 2 ) vastUrlItem = data?.url_2
                  if (id === 3 ) vastUrlItem = data?.url_3
                  return  (
                    <CInputGroup key={index} className={"mt-2"}>
                      <CInput
                        name={'url_' + item?.id}
                        type="text"
                        value={vastUrlItem || ''}
                        placeholder={'URL 0' + item?.id}
                        style={{ color: '#222' }}
                        onChange={handleChangeField}
                      />
                    </CInputGroup>
                  )
                })
              }
            </div>
            {isPreRoll &&
            <div className="d-flex flex-column mb-2">
              <p className="mb-1"><strong>Bumper</strong></p>
              <CInputGroup className="mt-1">
                <CInput
                  name="bumper"
                  type="text" value={data?.bumper || ''}
                  placeholder='Enter để nhập. Format: mm:ss, hoặc hh:mm:ss'
                  style={{ color: '#222' }}
                  onChange={handleChangeBumper}
                />
              </CInputGroup>
            </div>}
            <div className="d-flex justify-content-end mt-3">
              <CButton className="pl-4 pr-4" color="success" onClick={handleSave}>Lưu</CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>

    </React.Fragment>

  )
}


const dataVastURl = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  }
]
export default PopupAddVast
