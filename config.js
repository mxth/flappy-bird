require.config({
    baseUrl: './',
    paths: {
        phaser: 'phaser.min'
    },
    shim: {
        phaser: {
            exports: 'Phaser'
        }
    }
});
