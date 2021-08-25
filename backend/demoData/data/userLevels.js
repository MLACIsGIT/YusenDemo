export const userLevels = [
  {
    level: 'OWNER_SA',
    params: {
      gridReports: {
        reportInvoices: {
          from: 'invoices',
          columns: [
            {
              field: 'externalSystemId',
            },
            {
              field: 'PartnerId',
            },
            {
              field: 'invoiceNumber',
            },
            {
              field: 'invoiceType',
              options: [
                'A/P INVOICE',
                'A/R INVOICE',
                'CREDIT NOTE',
                'A/R CREDIT NOTE',
              ],
            },
            {
              field: 'invoiceDate',
              type: 'date',
            },
            {
              field: 'deliveryDate',
              type: 'date',
            },
            {
              field: 'paymentMethod',
              options: ['CASH', 'BANKTRANSFER'],
            },
            {
              field: 'dueDate',
              type: 'date',
            },
            {
              field: 'customerName',
            },
            {
              field: 'customerCountryCode',
            },
            {
              field: 'customerPostalCode',
            },
            {
              field: 'customerCity',
            },
            {
              field: 'customerAddressDetails',
            },
            {
              field: 'customerTaxNum',
            },
            {
              field: 'customerGroupMemberTaxNum',
            },
            {
              field: 'invoiceCurrency',
              options: ['', 'HUF', 'EUR', 'USD'],
            },
            {
              field: 'sumOfNet',
              type: 'float',
            },
            {
              field: 'sumOfTax',
              type: 'float',
            },
            {
              field: 'sumOfGross',
              type: 'float',
            },
            {
              field: 'payStatus',
              options: [
                { value: '', text: '' },
                { value: 'NOT PAYED', text: '###-NOT PAID' },
                { value: 'PAYED', text: '###-PAID' },
                { value: 'CANCELLED', text: '###-CANCELLED' },
              ],
            },
            {
              field: 'fullyPaidDate',
              type: 'date',
            },
            {
              field: 'paidAmount',
              type: 'float',
            },
          ],
          orderBy: 'InvNum',
          maxRecords: 1000,
          rowCountPerPage: 50,
          selectedFilters: [
            'invoiceDate',
            'deliveryDate',
            'dueDate',
            'fullyPaidDate',
            'invoiceNumber',
            'payStatus',
            'invoiceCurrency',
          ],
          selectedColumns: [
            'customerName',
            'invoiceNumber',
            'invoiceType',
            'invoiceDate',
            'deliveryDate',
            'paymentMethod',
            'dueDate',
            'customerName',
            'customerCountryCode',
            'customerPostalCode',
            'customerCity',
            'customerAddressDetails',
            'customerTaxNum',
            'customerGroupMemberTaxNum',
            'invoiceCurrency',
            'sumOfNet',
            'sumOfTax',
            'sumOfGross',
            'payStatus',
            'fullyPaidDate',
            'paidAmount',
          ],
        },
        ReportWrhsStock01: {
          sqlFrom: 'stocks',
          columns: [
            {
              field: 'ExternalSystem_ID',
            },
            {
              field: 'ItemNo',
            },
            {
              field: 'Description',
            },
            {
              field: 'ExpireDate',
              type: 'date',
            },
            {
              field: 'ProdDate',
              type: 'date',
            },
            {
              field: 'LOT',
            },
            {
              field: 'Status',
            },
            {
              field: 'Weight',
              type: 'float',
            },
            {
              field: 'StockAvailable',
              type: 'float',
            },
            {
              field: 'StockReserved',
              type: 'float',
            },
          ],
          orderBy: 'ItemNo',
          maxRecords: 1000,
          rowCountPerPage: 50,
          selectedFilters: [
            'ItemNo',
            'Description',
            'ExpireDate',
            'ProdDate',
            'LOT',
            'Status',
          ],
          selectedColumns: [
            'ItemNo',
            'Description',
            'ExpireDate',
            'ProdDate',
            'LOT',
            'Status',
            'Weight',
            'StockAvailable',
            'StockReserved',
          ],
        },
      },
    },
  },
  {
    level: 'CUSTOMER',
    params: {
      gridReports: {
        reportInvoices: {
          from: 'invoices',
          columns: [
            {
              field: 'externalSystemId',
            },
            {
              field: 'PartnerId',
            },
            {
              field: 'invoiceNumber',
            },
            {
              field: 'invoiceType',
              options: [
                'A/P INVOICE',
                'A/R INVOICE',
                'CREDIT NOTE',
                'A/R CREDIT NOTE',
              ],
            },
            {
              field: 'invoiceDate',
              type: 'date',
            },
            {
              field: 'deliveryDate',
              type: 'date',
            },
            {
              field: 'paymentMethod',
              options: ['CASH', 'BANKTRANSFER'],
            },
            {
              field: 'dueDate',
              type: 'date',
            },
            {
              field: 'customerName',
            },
            {
              field: 'customerCountryCode',
            },
            {
              field: 'customerPostalCode',
            },
            {
              field: 'customerCity',
            },
            {
              field: 'customerAddressDetails',
            },
            {
              field: 'customerTaxNum',
            },
            {
              field: 'customerGroupMemberTaxNum',
            },
            {
              field: 'invoiceCurrency',
              options: ['', 'HUF', 'EUR', 'USD'],
            },
            {
              field: 'sumOfNet',
              type: 'float',
            },
            {
              field: 'sumOfTax',
              type: 'float',
            },
            {
              field: 'sumOfGross',
              type: 'float',
            },
            {
              field: 'payStatus',
              options: [
                { value: '', text: '' },
                { value: 'NOT PAYED', text: '###-NOT PAID' },
                { value: 'PAYED', text: '###-PAID' },
                { value: 'CANCELLED', text: '###-CANCELLED' },
              ],
            },
            {
              field: 'fullyPaidDate',
              type: 'date',
            },
            {
              field: 'paidAmount',
              type: 'float',
            },
          ],
          orderBy: 'InvNum',
          maxRecords: 1000,
          rowCountPerPage: 50,
          selectedFilters: [
            'invoiceDate',
            'deliveryDate',
            'dueDate',
            'fullyPaidDate',
            'invoiceNumber',
            'payStatus',
            'invoiceCurrency',
          ],
          selectedColumns: [
            'customerName',
            'invoiceNumber',
            'invoiceType',
            'invoiceDate',
            'deliveryDate',
            'paymentMethod',
            'dueDate',
            'customerName',
            'customerCountryCode',
            'customerPostalCode',
            'customerCity',
            'customerAddressDetails',
            'customerTaxNum',
            'customerGroupMemberTaxNum',
            'invoiceCurrency',
            'sumOfNet',
            'sumOfTax',
            'sumOfGross',
            'payStatus',
            'fullyPaidDate',
            'paidAmount',
          ],
        },
        ReportWrhsStock01: {
          sqlFrom: 'stocks',
          columns: [
            {
              field: 'ExternalSystem_ID',
            },
            {
              field: 'ItemNo',
            },
            {
              field: 'Description',
            },
            {
              field: 'ExpireDate',
              type: 'date',
            },
            {
              field: 'ProdDate',
              type: 'date',
            },
            {
              field: 'LOT',
            },
            {
              field: 'Status',
            },
            {
              field: 'Weight',
              type: 'float',
            },
            {
              field: 'StockAvailable',
              type: 'float',
            },
            {
              field: 'StockReserved',
              type: 'float',
            },
          ],
          orderBy: 'ItemNo',
          maxRecords: 1000,
          rowCountPerPage: 50,
          selectedFilters: [
            'ItemNo',
            'Description',
            'ExpireDate',
            'ProdDate',
            'LOT',
            'Status',
          ],
          selectedColumns: [
            'ItemNo',
            'Description',
            'ExpireDate',
            'ProdDate',
            'LOT',
            'Status',
            'Weight',
            'StockAvailable',
            'StockReserved',
          ],
        },
      },
    },
  },
];
