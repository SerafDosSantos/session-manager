(function(){ "use strict";

/*** opening ***/
$("select").each(function(){
	$(this)
		.append('<option value="click">click</option>')
		.append('<option value="shift+click">shift+click</option>')
		.append('<option value="ctrl/cmd+click">ctrl/cmd+click</option>')
		.append('<option value="alt+click">alt+click</option>')
		.find("option[value='" + JSON.parse(localStorage.open)[this.id.split("-")[1]] + "']").prop("selected", true);
}).change(function(){
	var open = JSON.parse(localStorage.open);
	open[this.id.split("-")[1]] = this.value;
	localStorage.open = JSON.stringify(open);
});


/*** pinned tabs ***/
$("[name='pinned-save']").change(function(){
	localStorage.pinned = this.value;
}).filter("[value='" + localStorage.pinned + "']").prop("checked", true);

$("#pinned-noreplace").change(function(){
	if (this.checked) {
		localStorage.noreplacingpinned = true;
	} else {
		delete localStorage.noreplacingpinned;
	}
}).prop("checked", localStorage.noreplacingpinned === "true");


/*** sync ***/
$("#sync-enabled").change(function(){
	var self = this, checked = self.checked;
	
	chrome.permissions[checked ? "request" : "remove"]({
		permissions: ["storage"]
	}, function(changed){
		self.checked = (checked && !changed) || (!checked && changed);
	});
});

chrome.permissions.contains({
	permissions: ["storage"]
}, function(has){
	$("#sync-enabled").prop("checked", has);
});


/*** etc ***/
chrome.extension.getBackgroundPage()._gaq.push(["_trackPageview", "/options"]);

})();