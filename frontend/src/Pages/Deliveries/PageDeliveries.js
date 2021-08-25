import { Redirect } from 'react-router-dom'
import HeaderLine from '../../Components/HeaderLine/HeaderLine'
import ReportDeliveries from '../../Components/ReportDeliveries/ReportDeliveries'

export default function PageDeliveries(props) {
    if (!props.loginData) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className='page-reports'>
            <HeaderLine
                language={props.language}
                selectedPage={'tracking'}
                loginData={props.loginData}
            />

            <ReportDeliveries
                language={props.language}
                loginData={props.loginData}
            />
        </div>
    )
}
