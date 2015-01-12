var LayoutView = require('lib/config/layout-view');
var _ = require('underscore');

module.exports = LayoutView.extend({
  template: '#tmpl-modal',
  className: 'modal',
  attributes: {
    'tabindex' : -1,
    'role' : 'dialog'
  },

  regions: {
    content: '.modal-body'
  },

  events: {
    'click .action-close'   : 'destroyModal',
    'click .action-save'    : 'saving',
    'click .modal-footer a' : 'onButtonClick'
  },

  initialize: function () {
    this.$el.modal({ show: false });
  },

  onButtonClick: function(e) {
    e.preventDefault();
    this.content.currentView.trigger('button:clicked', e);
  },

  triggers: {
    'show.bs.modal'   : { preventDefault: false, event: 'before:show' },
    'shown.bs.modal'  : { preventDefault: false, event: 'show' },
    'hide.bs.modal'   : { preventDefault: false, event: 'before:hide' },
    'hidden.bs.modal' : { preventDefault: false, event: 'hide' }
  },

  openModal: function (options) {
    options = options || {};
    this.once('after:show', options.callback); // 'after:show' = 'show' ??
    this.setupModal(options);
    this.$el.modal('show');
  },

  destroyModal: function (options) {
    options = options || {};
    this.once('hide', options.callback);
    this.once('hide', this.teardownModal);
    this.$el.modal('hide');
  },

  setupModal: function (options) {
    options = options || {};
    if (this.isShown) {
      this.teardownModal();
    }

    // pass on attributes
    if( options.attributes ){

      // modal class
      if( options.attributes.className ){
        this.$('.modal-dialog').addClass( options.attributes.className );
      }

      // modal title
      if( options.attributes.title ) {
        this.$('.modal-header h1').html( options.attributes.title );
      }
    }

    this.content.show(options.view);
    this.isShown = true;

    if( options.view.model ) {
      this.listenTo( options.view.model, 'save:status', this.updateSaveStatus );
    }

  },

  teardownModal: function () {
    if (!this.isShown) {
      return;
    }
    this.content.empty();
    this.render(); // re-render to reset attributes
    this.isShown = false;
  },

  saving: function(){
    this.$('.modal-footer .action-save')
        .addClass( 'disabled' );

    this.$('.modal-footer p.response')
        .removeClass('success error')
        .html( '<i class="icon icon-spinner"></i>' );
  },

  updateSaveStatus: function( status, message ){
    if( _.isUndefined(message) ){
      message = this.$('.modal-footer p.response').data(status);
    }

    this.$('.modal-footer p.response')
        .addClass(status)
        .html( '<i class="icon icon-' + status + '"></i> ' + message );

    this.$('.modal-footer .action-save')
        .removeClass( 'disabled' );
  }

});