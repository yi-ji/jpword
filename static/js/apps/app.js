define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text!templates/word-app.html'
], function ($, _, Backbone, Bootstrap, wordAppTemplate) {
	'use strict';

	// AppView is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		el: '#wordapp',

		// Compile our template
		template: _.template(wordAppTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
		},

		initialize: function () {
			this.render();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			this.$el.html(this.template());
			this.$main = this.$('#main');
			this.currentMainView = null;
		},

		showMainView: function(view) {
			if (this.currentMainView) {
				this.currentMainView.remove();
			}
			this.currentMainView = view;
			this.$main.html(this.currentMainView.render().el);
			$('a[data-target="#about-modal"]').on('click', function(event) { event.stopPropagation(); event.preventDefault(); $('#about-modal').modal('show'); });
		}
	});

	return AppView;
});
