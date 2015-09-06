/*global define*/
define([
	'jquery',
	'backbone',
	'wordsCollectionView',
	'loginRegisterView',
], function ($, Backbone, WordsCollectionView, LoginRegisterView) {
	'use strict';
	var router = Backbone.Router.extend({
		routes: {
			'jpwords': 'showWordsPage',
			'login': 'showLoginPage',
			'*default': 'showLoginPage',
		},

		initialize: function(options) {
			this.appView = options.appView;
		},

		showWordsPage: function() {
			var wordsCollectionView = new WordsCollectionView();
			this.appView.showMainView(wordsCollectionView);
		},

		showLoginPage: function() {
			var loginRegisterView = new LoginRegisterView();
			this.appView.showMainView(loginRegisterView);
		},

	});

	return router;
});
