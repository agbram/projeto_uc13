// jean

// assincrono nome_da_função(recebendo, responder, proximo)
export const CartController = {
    async store(req, res, next){
        try{
                const {
                    productQuantity,
                    stockId,
                    orderId
                    } = req.body;

                const cart = await prisma.stock.create({
                    data: {
                        productQuantity,
                        stockId,
                        orderId
                    } 
                });
                //respondendo com status 201-criado e encapsulando no formato json(product)
                res.status(201).json(cart);
        } catch(err){ 
            next(err);
        }
    }
}