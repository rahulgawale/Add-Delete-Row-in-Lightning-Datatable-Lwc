import {LightningElement, track} from "lwc";
const OPTIONS = [
	{label: "New Customer", value: "New Customer"},
	{label: "Old Customer", value: "Old Customer"},
	{label: "Partner", value: "Partner"},
];
export default class Example extends LightningElement {
	cols = [
		{label: "Name", fieldName: "name", required: true},
		{label: "Phone", fieldName: "phone", type: "phone", formPlaceholder: "+123.."},
		{label: "Type", fieldName: "type", type: "text", isPicklist: true, options: OPTIONS},
	];

	@track data = [
		{uid: 1, name: "Rahul", phone: "1234567890", type: "New Customer"},
		{uid: 2, name: "Arnav", phone: "1112223334", type: "Existing Customer"},
	];

	handleGetData() {
		let dataFromChild = this.template.querySelector("c-add-del-datatable").data;
		console.log(`Got ${dataFromChild.length} record/s from the Child Component!`);
		console.log("data from child =>" + JSON.stringify(dataFromChild));
	}
}
