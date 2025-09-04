// Bruno

import prisma from '../prisma.js';

export const PurchaseController = { 
async store(req, res, next) {
    try{
    const {purchaseClientName, purchaseClientAddress, purchasedProducts, purchasePaymentForm, purchasedQuantity, purchasePrice, isFinished, isShipped} = req.body

    const p = await prisma.purchase.create({
        data : {purchaseClientName, purchaseClientAddress, purchasedProducts, purchasePaymentForm, purchasedQuantity, purchasePrice, isFinished, isShipped}
    })
    res.status(201).json(p)
        }catch(err){
         next(err);
        }
}
}