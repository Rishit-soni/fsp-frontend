export class Calculations {
    public static calculateExclusiveTax(product, applied_tax?) {
      let return_data: any = {};
      let discount = product.product_discount;

      // Simple quantity * rate of product
      let taxableVal = (product.product_qty * product.product_rate) || 0;
  
      // Discount in number
      /* if (typeof discount !== "undefined" && discount !== 0 && !isPercentage) {
        taxableVal = taxableVal - discount;
      }*/
  
      // Discount in percentage
      let discount_val = 0;
      if (typeof discount !== "undefined" && discount !== 0) {
        product.discount_val = Number((taxableVal * discount) / 100);
        taxableVal = taxableVal - (taxableVal * discount) / 100;
      } else {
        product.discount_val = 0;
      }
      product.product_taxable_val = taxableVal.toFixed(2);
  
      return_data.product = product;
/*       if (applied_tax) {
        return_data.tax_obj = {
          hsn: product.hsn_or_sac_code,
          tax: Number(product.product_tax),
          amount: Number(product.product_taxable_val),
          tax_amount: (product.product_taxable_val * product.product_tax) / 100
            applied_tax === "cgst_sgst"
              ? ((product.product_taxable_val / 2) * product.product_tax) / 100
              : (product.product_taxable_val * product.product_tax) / 100,
        };
      } else {
        return_data.tax_obj = {};
      } */

      return_data.tax_obj = {
        hsn: product.hsn_or_sac_code,
        tax: Number(product.product_tax),
        amount: Number(product.product_taxable_val),
        tax_amount: (product.product_taxable_val * product.product_tax) / 100
      };
  
      return return_data;
    }
  
    public static calculateInclusiveTax(product, applied_tax) {
      let return_data: any = {};
      let discount = product.product_discount;
 
      // Simple quantity * rate of product
      let taxableVal: any = (product.product_qty * product.product_rate) || 0;

  
      /*if (discount !== 0 && !isPercentage) {
        taxableVal = taxableVal - discount;
      }*/
  
      // Discount in percentage
      let discount_val = 0;
      if (typeof discount !== "undefined" && discount != 0) {
        product.discount_val = Number((taxableVal * discount) / 100);
        taxableVal = taxableVal - (taxableVal * discount) / 100;
      } else {
        product.discount_val = 0;
      }
  
      product.product_taxable_val = taxableVal.toFixed(2);
      return_data.product = product;
  
      if (applied_tax) {
        return_data.tax_obj = {
          hsn: product.hsn_or_sac_code,
          tax: Number(product.product_tax),
          amount: Number(product.product_taxable_val),
          tax_amount:
            applied_tax === "cgst_sgst"
              ? (
                  ((product.product_taxable_val / 2) * product.product_tax) /
                  100
                ).toFixed(2)
              : (
                  (product.product_taxable_val * product.product_tax) /
                  100
                ).toFixed(2),
        };
      } else {
        return_data.tax_obj = {};
      }
  
      return return_data;
    }
  
    public static calculateOutOfTax(product) {
      let discount = product.product_discount;

  
      // Simple quantity * rate of product
      let taxableVal: any = (product.product_qty * product.product_rate) || 0;
  
      // Discount in number
      /*  if (discount !== 0 && !isPercentage) {
        taxableVal = taxableVal - discount;
      }*/
  
      // Discount in percentage
      let discount_val = 0;
      if (typeof discount !== "undefined" && discount !== 0) {
        product.discount_val = Number((taxableVal * discount) / 100);
        taxableVal = taxableVal - (taxableVal * discount) / 100;
      } else {
        product.discount_val = 0;
      }
  
      product.product_taxable_val = taxableVal.toFixed(2);
  
      return product;
    }
  }
  