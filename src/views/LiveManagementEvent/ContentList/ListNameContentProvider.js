import React, {useEffect, useState} from 'react'
import contentApi from "../../../apis/contentApi";
import AutoCompleteMaterial from "../autoCompleteMaterialUI/AutoCompleteMaterial";


const ListNameContentProvider = (props) => {
  const {
    handleChangeListName,
    dataContentList,
    handleScroll,
    parsedID
  } = props


  const [nameProviderId, setNameProviderId] = useState('')
  useEffect(()=>{
        if (parsedID?.id){
            contentApi.getContentProviderById(parsedID?.id).then(res=>{
                const data = res?.data
                if (res?.success){
                    setNameProviderId(data?.name)
                }
            })
        }
    },[])

  return(
    <div className="pr-2">
        <p className="ml-1 mb-2">Content provider</p>
        <AutoCompleteMaterial
            listData={dataContentList}
            name={nameProviderId}
            handleChangeContent={handleChangeListName}
            setName={setNameProviderId}
            handleScroll={handleScroll}
        />

    </div>
  )
}

export default ListNameContentProvider
