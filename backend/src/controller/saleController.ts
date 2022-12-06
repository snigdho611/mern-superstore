import express, { Request, Response } from "express";
import { success } from "../utils/commonResponse";
import { Sale } from "../model/sale";

class saleController {
    async getAll(req: Request, res: Response) {
        const {} = req;
        const results = await Sale.find({}).populate("customerId").populate({ path: "cart.productId" });
        // console.log(results);
        return res.send(success({ message: "Successfully got all sales", data: results }));
    }

    async getSalesByCustomer(req: Request, res: Response) {
        const {} = req;
        const results = Sale.find({});
        console.log(results);
    }
}

const SaleController = new saleController();
export default SaleController;