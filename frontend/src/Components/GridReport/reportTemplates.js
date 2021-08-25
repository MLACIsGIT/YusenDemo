export const reportTemplates = {
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
      reportStocks: {
        from: 'stocks',
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
            field: 'ProdDate',
            type: 'date',
          },
          {
            field: 'Lot',
          },
          {
            field: 'Status',
            options: [
              { value: '', text: '' },
              { value: 'Normal', text: '###-status-normal' },
              { value: 'Damaged', text: '###-status-damaged' },
            ]
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
          'ProdDate',
          'Lot',
          'Status',
        ],
        selectedColumns: [
          'ItemNo',
          'Description',
          'ProdDate',
          'Lot',
          'Status',
          'Weight',
          'StockAvailable',
          'StockReserved',
        ],
      },
      reportDeliveries: {
        from: 'deliveries',
        columns: [
            {
              field: 'ExternalSystem_ID',
            },
            {
              field: 'OrderNo',
            },
            {
              field: 'PurchaseOrderNo',
            },
            {
              field: 'LoadingPlace',
            },
            {
              field: 'LoadingDate',
              type: 'date',
            },
            {
              field: 'UnloadingPlace',
            },
            {
              field: 'UnloadingDate',
              type: 'date',
            },
            {
              field: 'Status',
              options: [
                { value: '', text: '' },
                { value: 'DELIVERED', text: '###-status-delivered' },
                { value: 'NOT DELIVERED', text: '###-status-not-delivered' },
                { value: 'IN-PROGRESS', text: '###-status-in-progress' },
              ],
            },
          ],
          orderBy: 'LoadingDate',
          maxRecords: 1000,
          rowCountPerPage: 50,
          selectedFilters: [
            'OrderNo',
            'PurchaseOrderNo',
            'LoadingPlace',
            'LoadingDate',
            'UnloadingPlace',
            'UnloadingDate',
            'Status',
          ],
          selectedColumns: [
            'OrderNo',
            'PurchaseOrderNo',
            'LoadingPlace',
            'LoadingDate',
            'UnloadingPlace',
            'UnloadingDate',
            'Status',
          ]
      }
    },
  };
