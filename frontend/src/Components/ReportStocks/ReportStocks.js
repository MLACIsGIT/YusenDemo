import GridReport from '../GridReport/GridReport';
import { languageElements } from './ReportStocks-languageElements';

export default function ReportStocks(props) {
  return (
    <div className='Stocks'>
      <GridReport
        id='ReportWrhsStock01'
        dataEndpoint='data/get'
        language={props.language}
        loginData={props.loginData}
        report={{
          reportId: '',
          languageElements: languageElements
        }}
      />
    </div>
  );
}
