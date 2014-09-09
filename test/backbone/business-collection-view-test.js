'use strict';

/* jshint expr: true */

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Backbone = require('backbone');

var BusinessCollectionView = require('../../app/js/views/business-collection-view');
var BusinessCollection = require('../../app/js/collections/business-collection');

describe('Backbone Business Collection View', function() {
  before(function(done) {
    sinon.spy(BusinessCollectionView.prototype, 'render');
    sinon.spy(BusinessCollectionView.prototype, 'addAll');
    sinon.spy(BusinessCollectionView.prototype, 'addOne');

    this.collection = new BusinessCollection();
    this.collectionView = new BusinessCollectionView({ collection: this.collection });
    done();
  });

  it('should call render on creation', function(done) {
    expect(BusinessCollectionView.prototype.render.called).to.be.true;
    done();
  });

  it('should have called addAll on render', function(done) {
    expect(BusinessCollectionView.prototype.addAll.calledOnce).to.be.true;
    done();
  });

  it('should call addOne on an add event', function(done) {
    this.collection.trigger('add', Backbone.Model.extend({}));
    expect(BusinessCollectionView.prototype.addOne.calledOnce).to.be.true;
    done();
  });

  it('should call addAll on a reset event', function(done) {
    this.collection.trigger('reset', Backbone.Model.extend({}));
    expect(BusinessCollectionView.prototype.addAll.calledTwice).to.be.true;
    done();
  });

  it('should not have a blank $el', function(done) {
    expect(this.collectionView.el).to.not.eql('');
    done();
  });

  after(function(done) {
    BusinessCollectionView.prototype.render.restore();
    done();
  });
});
