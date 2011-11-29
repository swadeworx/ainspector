with (FBL) {

  var ainspectorUtil = {
    onShowImagesCommand : function (e) {


	  var images_cache = OAA_CI.evaluation.dom_cache.images_cache;
	  images_cache.sortImageElements('document_order', true);

	  var image_elements = images_cache.image_elements;
	  OAA_CI.populateTreeAsFlatList(image_elements, 'ID_TREECHILDREN_IMAGES');

	};	  
  };
};