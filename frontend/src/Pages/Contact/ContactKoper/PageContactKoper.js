import { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import './PageContactKoper.scss';
import HeaderLine from '../../../Components/HeaderLine/HeaderLine'
import ContactHamMenu from '../ContactHamMenu/ContactHamMenu';
import Infobox from '../../../Components/Infobox/Infobox';
import { languageElements } from './PageContactKoper-languageElements';
import LanguageElementsHandler from '../../../Components/repository/LanguageElementsHandler';

export default function ContactKoper(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
      );

    const [hamShowed, showHam] = useState(false)

    function onHamClicked() {
        showHam(!hamShowed);
    }

    if (!props.loginData) {
        return (
            <Redirect to='/' />
        )
    }

    let mailTo = <Link to='#' onClick={(e) => {
        e.preventDefault();
        window.location = `mailto: ${languageElementsHandler.get('email')}`;
    }}
    >
        {languageElementsHandler.get('email')}
    </Link>

    const infobox = <>
        <h4>{languageElementsHandler.get('title1')}</h4>
        <h4>{languageElementsHandler.get('title2')}</h4>
        <br />
        <h6>{languageElementsHandler.get('info1')}</h6>
        <h6>{languageElementsHandler.get('info2')}</h6>
        <h6>{languageElementsHandler.get('info3')}</h6>
        <h6>{languageElementsHandler.get('info4')}</h6>
        <br />
        <h6>{languageElementsHandler.get('info5')}{mailTo}</h6>
    </>

    return (
        <div className='page-contact-koper'>
            <HeaderLine
                language={props.language}
                selectedPage={'contact'}
                loginData={props.loginData}
                onHamClicked={onHamClicked}
            />

            <aside>
                <ContactHamMenu
                    show={hamShowed}
                    language={props.language}
                />
            </aside>
            <main>
                <Infobox
                    left={'75px'}
                    top={'50px'}
                    info={infobox}
                />
            </main>
        </div>)
}