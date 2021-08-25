import GridReport from '../GridReport/GridReport';
import { languageElements } from './ReportDeliveries-languageElements';

export default function ReportDeliveries(props) {
  return (
    <div className='Stocks'>
      <GridReport
        id='reportDeliveries'
        dataEndpoint='deliveries/get'
        language={props.language}
        loginData={props.loginData}
        report={{
          reportId: 'reportDeliveries',
          languageElements: languageElements
        }}
      />
    </div>
  );
}
