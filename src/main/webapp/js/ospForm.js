/*
 *
 *   OSP - Operation Support Platform
 *
 */

$(document).ready(function()
{

});

// Use this instead of document.ready, beacuse it is later than the bootstrap
// table element is ready...
$(window).load(function()
{

});

function goAdd(ele)
{

	var listName = $(ele).attr('listName');
	var displayName = $(ele).attr('displayName');
	var embedded = $(ele).attr('embedded');
	embedded = embedded == "true";

	goForm(listName, displayName, "Add", embedded);
}

function goEdit(ele, param)
{

	var listName = $(ele).attr('listName');
	var displayName = $(ele).attr('displayName');
	var embedded = $(ele).attr('embedded');
	var itemId = $(ele).attr('itemId');

	embedded = embedded == "true";

	goForm(listName, displayName, "Edit", embedded, "id=" + itemId);
}

function goForm(listName, displayName, action, embedded, param)
{

	var url = ctxRoot + "/" + listName + "/" + action.toLowerCase() + ".html";

	if (param) {
		url = url + "?" + param;
	}

	var title = action + " " + displayName;

	if (embedded) {
		$.getData(url, function(data)
		{

			var layer = $('body').data('fv_open_modals');

			if (layer == 2) {
				modal2.setModal(title, data);
				modal2.showModal();

			} else {
				modal.setModal(title, data);
				modal.showModal();
			}

		});
	} else {
		if (url.indexOf("?") != -1) {
			location.href = url + "&source=" + getUrlWithSearchCriteria(true);
		} else {
			location.href = url + "?source=" + getUrlWithSearchCriteria(true);
		}
	}
}

function submitForm(ele, extraParam)
{

	// validate
	if (!$('#myForm').valid()) {
		return;
	}

	var listName = $(ele).attr('listName');
	var displayName = $(ele).attr('displayName');

	var id = $('[name=id]').val();
	var action = "";
	if (id && id.trim()) {
		action = "edit";
	} else {
		action = "add";
	}

	var url = ctxRoot + "/" + listName + "/" + action + "Submit.html";
	if (extraParam) {
		url += "?" + extraParam;
	}

	var listUrl = ctxRoot + "/" + listName + "/list.html";

	blockUI();
	$.postData(url, $('#myForm').serialize(), function(data)
	{
		unblockUI();
		BootstrapDialog.show({
			message : displayName + " Saved",
			onhide : function()
			{

				switchInModalAction($('#myForm'), reloadWithCriteria, function()
				{
					redirectOptionSource(listUrl);
				});

			}
		});

	});

}

function display(ele)
{

	var listName = $(ele).attr('listName');
	var displayName = $(ele).attr('displayName');
	var itemId = $(ele).attr('itemId');

	var url = ctxRoot + "/" + listName + "/display.html?id=" + itemId;
	var title = displayName + ' Information';

	$.postData(url, "", function(data)
	{

		var layer1Open = (modal.modal.data('bs.modal') || {}).isShown;
		
		if(!layer1Open){
			
		
			modal.setModal(title, data);
			modal.showModal();
			modal.on('hidden.bs.modal', function()
			{
			});
		} else {
			modal2.setModal(title, data);
			modal2.showModal();
			modal2.on('hidden.bs.modal', function()
			{
			});
		}

	});

}

function deleteItem(ele)
{
	var listName = $(ele).attr('listName');
	var displayName = $(ele).attr('displayName');
	var itemId = $(ele).attr('itemId');

	var url = ctxRoot + "/" + listName + "/delete.html?id=" + itemId;
	BootstrapDialog.confirm('Are you sure to delete this ' + displayName + '?', function(result)
	{
		if (result) {
			blockUI();
			$.postData(url, "", function(data)
			{
				debugger;
				BootstrapDialog.show({
					message : displayName + " deleted",
					onhide : function()
					{
						reloadWithCriteria();
					}
				});
			});

		}
	});

}
