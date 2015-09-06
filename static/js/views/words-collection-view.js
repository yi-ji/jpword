define([
	'jquery',
	'underscore',
	'backbone',
	'wordsCollection',
	'wordItemView',
	'text!templates/words-collection-view.html'
], function ($, _, Backbone, WordsCollection, WordItemView, wordsCollectionViewTemplate) {
	'use strict';

	var wordsCollectionView = Backbone.View.extend({

		tagName:  'div',

		className: 'container-fluid',

		// The DOM events specific to an item.
		events: {
		},

		template: _.template(wordsCollectionViewTemplate),

		initialize: function () {
			this.collection = new WordsCollection();
			this.listenTo(this.collection, "remove", this.fetchNewOne);
			this.listenTo(this.collection, "add", this.renderWord);
			this.NewModel = Backbone.Model.extend({urlRoot: "/get_word/"});
			this.NewModels = Backbone.Model.extend({urlRoot: "/get_words/"});
		},

		fetchNewOne: function() {
			var newModel = new this.NewModel();
			var _this = this;
			newModel.fetch()
			.done(function() {
				_this.collection.add(newModel.attributes);
				console.log(newModel.attributes);
			});
		},

		// render word list
	    render: function() {
			this.$el.html(this.template());
			this.$panel = this.$('#words-collection-panel');
	        this.collection.each(function( item ) {
	            this.renderWord( item );
	        }, this );
	        var _this = this;
	        this.collection.fetch({data: {num: 5}})
	        /*
			_.range(4).forEach(function() {
				var newModel = new _this.NewModel();
				newModel.fetch({
					success: function() {
					_this.collection.add(newModel.attributes);
					console.log(newModel.attributes);
					}});
			});
			*/
			return this;
	    },

	    // render a word by creating a word-item-view and appending the
	    // element it renders to the library's element
	    renderWord: function( item ) {
	        var wordView = new WordItemView({
	            model: item
	        });
	        this.$panel.append(wordView.render().el);
	    },

	});

	return wordsCollectionView;
});
