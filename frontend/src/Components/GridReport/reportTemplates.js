export const reportTemplates = {
  gridReports: {
    ReportInvoices01: {
      sqlFrom: "WAT_INV",
      tableCode: "INV",
      columns: [
        {
          field: "ExternalSystem_ID",
        },
        {
          field: "ExternalSystem_TransactID",
        },
        {
          field: "InvNum",
        },
        {
          field: "Inv_SeqNum",
        },
        {
          field: "ACCT_Period",
        },
        {
          field: "InvType",
        },
        {
          field: "InvClass",
        },
        {
          field: "Ref_InvNum",
        },
        {
          field: "Parent_InvNum",
        },
        {
          field: "AccountingStatus",
        },
        {
          field: "Cancellation_ReasonCode",
        },
        {
          field: "Vendor_ID",
        },
        {
          field: "Vendor_ACCT_Code",
        },
        {
          field: "Vendor_ExternalCode1",
        },
        {
          field: "Vendor_ExternalCode2",
        },
        {
          field: "Vendor_Name",
        },
        {
          field: "Vendor_Name1",
        },
        {
          field: "Vendor_Name2",
        },
        {
          field: "Vendor_Country",
        },
        {
          field: "Vendor_State",
        },
        {
          field: "Vendor_ZIP",
        },
        {
          field: "Vendor_Addr_District",
        },
        {
          field: "Vendor_City",
        },
        {
          field: "Vendor_Addr_StreetName",
        },
        {
          field: "Vendor_Addr_ps_type",
        },
        {
          field: "Vendor_Addr_housenr",
        },
        {
          field: "Vendor_Addr_building",
        },
        {
          field: "Vendor_Addr_stairway",
        },
        {
          field: "Vendor_Addr_floor",
        },
        {
          field: "Vendor_Addr_door",
        },
        {
          field: "Vendor_Contact",
        },
        {
          field: "Vendor_Phone",
        },
        {
          field: "Vendor_Email",
        },
        {
          field: "Vendor_LegalPersonType",
        },
        {
          field: "Vendor_TaxNum",
        },
        {
          field: "Vendor_TaxNum2",
        },
        {
          field: "Vendor_TaxNum3",
        },
        {
          field: "Vendor_PrivatePersonID",
        },
        {
          field: "Vendor_BankAcc",
        },
        {
          field: "Vendor_IBAN",
        },
        {
          field: "Vendor_SWIFT",
        },
        {
          field: "Vendor_AccNum",
        },
        {
          field: "Customer_ID",
        },
        {
          field: "Customer_ACCT_Code",
        },
        {
          field: "Customer_ExternalCode1",
        },
        {
          field: "Customer_ExternalCode2",
        },
        {
          field: "Customer_Name1",
        },
        {
          field: "Customer_Name2",
        },
        {
          field: "Customer_Country",
        },
        {
          field: "Customer_State",
        },
        {
          field: "Customer_ZIP",
        },
        {
          field: "Customer_Addr_District",
        },
        {
          field: "Customer_City",
        },
        {
          field: "Customer_Addr_StreetName",
        },
        {
          field: "Customer_Addr_ps_type",
        },
        {
          field: "Customer_Addr_housenr",
        },
        {
          field: "Customer_Addr_building",
        },
        {
          field: "Customer_Addr_stairway",
        },
        {
          field: "Customer_Addr_floor",
        },
        {
          field: "Customer_Addr_door",
        },
        {
          field: "Customer_Contact",
        },
        {
          field: "Customer_Phone",
        },
        {
          field: "Customer_Email",
        },
        {
          field: "Customer_LegalPersonType",
        },
        {
          field: "Customer_TaxNum",
        },
        {
          field: "Customer_TaxNum2",
        },
        {
          field: "Customer_TaxNum3",
        },
        {
          field: "Customer_PrivatePersonID",
        },
        {
          field: "Customer_BankAcc",
        },
        {
          field: "Customer_IBAN",
        },
        {
          field: "Customer_SWIFT",
        },
        {
          field: "Customer_AccNum",
        },
        {
          field: "Period_FROM",
          type: "date",
        },
        {
          field: "Period_TO",
          type: "date",
        },
        {
          field: "InvDate",
          type: "date",
        },
        {
          field: "DeliveryDate",
          type: "date",
        },
        {
          field: "AccDate",
          type: "date",
        },
        {
          field: "PaymentMethod",
        },
        {
          field: "DueDate",
          type: "date",
        },
        {
          field: "PostInDate",
          type: "date",
        },
        {
          field: "InvInDueDate",
          type: "date",
        },
        {
          field: "Net_LC",
          type: "float",
        },
        {
          field: "Tax_LC",
          type: "float",
        },
        {
          field: "Gross_LC",
          type: "float",
        },
        {
          field: "PayStatus",
          options: [
            "",
            {
              value: "NOT PAID",
              text: "###-NOT PAID",
            },
            {
              value: "PAID",
              text: "###-PAID",
            },
            {
              value: "CANCELLED",
              text: "###-CANCELLED",
            },
          ],
        },
        {
          field: "Fully_paid_date",
          type: "date",
        },
        {
          field: "PaidAmount_DC",
          type: "float",
        },
        {
          field: "PaidAmount_FC",
          type: "float",
        },
        {
          field: "PaidAmount_LC",
          type: "float",
        },
        {
          field: "Backlog_DC",
          type: "float",
        },
        {
          field: "Backlog_FC",
          type: "float",
        },
        {
          field: "Backlog_LC",
          type: "float",
        },
        {
          field: "Net_DC",
          type: "float",
        },
        {
          field: "Tax_DC",
          type: "float",
        },
        {
          field: "Gross_DC",
          type: "float",
        },
        {
          field: "Lang",
        },
        {
          field: "Inv_Curr_DC",
          options: [
            "",
            "AUD",
            "CAD",
            "CNY",
            "EUR",
            "GBP",
            "HKD",
            "HUF",
            "JPY",
            "KRW",
            "MYR",
            "SGD",
            "THB",
            "USD",
          ],
        },
        {
          field: "Net_FC",
          type: "float",
        },
        {
          field: "Tax_FC",
          type: "float",
        },
        {
          field: "Gross_FC",
          type: "float",
        },
        {
          field: "Remarks1",
        },
        {
          field: "Remarks2",
        },
        {
          field: "Attachments",
        },
        {
          field: "Added_Date",
          type: "date",
        },
        {
          field: "Added_UserName",
          type: "date",
        },
        {
          field: "Added_UserEmail",
          type: "date",
        },
        {
          field: "Added_UserPhone",
          type: "date",
        },
        {
          field: "ACC_Info",
        },
        {
          field: "Subcontracted_Services",
        },
      ],
      orderBy: "InvNum",
      sqlTop: 1000,
      rowCountPerPage: 50,
      selectedFilters: [
        "InvDate",
        "DeliveryDate",
        "DueDate",
        "Fully_paid_date",
        "InvNum",
        "Inv_SeqNum",
        "PayStatus",
        "Inv_Curr_DC",
      ],
      selectedColumns: [
        "Vendor_Name",
        "InvNum",
        "Inv_SeqNum",
        "InvDate",
        "DeliveryDate",
        "DueDate",
        "Fully_paid_date",
        "PayStatus",
        "Net_FC",
        "Tax_FC",
        "Gross_FC",
        "Inv_Curr_DC",
        "Net_LC",
        "Tax_LC",
        "Gross_LC",
      ],
    },
    ReportWrhsStock01: {
      sqlFrom: "WAT_WRHS_STOCKS",
      tableCode: "WRHS_STOCKS",
      columns: [
        {
          field: "ExternalSystem_ID",
        },
        {
          field: "ExternalSystem_TransactID",
        },
        {
          field: "Items_No",
        },
        {
          field: "Items_Description_1",
        },
        {
          field: "Items_Description_2",
        },
        {
          field: "Expire_Date",
          type: "date",
        },
        {
          field: "Prod_Date",
          type: "date",
        },
        {
          field: "LOT_1",
        },
        {
          field: "LOT_2",
        },
        {
          field: "Warehouse",
        },
        {
          field: "Location",
        },
        {
          field: "Status",
        },
        {
          field: "Price_UnitPrice",
          type: "float",
        },
        {
          field: "Price_Currency",
          options: ["", "HUF", "EUR"],
        },
        {
          field: "Price_Unit",
        },
        {
          field: "Weight_Net",
          type: "float",
        },
        {
          field: "Weight_Gross",
          type: "float",
        },
        {
          field: "Stock_Available",
          type: "float",
        },
        {
          field: "Stock_Reserved",
          type: "float",
        },
        {
          field: "Stock_External_1",
          type: "float",
        },
        {
          field: "Stock_External_2",
          type: "float",
        },
        {
          field: "Stock_External_3",
          type: "float",
        },
      ],
      orderBy: "Items_No",
      sqlTop: 1000,
      rowCountPerPage: 50,
      selectedFilters: ["Items_No", "Items_Description_1", "LOT_1"],
      selectedColumns: [
        "Items_No",
        "Items_Description_1",
        "LOT_1",
        "Stock_Available",
        "Stock_Reserved",
      ],
    },
    reportDeliveries: {
      from: "deliveries",
      columns: [
        {
          field: "ExternalSystem_ID",
        },
        {
          field: "OrderNo",
        },
        {
          field: "PurchaseOrderNo",
        },
        {
          field: "LoadingPlace",
        },
        {
          field: "LoadingDate",
          type: "date",
        },
        {
          field: "UnloadingPlace",
        },
        {
          field: "UnloadingDate",
          type: "date",
        },
        {
          field: "Status",
          options: [
            { value: "", text: "" },
            { value: "DELIVERED", text: "###-status-delivered" },
            { value: "NOT DELIVERED", text: "###-status-not-delivered" },
            { value: "IN-PROGRESS", text: "###-status-in-progress" },
          ],
        },
      ],
      orderBy: "LoadingDate",
      maxRecords: 1000,
      rowCountPerPage: 50,
      selectedFilters: [
        "OrderNo",
        "PurchaseOrderNo",
        "LoadingPlace",
        "LoadingDate",
        "UnloadingPlace",
        "UnloadingDate",
        "Status",
      ],
      selectedColumns: [
        "OrderNo",
        "PurchaseOrderNo",
        "LoadingPlace",
        "LoadingDate",
        "UnloadingPlace",
        "UnloadingDate",
        "Status",
      ],
    },
  },
};
