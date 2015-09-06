define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var WordItem = Backbone.Model.extend({
		// Default attributes for the WordItem
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			word: '先生',
			progress: 0,
			meaning: 'hentai',
			pronoun: 'せんせい',
			tune: 0,
		},

		idAttribute: 'word',

		byebye: function() {
			var _this = this;
			this.save(undefined, {
				success: function() {
					_this.trigger("destroy", _this);
				},
				error: function(a, b, c) {
					_this.trigger("destroy", _this);
					console.log("NOT BYEBYE");
					console.log(_this.attributes);
				},
			});
		},

		url: "/set_word/",
	});

	return WordItem;
});
