Pure Js Lightbox Library

Why do you need this?

	This is ligthbox made in pure javascript and CSS. Very usefull if you developing mobile web application and you want to make your app extremely fast.

How to use?

	1. Inlude css and js source to you code, like this:
	<link rel="stylesheet" href="{{YOUR_PATH}}/pure-js-lightbox.min.css">
	<script src="{{YOUR_PATH}}/pure-js-lightbox.min.js"></script>

	Include the js source BEFORE you use it.
	
	2. Now create a LIST, add class "pure-js-lightbox-container" to the list. Example:

	<ul class="pure-js-lightbox-container">
      <li><a href="../img/img_1.jpg"><img src="../img/img_1.jpg"/></a></li>
      <li><a href="../img/img_2.jpg"><img src="../img/img_2.jpg"/></a></li>
      <li><a href="../img/img_3.jpg"><img src="../img/img_3.jpg"/></a></li>
      <li><a href="../img/img_4.jpg"><img src="../img/img_4.jpg"/></a></li>
      <li><a href="../img/img_5.jpg"><img src="../img/img_5.jpg"/></a></li>
      <li><a href="../img/img_6.jpg"><img src="../img/img_6.jpg"/></a></li>
    </ul>

    Where <a> href is the image for the lightbox view and <img> src is for regular view inside your page layout. You can use different images here, for example if you want your images to be in better quality when opening the lightbox, and use a small images for the page payout.

    IMPORTANT: 
    	You MUST use a tag <a> with href to the image you want to see in a lightbox when clicking on the image.

    3. Include this code to instantiate the library:
    	var lightbox = new pureJSLightBox();

Options
	You can pass an object with custom options to the pureJSLightBox constructor.
	Custom options:

	overlay - pass value is boolean. Default value is true. Defines if the overlay is visible.

	navigation - pass values is boolean. Default value is true. Defines if the navigation arrows is visible.

	swipe - pass values is boolean. Default value is true. Defines if swipe detect is enabled. Good for mobile browser.

	
	Example:
		var lightbox = new pureJSLightBox({
			overlay: true,
			navigation: false,
			swipe: false
		});

Examples

	Take a look at the examples  - examples folder.

