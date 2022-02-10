const Util ={
    ObjectToFormData:(object)=>{
        var formData=new FormData()
    
        Object.keys(object).map((key)=>{
            if(object[key]!=null){
                return formData.append(key,object[key])
            }
        })
        return formData
    },
    GenerateRandom:(min,max)=>{
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

export default Util