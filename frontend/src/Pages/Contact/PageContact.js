import { Redirect } from 'react-router-dom'
import './PageContact.scss'
import HeaderLine from '../../Components/HeaderLine/HeaderLine'
import ContactHamMenu from './ContactHamMenu/ContactHamMenu'

export default function PageContact(props) {
    if (!props.loginData) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className='page-contact'>
            <HeaderLine
                language={props.language}
                selectedPage={'contact'}
                loginData={props.loginData}
            />

            <aside>
                <ContactHamMenu
                    show={true}
                    language={props.language}
                />
            </aside>
            <main className='page-contact-main'>
            </main>
        </div>
    )
}
