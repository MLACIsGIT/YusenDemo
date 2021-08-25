import "./FormBorder.scss";
import headerLogo from "./headerLogo.svg";

export default function FormBorder(props) {
    return (
        <div className="form-border">
            <div className="form-border-article">

                <div className="form-border-header">
                    <div className="logo-area">
                        <img className="header-logo" src={headerLogo} height="50px" alt="logo" />
                    </div>
                </div>
                <div className="form-border-main">
                    {props.form}
                </div>
            </div>
        </div>
    )
}