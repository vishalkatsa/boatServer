const {Schema} = require('mongoose');
const mongoURI = require('../Database/database')

const categorySchema = Schema({
    maincategory:{
        type:String,
        require:true
    },
    
});
const subcategorySchema = Schema({
    subcategory:{
        type:String,
        require:true
    },
    maincategoryid:{
        type:Schema.Types.ObjectId,
        ref:'category',
    }
    
});
const toSubcategorySchema = Schema({
    tosubcatagory1:{
        type:String,
    },
    tosubcatagory2:{
        type:String,
    },
    tosubcatagory3:{
        type:String,
    },
    tosubcatagory4:{
        type:String,
    },
    maincategoryid:{
        type:Schema.Types.ObjectId,
        ref:'category',
    },
    subcategoryid:{
        type:Schema.Types.ObjectId,
        ref:'subcategory',
    }
    
});


const Category = model("category", categorySchema);
const Subcategory = model("subcategory", subcategorySchema);
const ToSubcategory = model("todubcategory", toSubcategorySchema);

module.exports = { Category, Subcategory, ToSubcategory };
