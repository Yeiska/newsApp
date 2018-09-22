function shownote(event) {
	event.preventDefault();
	var id = $(this).attr("value");
	$("#addnote").fadeIn(300).css("display", "flex");
	$("#add-note").attr("value", id);
	$.get("/" + id, function(data) {
		$("#article-title").text(data.title);
		$.get("/note/" + id, function(data) {
			if (data) {
				$("#note-title").val(data.title);
				$("#note-body").val(data.body);
			}
		});
	});

}

function addnote(event) {
	event.preventDefault();
	var id = $(this).attr("value");
	var obj = {
		title: $("#note-title").val().trim(),
		body: $("#note-body").val().trim()
	};
	$.post("/note/" + id, obj, function(data) {
		window.location.href = "/saved";
	});
}

function changestatus() {
	var status = $(this).attr("value");
	if (status === "Saved") {
		$(this).html("Unsave");
	}
};

function changeback() {
	$(this).html($(this).attr("value"));
}

$(document).on("click", ".addnote-button", shownote);
$(document).on("click", "#add-note", addnote);
$(".status").hover(changestatus, changeback);
$("#close-note").on("click", function() {
	$("#addnote").fadeOut(300);
});

// When you click the save
$(document).on("click", "#save", function() {
  // Grab the id associated with the article from the ssve button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: (require.body.title).val(),
      // Value taken from note textarea
      body: (require.body.body).val(),
      summary: (require.body.summary).val(),
      img: (require.body.img).val()
    }
  })
    // With that done
    .then(function(data) {
      $.post("/article/" + id, obj, function(data) {
        window.location.href = "/saved";
      });
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#summaryinput").val("");
  $("#img").val("");
});
