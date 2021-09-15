# Add-Delete-Row-in-Lightning-Datatable-Lwc

Simple LWC application to demonstrate the add, delete row to/from a lightning-data-table. Modal form to add a row in data-table. Open 'Edit' modal in Lightning Datatable, Delete Row Datatable, Add Row Datatable.

## Live playground example

[Check out live example here](https://webcomponents.dev/edit/bkuc3TLe8cY4xJcoaleS/src/app.html)

## Steps to use the Component.

1. Create a new web component with the name addDelDatatable.
2. Copy and paste the code from addDelDatatable to your component's respective files addDelDatatable.js, addDelDatatable.html, addDelDatatable.css.
3. Use the below example code to implement the table. Replace the `Example` class name in JS with your desired parent component class name.

#### Sample JS Code

```
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
}
```

#### Sample HTML Markup

```
<template>
    <lightning-button variant="brand" label="Get Data in Parent" title="Get Data in Parent" onclick={handleGetData} class="slds-m-left_x-small"></lightning-button>
    <c-add-del-datatable columns={cols} data={data}></c-add-del-datatable>
</template>
```

#### How to Get the table data in parent component.

Use below method to get updated table data from the `addDelDatatable` component into its parent.

```
handleGetData() {
    let dataFromChild = this.template.querySelector('c-add-del-datatable').data;
    console.log(`Got ${dataFromChild.length} record/s from the Child Component!`);
    console.log('data from child =>' + JSON.stringify(dataFromChild));
}
```
