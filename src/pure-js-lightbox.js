function pureJSLightBox(config) {
    var _galleryArray,
        _galleryContainer,
        _leftArrowButton,
        _rightArrowButton,
        _closeButton;

    var _config = (config) ? config : {};

    var classConfig = {
            visible: "visible",
            transparent: "transparent",
            hidden: "hidden",
            noScroll: "no-scroll",
            galleryList: "gallery-list",
            galleryListItem: "gallery-list-item",
            selector: "pure-js-lightbox-container",
            lightboxContainer: "lightbox-main-container",
            currImgInView: "fadeIn",
            overlay: "overlay",
            navigationButton: "navigation-button",
            leftArrow: "left-arrow",
            rightArrow: "right-arrow",
            closeButton: "close-button"
        },
        directions = {
            forward: "forward",
            backward: "backward"
        };

    var utils = {
        addClass: function(elements, clazz) {
            if (this.hasClass(elements, clazz)) {
                return;
            }
            if (!(elements instanceof Array || elements instanceof NodeList)) {
                elements = [elements];
            }
            [].forEach.call(elements, function(element) {
                element.className += " " + clazz;
            });

        },
        hasClass: function(element, clazz) {
            return element != undefined && element.className && new RegExp("(^|\\s)" + clazz + "(\\s|$)").test(element.className);
        },
        removeClass: function(elements, clazz) {
            if (!this.hasClass(elements, clazz)) {
                return;
            }
            var reg = new RegExp(clazz, 'g');
            if (!(elements instanceof Array || elements instanceof NodeList)) {
                elements = [elements];
            }
            [].forEach.call(elements, function(element) {
                element.className = element.className.replace(reg, '');
            });
        },
        //element from initial gallery list with class classConfig.selector
        getIinitialListElementSrc: function(elem) {
            elem = elem.getElementsByTagName("a");
            return (elem && elem[0] && elem[0].href) ? elem[0].href : null;
        },
        //element from created gallery
        getGalleryElementSrc: function(elem) {
            return (elem && elem.children && elem.children[0] && elem.children[0].src) ? elem.children[0].src : null;
        },
        getGalleryImgIndex: function(elem) {
            return (elem.children && elem.children[0]) ? elem.children[0].getAttribute("data-index") : null;
        },
        getGalleryElementSrcByIndex: function(index) {
            return (_galleryArray[index]) ? this.getGalleryElementSrc(_galleryArray[index]) : null;
        },
        getCurrentItemInView: function() {
            for (var i = 0; i < _galleryArray.length; ++i) {
                if (utils.hasClass(_galleryArray[i], classConfig.currImgInView)) {
                    return _galleryArray[i];
                }
            }
        },
        getCurrentVisibleItemIndex: function() {
            for (var i = 0; i < _galleryArray.length; ++i) {
                if (utils.hasClass(_galleryArray[i], classConfig.currImgInView)) {
                    return i;
                }
            }
        }
    }

    function _swipedetect(el, swipeCallback, touchCallback) {

        var touchsurface = el,
            swipedir,
            startX,
            startY,
            distX,
            distY,
            threshold = 40, //required min distance traveled to be considered swipe
            allowedTime = 400, // maximum time allowed to travel that distance
            elapsedTime,
            startTime;

        touchsurface.addEventListener('touchstart', function(e) {
            var touchobj = e.changedTouches[0];
            swipedir = 'none';
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            //e.preventDefault();
        }, false);

        // touchsurface.addEventListener('touchmove', function(e) {
        //     e.preventDefault() // prevent scrolling when inside DIV
        // }, false)

        touchsurface.addEventListener('touchend', function(e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime && (Math.abs(distX) >= threshold)) {
                swipedir = (distX < 0) ? 'left' : 'right';
                e.preventDefault();
                swipeCallback(swipedir);
            } else if (typeof touchCallback == "function") {
                touchCallback();
            }
        }, false)
    }

    function _showGalleryContainer() {
        if (!utils.hasClass(_galleryContainer), classConfig.hidden) {
            utils.removeClass(_galleryContainer, classConfig.hidden);
            utils.addClass(document.getElementsByTagName("body")[0], classConfig.noScroll);
        }
    }

    function _hideGalleryContainer() {
        var currImg = utils.getCurrentItemInView();
        utils.removeClass(currImg, classConfig.currImgInView);
        utils.addClass(currImg, classConfig.hidden);
        utils.addClass(_galleryContainer, classConfig.hidden);
        utils.removeClass(document.getElementsByTagName("body")[0], classConfig.noScroll);
    }

    function _setupGalleryNavigation() {
        var overlay = document.createElement('div');
        overlay.setAttribute("class", classConfig.overlay);
        if (_config.hasOwnProperty("overlay") && _config.overlay === false) {
            utils.addClass(overlay, classConfig.transparent);
        }
        _galleryContainer.appendChild(overlay);

        if (!(_config.hasOwnProperty("swipe") && _config.swipe === false)) {
            _swipedetect(document.getElementsByTagName("body")[0], _swipeAction, null);
        }

        if (!(_config.hasOwnProperty("navigation") && _config.navigation === false)) {
            var leftArrow = document.createElement('div');
            leftArrow.setAttribute("class", classConfig.navigationButton);
            leftArrow.setAttribute("id", classConfig.leftArrow);

            var rightArrow = document.createElement('div');
            rightArrow.setAttribute("class", classConfig.navigationButton);
            rightArrow.setAttribute("id", classConfig.rightArrow);

            _galleryContainer.appendChild(leftArrow);
            _galleryContainer.appendChild(rightArrow);
            _leftArrowButton = leftArrow;
            _rightArrowButton = rightArrow;

            leftArrow.addEventListener("click", _moveGalleryItem.bind(null, "forward"));
            rightArrow.addEventListener("click", _moveGalleryItem.bind(null, "backward"));
        }

        var xBtn = document.createElement('div');
        xBtn.setAttribute("class", classConfig.navigationButton);
        xBtn.setAttribute("id", classConfig.closeButton);
        _galleryContainer.appendChild(xBtn);
        _closeButton = xBtn;
        _closeButton.addEventListener("click", _hideGalleryContainer);
    }

    function _createGalleryItemsArray(elemArr) {

        var ul = document.createElement('ul');
        ul.setAttribute('class', classConfig.galleryList);
        _galleryContainer.appendChild(ul);
        _galleryArray = ul.getElementsByTagName("li");

        for (var i = 0; i < elemArr.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('class', classConfig.galleryListItem);
            utils.addClass(li, classConfig.hidden);
            ul.appendChild(li);

            var _img = document.createElement('img');
            _img.src = utils.getIinitialListElementSrc(elemArr[i]);
            _img.setAttribute("data-index", i);
            li.appendChild(_img);

            elemArr[i].addEventListener("click", function(e) {
                e.preventDefault();
                _showGalleryImage(utils.getIinitialListElementSrc(this));
            });
        }
    }

    function _setupGallery() {
        var gallerySelector = document.getElementsByClassName(classConfig.selector);
        gallerySelector = (gallerySelector && gallerySelector[0] && gallerySelector[0].children) ? gallerySelector[0].children : null;

        if (!gallerySelector) {
            console.log("Pure js lightbox | Please provide a list of gallery elements");
            return false;
        }
        _galleryContainer = document.createElement('div');
        _galleryContainer.setAttribute("id", classConfig.lightboxContainer);
        utils.addClass(_galleryContainer, classConfig.hidden);
        window.document.body.insertBefore(_galleryContainer, window.document.body.firstChild);

        _setupGalleryNavigation();
        _createGalleryItemsArray(gallerySelector);
    }

    function _swipeAction(dir) {
        dir = (dir == "left") ? "forward" : "backward";
        _moveGalleryItem(dir);
    }

    function _moveGalleryItem(direction) {
        var curr = utils.getCurrentVisibleItemIndex();
        //left
        if (direction === directions.forward) {
            curr += 1;
            if (curr === _galleryArray.length) {
                curr = 0;
            }
        }
        //right
        else {
            curr -= 1;
            if (curr < 0) {
                curr = _galleryArray.length - 1;
            }
        }
        _showGalleryImage(utils.getGalleryElementSrcByIndex(curr));
    }

    function _showGalleryImage(src) {
        _showGalleryContainer();
        var currImg;

        for (var i = 0; i < _galleryArray.length; ++i) {
            utils.addClass(_galleryArray[i], classConfig.hidden);
            utils.removeClass(_galleryArray[i], classConfig.currImgInView);
            if (_galleryArray[i].firstChild.src === src) {
                currImg = _galleryArray[i];
                utils.removeClass(currImg, classConfig.hidden);
                utils.addClass(currImg, classConfig.currImgInView);
            }
        }
    }

    //Starting point
    _setupGallery();

}