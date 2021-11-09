import HamMenu from "../../../Components/HamMenu/HamMenu";
import { languageElements } from './TrackingHamMenu-languageElements';

export default function TrackingHamMenu(props) {
    console.log('languageElements', languageElements)
    return (
        <HamMenu
            show={props.show}
            language={props.language}
            languageElements={languageElements}
            menuItems={
                [
                    { itemId: "tracking-system", link: "/tracking/trackingsystem" },
                    { itemId: "yusen-vantage", link: "/tracking/yusenvantage" }
                ]
            } />
    )
}
