define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login-register-view.html'
], function ($, _, Backbone, loginRegisterViewTemplate) {
	'use strict';

	var loginRegisterView = Backbone.View.extend({

		tagName:  'div',

		className: 'container-fluid',

		// The DOM events specific to an item.
		events: {
            "click #login-button": "login",
            "click #register-button": "register",
		},

		template: _.template(loginRegisterViewTemplate),

		initialize: function () {
            this.render();
		},

        getUserNameAndPwd: function() {
            return {
                username: this.$username.val(),
                password: this.$password.val(),
            };
        },

        login: function() {
            var info = this.getUserNameAndPwd();
            var _this = this;
            var login = $.ajax({
                url : '/login/',
                data : info,
                type : 'POST',
            });
            login.done(function(response) {
                response = JSON.parse(response);
                if (response.ok) {
                    Backbone.history.navigate('jpwords', { trigger : true });
                } else {
                    _this.$loginInfo.text(response.msg);
                }
            });
            login.fail(function(response){
                console.warn(response);
            });
        },

        register: function() {
            var info = this.getUserNameAndPwd();
            var _this = this;
            var register = $.ajax({
                url : '/register/',
                data : info,
                type : 'POST',
            });
            register.done(function(response) {
                response = JSON.parse(response);
                _this.$loginInfo.text(response.msg);
            });
            register.fail(function(response){
                console.warn(response);
            });
        },

		// render word list
	    render: function() {
			this.$el.html(this.template());
            this.$username = this.$("#username-input");
            this.$password = this.$("#password-input");
            this.$loginInfo = this.$("#login-info");
            return this;
	    },

	});

	return loginRegisterView;
});
