import express, { Request, Response } from "express";
import { failure, success } from "../utils/commonResponse";
import { Sale } from "../model/sale";

class saleController {
    async getAll(req: Request, res: Response) {
        const {} = req;
        const results = await Sale.find({}).populate("customerId").populate({ path: "cart.productId" });
        return res.send(success({ message: "Successfully got all sales", data: results }));
    }

    async getSalesByCustomer(req: Request, res: Response) {
        try {
            const { customerId } = req.params;
            if (customerId.length !== 24) {
                return res.send(failure({ message: "Customer ID is not in the correct format!" }));
            }
            const results = await Sale.find({ customerId: customerId }).populate("customerId").populate({ path: "cart.productId" });
            if (results.length > 0) {
                return res.send(success({ message: "Successfully got all sales", data: results }));
            } else {
                return res.send(failure({ message: "Customer does not exist!" }));
            }
        } catch (error) {
            console.log(error);
            return res.send(failure({ message: "Something went wrong" }));
        }
    }

    async addSale(req: Request, res: Response) {
        try {
            const newSale = new Sale();
            newSale.customerId = req.body.customerId;
            // 62a0801a27b1488454e58159;
            newSale.cart = req.body.cart;
            newSale.total = req.body.total;
            newSale.verified = false;
            await newSale.save();
            console.log(newSale);
            return res.send(success({ message: "Successfully got all sales", data: newSale }));
        } catch (error) {
            console.log(error);
            return res.send(failure({ message: "Something went wrong" }));
        }
    }
}

const SaleController = new saleController();
export default SaleController;