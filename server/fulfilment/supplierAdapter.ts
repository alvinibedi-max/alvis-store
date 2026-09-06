export type SupplierPurchaseRequest={orderId:string;supplierId:string;productId:string;quantity:number;maxSpend:number;currency:'GBP'};
export type SupplierPurchaseResult={success:boolean;externalOrderId?:string;amount?:number;reason?:string};
export interface SupplierAdapter{readonly supplierId:string;quote(productId:string,quantity:number):Promise<{productCost:number;shippingCost:number;currency:'GBP';validUntil:string}>;purchase(input:SupplierPurchaseRequest):Promise<SupplierPurchaseResult>;cancel(externalOrderId:string):Promise<void>;}

/** Safe default: no supplier can be purchased from until a real adapter is registered and explicitly enabled. */
export function assertSupplierPurchasingEnabled(){if(process.env.ALVIS_ENABLE_SUPPLIER_PURCHASES!=='true')throw new Error('Supplier purchasing is disabled. Configure and test a supplier adapter before enabling it.');}
