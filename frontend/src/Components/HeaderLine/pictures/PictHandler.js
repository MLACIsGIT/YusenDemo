import home from "./home.svg";
import home_selected from "./home_selected.svg";
import invoices from "./invoices.svg";
import invoices_selected from "./invoices_selected.svg";
import stocks from "./stocks.svg";
import stocks_selected from "./stocks_selected.svg";
import tracking from "./tracking.svg";
import tracking_selected from "./tracking_selected.svg";
import settings from "./settings.svg";
import settings_selected from "./settings_selected.svg";
import contact from "./contact.svg";
import contact_selected from "./contact_selected.svg";

export default function PictHandler(props) {
    let img

    switch (props.pictureCode) {
        case "home":
            img = <img src={home} alt="home" />
            break;

        case "invoices":
            img = <img src={invoices} alt="invoices" />
            break;

        case "stocks":
            img = <img src={stocks} alt="stocks" />
            break;

        case "tracking":
            img = <img src={tracking} alt="tracking" />
            break;

        case "settings":
            img = <img src={settings} alt="settings" />
            break;

        case "contact":
            img = <img src={contact} alt="contact" />
            break;

        case "home_selected":
            img = <img src={home_selected} alt="home_selected" />
            break;

        case "invoices_selected":
            img = <img src={invoices_selected} alt="invoices_selected" />
            break;

        case "stocks_selected":
            img = <img src={stocks_selected} alt="stocks_selected" />
            break;

        case "tracking_selected":
            img = <img src={tracking_selected} alt="tracking_selected" />
            break;

        case "settings_selected":
            img = <img src={settings_selected} alt="settings_selected" />
            break;

        case "contact_selected":
            img = <img src={contact_selected} alt="contact_selected" />
            break;

        default:
            img = <span>{`PictHandler: Unknown pictureCode: ${props.pictureCode}`}</span>
            break;
    }
    return img
}