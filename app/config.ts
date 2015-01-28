require.config({

  baseUrl: './',

  paths: {
    phaser: '../bower_components/phaser/build/phaser'
  },

  shim: {
    phaser: {
      exports: 'Phaser'
    }
  }

});