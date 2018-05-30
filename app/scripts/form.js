// JavaScript Document
function finish(target) {
	sendToNew('assets/pdf/sample.pdf');
	document.forms[0].action = target;
	document.forms[0].submit();
}
function sendTo(target) {
	document.forms[0].action = target;
	document.forms[0].submit();
}
function sendToNew(target) {
	//alert(target);
	window.open(target,"resizeable,scrollbar");
}
