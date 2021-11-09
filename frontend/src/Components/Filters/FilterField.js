import LanguageElementsHandler from "../repository/LanguageElementsHandler";

export default function FilterField(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    props.languageElements,
    props.language
  );

  let filterField;
  let filterType = props.filterType;
  
  if (filterType === undefined && props.options) {
    filterType = "select";
  }
  
  const description=languageElementsHandler.get(`field-${props.fieldName}`);

  switch (filterType) {
    case "date":
      filterField = (
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label className="col-form-label">{description}</label>
          </div>
          <div className="col-3">
            <input
              type="date"
              className="form-control reportFilter"
              data-sql={`${props.fieldName} >= ?`}
              data-comparator={`$gte`}
              data-field={props.fieldName}
            />
          </div>
          <div className="col-1 text-center">-</div>
          <div className="col-3">
            <input
              type="date"
              className="form-control reportFilter"
              data-sql={`${props.fieldName} <= ?(2359)`}
              data-comparator={`$lte`}
              data-field={props.fieldName}
            />
          </div>
        </div>
      );
      break;

    case "select":
      filterField = (
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label className="col-form-label">{description}</label>
          </div>
          <div className="col-3">
            <select
              className="form-select reportFilter"
              aria-label="Default select example"
              data-field={props.fieldName}
            >
              {
              props.options.map((option) => {
                if (typeof(option) === "string") {
                  return <option key={`${props.fieldName}-option-${option}`} >
                    {option}
                    </option>
                }
                if (typeof(option) === "object" && (option.value || option.value === '')) {
                  const key = `field-${props.fieldName}-option-${option.value}`
                  const text = (option.text.substr(0, 4) === '###-') ? languageElementsHandler.get(option.text.substr(4)) : option.text;

                  return <option key={key} value={option.value}>{text}</option>
                }

                return null;
              })
              }
            </select>
          </div>
        </div>
      );

      break;

    default:
      filterField = (
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label className="col-form-label">{description}</label>
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control reportFilter"
              data-sql={`${props.fieldName} like '?%'`}
              data-field={props.fieldName}
            />
          </div>
        </div>
      );
      break;
  }

  return filterField;
}
