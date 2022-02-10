 /**convert json object to string for saving to database and get a string and convert it to object */
 const JsonOptions={
     convertToString:(jsonData)=>{
        var data=JSON.stringify(jsonData).replaceAll('"',"'")
        return data
    },
     convertToJson:(stringData)=>{
        var data=stringData.replaceAll("'",'"')
         data=JSON.parse(data)
        return data
    }
    
}
export default JsonOptions