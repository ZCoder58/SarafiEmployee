import { CloseOutlined, RemoveOutlined, SearchOutlined } from '@mui/icons-material'
import { Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
export default function TableGlobalSearch({ open, onSearch }) {
    const [search, setSearch] = React.useState("")
    function searchText() {
        onSearch(search)
    }
     function handleClose(){
          setSearch("")
          onSearch("")
    }
    return (
        <Collapse in={open} orientation='vertical' sx={{ px:1 }}>
            <TextField
                onChange={(e) => setSearch(e.target.value)}
                label="جستجو"
                size="small"
                type="text"
                value={search}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        {search&& <IconButton size='small' onClick={()=>handleClose()}>
                            <CloseOutlined fontSize='small' />
                        </IconButton>}
                        <IconButton size='small' onClick={() => searchText()}>
                            <SearchOutlined fontSize='small' />
                        </IconButton>
                       
                    </InputAdornment>
                }}
            />
        </Collapse>
    )
}