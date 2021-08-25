import GridReport from '../GridReport/GridReport';
import { languageElements } from './ReportInvoices-languageElements';

export default function ReportInvoices(props) {
  return (
    <div className='reportInvoices'>
      <GridReport
        id='reportInvoices'
        dataEndpoint='invoices/get'
        language={props.language}
        loginData={props.loginData}
        report={{
          reportId: 'reportInvoices',
          languageElements: languageElements
        }}
      />
    </div>
  );
}
