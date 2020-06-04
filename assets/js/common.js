function doGet(url, success_func, error_func) {
    var result = null;
    
    $.get(
                url,
                function (data) {
                            result = data;
                }
    )
    .success(function() {
        if (typeof success_func === 'function') {
            success_func.apply(this, [result]);
        }
    })
    .error(function() {
        if (typeof error_func === 'function') {
            error_func.apply(this, [result]);
        }
    }); 
}

function simpleDoGet(url, field) {
    var result = null;
    
    $.get(
                url,
                function (data) {
                            result = data;
                }
    )
    .success(function() {
        $("#" + field).val(result);
        return false;
    })
    .error(function() {
        alert("Something went wrong");
    }); 
    
    return false;
}

function isEmpty(value) {
    //Undefined or null
    if (typeof (value) === 'undefined'
            || value === null) {
        return true;
    }

    //Arrays && Strings
    if (typeof (value.length) !== 'undefined') {
        return value.length === 0;
    }

    //Numbers or boolean
    if (typeof (value) === 'number'
            || typeof (value) === 'boolean') {
        return false;
    }

    //Objects
    var count = 0;

    for (var i in value) {
        if (value.hasOwnProperty(i)) {
            count++;
        }
    }

    return count === 0;
}

function openModalRemoteContent(url, title, close_btn_url, close_btn_modal_title) {
    var $modal = $('#ajax-modal');
    
    doGet(url, function(data) {
       if (data.indexOf('class="modal-content"') === -1) {
           var prep = '<div class="modal-dialog modal-lg" role="document">';
           prep += '<div class="modal-content">';
           
           if (title) {
               prep += '<div class="modal-header">';
               prep += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
               prep += '<h4 class="modal-title">';
               prep += title;
               prep += '</h4>';
               prep += '</div>';
           }
           
           prep += '<div class="modal-body">';
           prep += data;
           prep += '</div>';
           
           if (close_btn_url) {
               prep += '<div class="modal-footer">';
               prep += '<button type="button" class="btn btn-default" onclick="openModalRemoteContent(\'' + close_btn_url + '\', \'' + close_btn_modal_title + '\')">Close</button>';
               prep += '</div>';
           }
           
           prep += '</div>';
           prep += '</div>';
           
           data = prep;
       } 
       
       $modal.html(data).modal();
    });
}
