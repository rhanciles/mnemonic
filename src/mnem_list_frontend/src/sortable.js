// $(document).ready(function () {
//   $("#sortable").sortable();
//   $("#sortable").disableSelection();
// });

$(document).ready(".selector").sortable({
  appendTo: document.body,
});

// Getter
var appendTo = $(".selector").sortable("option", "appendTo");

// Setter
$(".selector").sortable("option", "appendTo", document.body);
