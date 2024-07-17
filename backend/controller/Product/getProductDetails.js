const productModel = require("../../models/productModel")


const getProductDetails = async(req,res)=>{
    try{
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            message : "OK",
            succes  : true,
            error : false
        })
        
    }catch(err){
        res.json({
            message : err?.message || err,
            error :true,
            succes :false
        })
    }
}
module.exports = getProductDetails