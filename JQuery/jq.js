$( function() {
  $( "#tabs" ).tabs();
} );

$( function() {

// There's the gallery and the packageInformation
var $gallery = $( "#gallery" );
var $gallery2 = $( "#gallery2" );
var $gallery3 = $( "#gallery3" );
var $gallery4 = $( "#gallery4" );
var $packageInformation = $( "#packageInformation" );

// Let the gallery items be draggable
$( "li", $gallery ).draggable({
  cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  revert: "invalid", // when not dropped, the item will revert back to its initial position
  containment: "document",
  helper: "clone",
  cursor: "move"
});
$( "li", $gallery2 ).draggable({
  cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  revert: "invalid", // when not dropped, the item will revert back to its initial position
  containment: "document",
  helper: "clone",
  cursor: "move"
});
$( "li", $gallery3 ).draggable({
  cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  revert: "invalid", // when not dropped, the item will revert back to its initial position
  containment: "document",
  helper: "clone",
  cursor: "move"
});
$( "li", $gallery4 ).draggable({
  cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  revert: "invalid", // when not dropped, the item will revert back to its initial position
  containment: "document",
  helper: "clone",
  cursor: "move"
});

// Let the packageInformation be droppable, accepting the gallery items
$packageInformation.droppable({
  accept: "#gallery > li, #gallery2 > li, #gallery3 > li, #gallery4 > li",
  classes: {
    "ui-droppable-active": "ui-state-highlight"
  },
  drop: function( event, ui ) {
    addOffer( ui.draggable );
  }
});

// Let the gallery be droppable as well, accepting items from the packageInformation
$gallery.droppable({
  accept: "#packageInformation li",
  classes: {
    "ui-droppable-active": "custom-state-active"
  },
  drop: function( event, ui ) {
    removeOffer( ui.draggable );
  }
});

// Image deletion function
var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Remove this offer' class='ui-icon ui-icon-refresh'></a>";
function addOffer( $item ) {
  $item.fadeOut(function() {
    var $list = $( "ul", $packageInformation ).length ?
      $( "ul", $packageInformation ) :
      $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $packageInformation );

    $item.find( "a.ui-icon-packageInformation" ).remove();
    $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
      $item
        .animate({ height: "75px" })
        .find( "img" )
          .animate({ height: "40px" });
    });
  });
}

// Image recycle function
var packageInformation_icon = "<a href='link/to/packageInformation/script/when/we/have/js/off' title='Add this offer' class='ui-icon ui-icon-packageInformation'></a>";
function removeOffer( $item ) {
  $item.fadeOut(function() {
    $item
      .find( "a.ui-icon-refresh" )
        .remove()
      .end()
      .css( "width", "200px")
      .css( "height", "200px")
      .append( packageInformation_icon )
      .find( "img" )
        .css( "height", "150px" )
      .end()
      .appendTo( $gallery )
      .fadeIn();
  });
}

// Resolve the icons behavior with event delegation
$( "ul.gallery > li" ).on( "click", function( event ) {
  var $item = $( this ),
    $target = $( event.target );

  if ( $target.is( "a.ui-icon-packageInformation" ) ) {
    addOffer( $item );
  } else if ( $target.is( "a.ui-icon-refresh" ) ) {
    removeOffer( $item );
  }

  return false;
});
} );