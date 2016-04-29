var catalog = require("./main.json");

var page = new tabris.Page({
    title: "Pongalo",
    topLevel: true
});

var tabFolder = new tabris.TabFolder({
    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
    paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

var createTab = function(title, image) {
    var tab = new tabris.Tab({
        title: title, // converted to upper-case on Android
        image: {src: image, scale: 2}
    }).appendTo(tabFolder);


    new tabris.CollectionView({
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        items: catalog.heroItems,
        itemHeight: 256,
        initializeCell: function(cell) {
            var imageView = new tabris.ImageView({
                layoutData: {top: 16, centerX: 0, width: 200, height: 200}
            }).appendTo(cell);
            var nameTextView = new tabris.TextView({
                layoutData: {left: 30, top: [imageView, 16], right: 30},
                alignment: "center"
            }).appendTo(cell);
            cell.on("change:item", function(widget, item) {
                imageView.set("image", {src: 'https://pongalo.imgix.net/' + item.mediaKey + '/' + item.mediaKey+'_landscape.jpg'});
                nameTextView.set("text", item.title);
            });
        }
    }).on("select", function(target, value) {
        console.log("selected", value.title);
    }).appendTo(tab);

};

createTab("Featured", "images/cart.png");
createTab("Popular", "images/card.png");
createTab("Categories", "images/chart.png");

page.open();

tabFolder.on("change:selection", function(widget, tab) {
    console.log(tab.get("title"));
});

