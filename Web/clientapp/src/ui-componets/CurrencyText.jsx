import NumberFormat from 'react-number-format';
CurrencyText.defaultProps={
    priceName:""
}
export default function CurrencyText({ value, priceName }) {
    return (
        <NumberFormat value={value}
            displayType={'text'}
            thousandSeparator={true}
            suffix={` ${priceName} `}
            decimalScale={2}
            renderText={(v,props)=><span {...props}>{v}</span>}
            />
    )
}