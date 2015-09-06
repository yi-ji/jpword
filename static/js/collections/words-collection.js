define([
	'underscore',
	'backbone',
	'wordItem'
], function (_, Backbone, WordItem) {
	'use strict';

	var WordsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: WordItem,
		
		url: '/get_word/',
	});

	return WordsCollection;
});
