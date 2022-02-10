import { SearchOutlined } from '@mui/icons-material'
import { Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
export default function TableGlobalSearch({ open, onSearch }) {
    const [search, setSearch] = React.useState()
    function searchText() {
        onSearch(search)
    }
    return (
        <Collapse in={open} orientation='vertical'>
            <TextField
                onChange={(e) => setSearch(s => s = e.target.value)}
                label="جستجو"
                size="small"
                type="text"
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => searchText()}>
                            <SearchOutlined />
                        </IconButton>
                    </InputAdornment>
                }}
            />
        </Collapse>
    )
}