define([
	'jquery',
	'underscore',
	'backbone',
	'jqueryUI',
	'jqueryUITouch',
	'common',
	'text!templates/word-item-view.html',
], function ($, _, Backbone, jqueryUI, jqueryUITouch, Common, wordItemViewTemplate) {
	'use strict';

	var wordItemView = Backbone.View.extend({

		tagName:  'div',

		className: 'panel panel-primary word-item draggable ui-widget-content',

		template: _.template(wordItemViewTemplate),

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change', this.render);
			_.bindAll(this, "onDrag", "onDragEnd", "clickWord");
			this.clicked = false;
			this.hasByebye = false;
		},
		
		/**
		 * Handle dragging
		 * @param  {Object} e  event
		 * @param  {Object} ui jQuery.UI
		 * @return {none}
		 */
		onDrag: function(e, ui) {
			if (this.hasByebye) return;
			var offset = ui.position.left;
			if (offset < 0) {
				this.$el.removeClass("panel-primary");
				this.$el.addClass("panel-success");
			} else {
				this.$el.addClass("panel-primary");
				this.$el.removeClass("panel-success");
			}
			var maxWidth = $(document).width();
			var percent = (Math.abs(offset) / maxWidth) / Common.VANISH_SIZE;
			if (percent >= 1) {
				this.hasByebye = true;
				//console.log(this.$el);
				this.$el.draggable("option", "draggable", false);
				var nowProgress = this.model.get("progress");
				if (offset < 0) {
					nowProgress = Common.MAX_RECITE_COUNT;
				} else {
					nowProgress = Math.min(Common.MAX_RECITE_COUNT, nowProgress + 1);
				}
				this.model.set("progress", nowProgress);

				this.model.byebye();
			}
		},

		events: {
			"click .word-item-title": "clickWord"
		},

		clickWord: function(e) {
			if (this.clicked) return;
			this.clicked = true;
			var progress = this.model.get("progress");
			progress = Math.max(progress - Common.PUNISH_COUNT, 0);

			this.model.set("progress", progress);
		},

		/**
		 * Handle drag end
		 * @param  {Object} e  event
		 * @param  {Object} ui jQuery.UI
		 * @return {none}
		 */
		onDragEnd: function(e, ui) {
			this.$el.addClass("panel-primary");
			this.$el.removeClass("panel-success");
		},

		render: function() {
			this.$el.html(this.template(this.model.attributes));
			this.$el.css("opacity", 1 - this.model.get("progress") / Common.MAX_RECITE_COUNT);
			this.$el
			.draggable({
				axis: "x",
				containment: "body",
				scroll: false,
				revert: function(valid) {
			        if (!valid) {
			            $(this).animate({opacity:1}, 'fast').animate(this.originalPosition);
			            return true;
			        }
			        return false;
			    },
				drag: this.onDrag,
				stop: this.onDragEnd,
			});
			return this;
		},

	});

	return wordItemView;
});
