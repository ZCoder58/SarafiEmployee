import update from 'immutability-helper';
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
    },
    displayText:(text)=>{
        return text?text:"وجود ندارد"
    },
     updateArray(collection,newObject,id) {
        const index = collection.findIndex((ac) => ac[id] === newObject[id]);
        const updatedCollection = update(collection, {$splice: [[index, 1, newObject]]});  // array.splice(start, deleteCount, item1)
        return updatedCollection
    }
}

export default Util