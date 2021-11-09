import FilterField from "./FilterField";

export default function Filters(props) {
  const selectedFilters = props?.reportParams?.selectedFilters;
  if (!selectedFilters) {
    return <div></div>;
  }

  const filters = selectedFilters.map((fieldName) => {
    const column = props.reportParams.columns.find((column) => {
      return column.field === fieldName;
    });
    const filterField = {
      fieldName,
      filterType: column.type,
      options: column.options,
    };
    return filterField;
  });

  return (
    <div>
      {filters.map((filterField) => {
        return (
          <FilterField
            key={`filter-${filterField.fieldName}`}
            fieldName={filterField.fieldName}
            filterType={filterField.filterType}
            options={filterField.options}
            language={props.language}
            languageElements={props.languageElements}
          />
        );
      })}
    </div>
  );
}
