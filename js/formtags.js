$(document).ready(function() {
    $("#myTags").tagit({
      fieldName: "skills",
      // This will make Tag-it submit a single form value, as a comma-delimited field.
      singleField: true,
      singleFieldNode: $('#skills'),
      caseSensitive: false,
      availableTags: ['android', 'java','android.graphics','android.music'],
      allowSpaces: true,
    });
});
