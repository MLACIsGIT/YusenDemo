import { Redirect } from 'react-router-dom'
import HeaderLine from '../../Components/HeaderLine/HeaderLine'
import ReportInvoices from '../../Components/ReportInvoices/ReportInvoices'

export default function PageReports(props) {
    if (!props.loginData) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className='page-reports'>
            <HeaderLine
                language={props.language}
                selectedPage={'invoices'}
                loginData={props.loginData}
            />

            <ReportInvoices
                language={props.language}
                loginData={props.loginData}
            />
        </div>
    )
}
