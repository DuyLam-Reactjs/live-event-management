
import React, {useState} from 'react'
import InStreamAdsItem from "./CreateStreamAds/InStreamAdsItem";
import CreateContentProviderInfo from "./CreateContentProviderInfo/CreateContentProviderInfo";
import CreateInStreamAds from "./CreateStreamAds/CreateInStreamAds";
import TitleAds from "../TitleAds/TitleAds";

const CreateContentProvider = () => {

  const [newData, setNewData] = useState( [])
  const [disable, setDisable] = useState('')

  return (
      <div>
        <TitleAds isCreateProvider/>
        <CreateContentProviderInfo  setDisable={setDisable} isCreateProvider/>
        <CreateInStreamAds
          isCreateProvider
          disable={disable}
          newData={newData}
          setNewData={setNewData}
        />
        {(newData || []).map((itemGroup, index)=>{
          return(
            <InStreamAdsItem
                itemAdsGroup={itemGroup}
                newData={newData}
                setNewData={setNewData}
                index={index}
            />

          )
        })}
      </div>

  )
}

export default CreateContentProvider
