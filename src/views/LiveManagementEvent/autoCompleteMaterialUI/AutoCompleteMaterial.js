import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {classUseStyles} from "../../../helpers/common";

const useStyles = makeStyles(classUseStyles())
const AutoCompleteMaterial =  (props) => {
    const classes = useStyles()
    const {
        name,
        handleScroll,
        handleChangeContent,
        setName,
        listData,
        handleChangeContentProvider,
        nameDefault
    } = props
    const [focusInput, setFocus] = useState(true)


    const onChange = (event, values) => {
        handleChangeContent && handleChangeContent(values)
        handleChangeContentProvider && handleChangeContentProvider(values)
        if (!nameDefault) setName(values)
    }
    const onFocus = () => {
        setFocus(false)
    }
    const [newData, setNewData] = useState([])
    useEffect(()=>{
        const arr = [...listData]
        arr.unshift({ id: 'all', name: "Tất cả"})
        setNewData(arr)
    },[listData])
    return(
        <Autocomplete
            classes={classes}
            className={"color-white btn-filter ml-1 mr-1"}
            options={newData}
            getOptionLabel={(option) => (option ? (option?.name || option?.ads_group) : '')}
            onChange={onChange}
            onScroll={handleScroll}
            onFocus={onFocus}
            size={"small"}
            style={{
                border: '1px solid #d8dbe0',
                marginTop: '11px',
            }}
            renderInput={(params) =>
                focusInput
                    ? <TextField
                        {...params}
                        label={
                            name
                                ? name
                                : "Tất cả"
                        }
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
    )
}
export default AutoCompleteMaterial