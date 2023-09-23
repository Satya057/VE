const mongoose=require(`mongoose`);


const todoschema=mongoose.Schema({
    task:{type:String}
})

const todomodel=mongoose.model("todo",todoschema)

module.exports=todomodel;