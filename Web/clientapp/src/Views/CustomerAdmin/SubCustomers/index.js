import { EditOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
export default function SubCustomersIndex(){
    const columns = [
        {
            name: <Typography variant="body2" fontWeight={600}>مشتری</Typography>,
            selector: row =><Stack direction="column" spacing={1}>
                    <Typography>{row.name} {row.fatherName}</Typography>
                    <Typography>{row.address}</Typography>
            </Stack>,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>شماره تماس</Typography>,
            selector: row => row.phone,
            reorder: true
        },
        {

            sortField: "amount",
            name: <Typography variant="body2" fontWeight={600}>مقدار پول</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
            <Typography>{row.amount} {row.ratesCountryPriceName}</Typography>
    </Stack>,
            sortable: true,
            reorder: true
        },
        {
            name: "گزینه ها",
            selector: row => (
                <>
                    <IconButton>
                        <EditOutlined />
                    </IconButton>
                </>
            ),
            minWidth:"122px"
        }
    ]
}