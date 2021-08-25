import { Redirect } from 'react-router-dom'
import HeaderLine from '../../Components/HeaderLine/HeaderLine'
import ReportStocks from '../../Components/ReportStocks/ReportStocks'

export default function PageReports(props) {
    if (!props.loginData) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className='page-stocks'>
            <HeaderLine
                language={props.language}
                selectedPage={'stocks'}
                loginData={props.loginData}
            />

            <ReportStocks
                language={props.language}
                loginData={props.loginData}
            />
        </div>
    )
}
