import GridReport from '../GridReport/GridReport';
import { languageElements } from './ReportStocks-languageElements';

export default function ReportStocks(props) {
  return (
    <div className='Stocks'>
      <GridReport
        id='reportStocks'
        dataEndpoint='stocks/get'
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
