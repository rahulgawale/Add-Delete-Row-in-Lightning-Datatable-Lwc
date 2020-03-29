
import { LightningElement, track, api } from 'lwc';

export default class AddDelDatatable extends LightningElement {
    @track _columns = [];
    @track _data = [];
    @track _inputcolumns;

    @api
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = value;
        if (value) {
            let tempcols = [...value];
            tempcols.push({ type: 'button-icon', typeAttributes: { iconName: 'utility:delete', name: 'delete', iconClass: 'slds-icon-text-error' }, fixedWidth: 50 });
            tempcols.push({ type: 'button-icon', typeAttributes: { iconName: 'utility:edit', name: 'edit' }, fixedWidth: 50 });
            this._columns = tempcols;
            
            let colData = JSON.parse(JSON.stringify(value))
            colData = colData.filter(column => column.fieldName);
            colData.forEach(element => {
                if (this.tempRow.hasOwnProperty(element.fieldName)) {
                    element.displayValue = this.tempRow[element.fieldName];
                }
            });
            this._inputcolumns = colData;
        }
    }

    @api
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    @track showModal;
    @track tempRow = {};
    editMode = false;

    handleRowAction(event) {
        if (event.detail.action.name === 'delete') {
            this.deleteSelectedRow(event.detail.row);
        } else if (event.detail.action.name === 'edit') {
            this.editMode = true;
            this.openEditForm(event.detail.row);
        }
    }

    handleInputChange(event) {
        this.tempRow[event.target.name] = event.target.value;
    }

    deleteSelectedRow(deleteRow) {
        let newData = JSON.parse(JSON.stringify(this._data));
        newData = newData.filter(row => row.uid !== deleteRow.uid);

        // recalculate uids
        newData.forEach((element, index) => element.uid = index + 1);
        this._data = newData;
    }

    handleCancel() {
        this.tempRow = {};
        this.showModal = false;
        this.editMode = false;
        this.editindex = undefined;
    }

    handleAddRow() {
        this.tempRow = {};
        // refresh inputcolumn
        let tempinput = [...this._inputcolumns];
        tempinput.forEach(element => element.displayValue = undefined);
        this._inputcolumns = tempinput;
        this.showModal = true;
    }

    handleSave() {
        const allValid = [...this.template.querySelectorAll(`lightning-input`)]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);

        if (!allValid) {
            return;
        }

        let newData = JSON.parse(JSON.stringify(this._data));
        if (!this.editMode) {
            // you can use any unique and required field instead of 'uid'.
            //calculate ui
            this.tempRow.uid = this._data.length + 1;
            newData.push(this.tempRow);
        } else {
            newData[this.editindex] = this.tempRow;
            this.editindex = undefined;
            this.editMode = false;
        }
        this._data = newData;
        this.tempRow = {};
        this.showModal = false;
    }

    openEditForm(editRow) {
        this.editindex = this._data.findIndex(row => row.uid === editRow.uid);
        this.tempRow = { ...this._data[this.editindex] };
        this._inputcolumns.forEach(element => element.displayValue = this.tempRow[element.fieldName]);
        this.showModal = true;
    }
}
