import HamMenu from '../../../Components/HamMenu/HamMenu';
import { languageElements } from './ContactHamMenu-languageElements';

export default function ContactHamMenu(props) {
    return (
        <HamMenu
            show={props.show}
            language={props.language}
            languageElements={languageElements}
            menuItems={
                [
                    { itemId: 'BUDAPEST', link: '/contact/budapest' },
                    { itemId: 'VIENNA', link: '/contact/vienna' },
                    { itemId: 'KOPER', link: '/contact/koper' }
                ]
            } />
    )
}
