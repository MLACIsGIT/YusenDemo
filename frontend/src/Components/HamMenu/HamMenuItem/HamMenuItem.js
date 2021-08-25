import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './HamMenuItem.scss';
import LanguageElementsHandler from  '../../repository/LanguageElementsHandler';

export default function HamMenuItem({ language, languageElements, itemId, isSelected, link }) {
    const [redirected, setRedirected] = useState('');

    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        language
      );
    
    if (redirected) {
        return (
            <Redirect to={redirected} />
        )
    }

    function onMenuItemClicked() {
        setRedirected(link);
    }

    return (
        <div id={itemId} className={`hamMenuItem ${(isSelected) ? 'selected' : ''}`} onClick={onMenuItemClicked}>
            <div className='textArea'>
                <div className='title'>
                    <h4>{languageElementsHandler.get(`${itemId}-title`)}</h4>
                </div>
                <div className='descr'>
                    <h6>{languageElementsHandler.get(`${itemId}-descr`)}</h6>
                </div>
            </div>
        </div>
    )
}