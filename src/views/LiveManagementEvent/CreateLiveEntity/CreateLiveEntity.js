
import React, {useState} from 'react'
import CreateLiveEntityInfo from "./CreateLiveEntityInfo/CreateLiveEntityInfo";
import TitleLive from "../TitleLive/TitleLive";

const CreateLiveEntity = () => {

  const [newData, setNewData] = useState( [])
  const [disable, setDisable] = useState('')

  return (
      <>
        <TitleLive isCreateProvider/>
        <CreateLiveEntityInfo
            setDisable={setDisable}
            isCreateProvider/>
      </>
  )
}

export default CreateLiveEntity
