import React from "react";
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle, CInputGroup,
    CInputGroupPrepend,
    CInputGroupText
} from "@coreui/react";
import ConfigData from "../../../config/ConfigData";

const PresetIdLiveEvent = ({onCLickPresetId, presetId, name}) => {
    return (
        <CInputGroup>
            <CInputGroupPrepend>
                <CInputGroupText>{name}</CInputGroupText>
            </CInputGroupPrepend>
            <CDropdown className="btn-group" style={{width: '138px'}}>
                <CDropdownToggle color="default" className='border inputLive color-white'>
                    <span className="text-filter" style={{ color: '#222', textTransform: 'uppercase' }}>{presetId?.name}</span>
                </CDropdownToggle>
                <CDropdownMenu>
                    <div>
                        {(ConfigData.dataPresetId || []).map((item, index) => {
                            return (
                                <CDropdownItem key={index} onClick={()=>onCLickPresetId(item)}>{item?.name}</CDropdownItem>
                            )
                        })
                        }
                    </div>
                </CDropdownMenu>
            </CDropdown>
        </CInputGroup>
    )
}
export default PresetIdLiveEvent