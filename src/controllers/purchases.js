import Prisma from "../prisma";

export const PurchasesController = { 
async store(req, res, next) {
    try{
    const {purchase_client_name, purchase_client_address, purchased_products, purchase_payment_form, purchased_quantity, purchase_price, is_finished, is_shipped} = req.body

    const p = await prisma.purchases.create({
        data : {purchase_client_name, purchase_client_address, purchased_products, purchase_payment_form, purchased_quantity, purchase_price, is_finished, is_shipped}
    })
    res.status(201).json(p)
        }catch(err){
         next(err);
        }
}
}