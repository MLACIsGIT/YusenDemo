import { useState } from 'react'
import { Redirect } from "react-router-dom"
import "./PageTrackingSystem.scss"
import HeaderLine from "../../../Components/HeaderLine/HeaderLine"
import TrackingHamMenu from "../TrackingHamMenu/TrackingHamMenu"
import Infobox from "../../../Components/Infobox/Infobox";
import TrackingSystem from "./TrackingSystem/TrackingSystem"

export default function PageTrackingSystem(props) {
    const [hamShowed, showHam] = useState(false)

    function onHamClicked() {
        showHam(!hamShowed);
    }

    if (props.loginData.user === null) {
        return (
            <Redirect to="/" />
        )
    }

    const infobox =
        <TrackingSystem
            language={props.language}
        />

    return (
        <div className="page-tracking-system">
            <HeaderLine
                language={props.language}
                selectedPage={"tracking-system"}
                loginData={props.loginData}
                onHamClicked={onHamClicked}
            />

            <article>
                <aside>
                    <TrackingHamMenu
                        show={hamShowed}
                        language={props.language}
                    />
                </aside>
                <main>
                    <Infobox
                        left={"150px"}
                        top={"50px"}
                        info={infobox}
                    />
                </main>

            </article>

        </div>
    )
}
