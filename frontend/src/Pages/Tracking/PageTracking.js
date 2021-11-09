import { useState } from 'react'
import { Redirect } from "react-router-dom";
import HeaderLine from "../../Components/HeaderLine/HeaderLine";
import TrackingHamMenu from "./TrackingHamMenu/TrackingHamMenu";

export default function PageTrackingSubMenu(props) {
    const [hamShowed, showHam] = useState(true)

    function onHamClicked() {
        showHam(!hamShowed);
    }

    if (!props.loginData) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="page-tracking">
            <HeaderLine
                language={props.language}
                selectedPage={"tracking"}
                loginData={props.loginData}
                onHamClicked={onHamClicked}
            />

            <main>
                <aside>
                    <TrackingHamMenu
                        show={hamShowed}
                        language={props.language}
                    />
                </aside>
            </main>
        </div>
    )
}