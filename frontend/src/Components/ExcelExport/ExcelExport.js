import ExcelExportIcon from './ExcelExport-icon.svg';
import './ExcelExport.scss';
import xlsx from 'xlsx';
import FileSaver from 'file-saver';

export default function ExcelExport(props) {
    function exportToExcel() {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const worksheet = xlsx.utils.json_to_sheet(props.data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, 'excelData'+EXCEL_EXTENSION);
    }

    return (
        <div className='btn-excel-export' onClick={exportToExcel}>
            <img className='ExcelExport-icon' src={ExcelExportIcon} alt='ExcelExport-icon.svg' />
        </div>
    )
}