import { Autocomplete, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React from 'react'
import { CAvatar } from '..';
import authAxiosApi from '../../axios'
import CustomerStatic from '../../helpers/statics/CustomerStatic';
/**
 * only for employee use
 * @param {} param0 
 * @returns 
 */
export default function SearchFriendDropdown({ defaultFriendId, onValueChange, ...props }) {
    const [friends, setFriends] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/friends/list').then(r => {
                setFriends(r)
                if (defaultFriendId) {
                    setValue(r.find(a => a.id === defaultFriendId))
                }
            })
            setLoading(false)
        })()
        return () => {
            setFriends([])
        }
    }, [defaultFriendId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={friends}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            // disableClearable
            onChange={(event, newValue) => {
                setValue(newValue)
                onValueChange(newValue)
            }}
            getOptionLabel={(option) => `${option.customerFriendName} ${option.customerFriendLastName}`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                   <ListItemAvatar>
                   <CAvatar src={CustomerStatic.profilePituresPath(option.customerFriendId,option.customerFriendPhoto)}/>
                   </ListItemAvatar>
                    <ListItemText
                    primary={`${option.customerFriendName} ${option.customerFriendLastName}`}
                    secondary={`${option.customerFriendCountryName} ${option.customerFriendCity}`}
                    />
                   
                </ListItem>}
        />

        </React.Fragment>
        
    )
}