import { Box } from '@mui/material';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { CErrorMessage } from '..';
import { persian } from './lang';
TextEditor.defaultProps = {
    error: false
}
export default function TextEditor({ placeholder, defaultValue, onChange, error, helperText }) {
    return (
        <>
            <Box
                sx={{
                    border: `${error ? "1px solid red" : ""}`
                }}>
                <SunEditor setDefaultStyle="font-family: Shabnam;"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(value) => onChange(value === "<p><br></p>" ? "" : value)}
                    height={300}
                    setOptions={{
                        lang: persian,
                        buttonList: [
                            ['undo', 'redo'],
                            ['fontSize', 'formatBlock', 'paragraphStyle', 'blockquote', 'fontColor', 'hiliteColor'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            ['bold', 'underline', 'italic', 'strike'],
                            ['table'],
                            ['fullScreen', 'preview']
                        ]
                    }} />
            </Box>
            <CErrorMessage message={helperText} show={error} />
        </>
    )
}