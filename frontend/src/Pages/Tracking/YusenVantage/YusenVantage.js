import { Redirect } from "react-router-dom";

export default function YusenVantage(props) {
  if (props.loginData.user === null) {
    return <Redirect to="/" />;
  }

  window.open(`https://rt.yusen-logistics.com/yusenvantagefocus/auth/login`);
  return <Redirect to="/tracking" />;
}
