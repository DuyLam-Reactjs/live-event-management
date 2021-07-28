import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {classUseStyles} from "../../../helpers/common";

const useStyles = makeStyles(classUseStyles())
const ListNameContentProvider = (props) => {
  const {
      getListAdsGroups,
      dataContentList,
      handleChangeContentProvider,
      handleScroll,
  } = props

    const [focusInput, setFocus] = useState(true)
    const onHandleScroll = () => {
      handleScroll && handleScroll()
    }
    const onFocus = () => {
      setFocus(false)
    }
    const onClick = (event, values) => {
    handleChangeContentProvider && handleChangeContentProvider(values)
    getListAdsGroups && getListAdsGroups(values?.id)
  }
  const classes = useStyles()
  return(
    <div className="pr-3">
        <p className="ml-1 mb-2">Content provider</p>
      <Autocomplete
          classes={classes}
          className={"color-white btn-filter ml-1 mr-1"}
          // id="combo-box-demo"
          options={dataContentList}
          getOptionLabel={(option) => (option ? option?.name : '')}
          onChange={onClick}
          onFocus={onFocus}
          onScroll={onHandleScroll}
          size={"small"}
          style={{
            border: '1px solid #d8dbe0',
            marginTop: '11px',
          }}
          renderInput={(params) =>
              focusInput
                  ? <TextField {...params}
                               label="Tất cả"
                               variant="outlined"
                               style={{height: '36px'}}
                  />
                  : <TextField
                      {...params}
                      variant="outlined"
                      style={{height: '36px'}}
                  />
          }
      />
    </div>
  )
}
export default ListNameContentProvider
