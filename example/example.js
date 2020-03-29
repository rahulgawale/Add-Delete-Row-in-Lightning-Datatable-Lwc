import { LightningElement, track } from 'lwc';

export default class Example extends LightningElement {
    cols = [
        { label: 'Name', fieldName: 'name', required: true },
        { label: 'Phone', fieldName: 'phone', type: 'phone' },
    ];

    @track data = [
        { uid: 1, name: 'Rahul', phone: '1234567890' },
        { uid: 2, name: 'Arnav', phone: '1112223334' }
    ];

    handleGetData() {
        let datafromchild = this.template.querySelector('c-add-del-datatable').data;
        console.log(`Got ${datafromchild.length} record/s from the Child Component!`);
        console.log('data from child =>' + JSON.stringify(datafromchild));
    }
}