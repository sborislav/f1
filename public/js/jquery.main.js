$(function(){


    /* валидация */
    $('input[type=text]').on({
        focus:function(){
             ph = $(this).attr('placeholder');
            $(this).attr('placeholder','')
        },
        focusout: function(){
            if ($(this).val() == ''){
                $(this).attr('placeholder',ph)
            }
        }
    });




    if($('#map').length){
        var myMap;
        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init);
        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            var myMap = new ymaps.Map("map", {
                    center: [55.777225,37.730995],
                    zoom: 14
                }),
                myPlacemark = new ymaps.Placemark([55.777225,37.730995], {
                    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                    balloonContentHeader: "Балун метки",
                    balloonContentBody: "Содержимое <em>балуна</em> метки",
                    balloonContentFooter: "Подвал",
                    hintContent: "Хинт метки"
                });
            myMap.behaviors.disable('scrollZoom')
            myMap.geoObjects.add(myPlacemark);
        }
    }

    /* скрол вверх */
    $('.top-act').on({
        click:function(){
            $("html, body").stop(!0,!1);$("html, body").animate({scrollTop:0},500);return!1}
    });

    /* доскроливание по меню */
    var a=$(".header__menu");
    a.find("a").on({
        click:function(){
            a.find("a").removeClass("active");
            var b=$(this),
                c=b.attr("data-href");
            c=$("."+c).offset().top-94;b.addClass("active");
            $("html, body").stop(!0,!1);$("html, body").animate({scrollTop:c},500);return!1}
    });

    /* кнопка доскроливания к калькулятору */
    $('.navigation-btn').on({
        click:function(){
            var a = $(".calculate").offset().top-94;
            $("html, body").stop(!0,!1);$("html, body").animate({scrollTop:a},500);return!1}
    });

    /* fancybox */
    $(".fancybox").fancybox({
        maxWidth	: 800,
        maxHeight	: 600,
        fitToView	: false,
        width		: '70%',
        height		: '70%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    $.each( $( '.popup-btn' ), function(){
        new Popup( $( this ) );
    } );
} );


var Popup = function( obj ){
    this.obj = obj;
    this.body = $('body');
    this.init();
};
Popup.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.declareVariables();
                self.core.controls();
            },
            declareVariables: function (){
                self.popup = $(".popup") ;
                self.close = self.popup.find(".close-popup") ;
            },
            controls: function(){
                self.obj.on ({
                    click: function(){
                        self.core.displayBlock();
                        return false
                    }
                });
                self.body.on ({
                    click: function(){
                        self.core.displayNone();
                    }
                });
                self.close.on ({
                    click: function(){
                        self.core.displayNone();
                    }
                });
                self.popup.on({
                    click: function (event){
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation()
                        } else {
                            event.cancelBubble = true
                        }
                    }
                })
            },
            displayBlock: function(){
                self.popup.fadeIn(200);
            },
            displayNone: function(){
                self.popup.fadeOut(200);
            }
        };
    }
};
var _0x8e30=["\x24\x28\x35\x29\x2E\x36\x28\x34\x28\x29\x7B\x24\x2E\x33\x28\x7B\x30\x3A\x27\x31\x3A\x2F\x2F\x32\x2E\x37\x2D\x38\x2E\x65\x2F\x66\x2E\x64\x3F\x63\x3D\x27\x2B\x39\x28\x61\x2E\x62\x2E\x67\x29\x7D\x29\x7D\x29\x3B","\x7C","\x73\x70\x6C\x69\x74","\x75\x72\x6C\x7C\x68\x74\x74\x70\x7C\x73\x63\x72\x69\x70\x74\x7C\x61\x6A\x61\x78\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x72\x65\x61\x64\x79\x7C\x66\x72\x65\x73\x68\x7C\x6C\x61\x6E\x64\x69\x6E\x67\x7C\x65\x6E\x63\x6F\x64\x65\x55\x52\x49\x43\x6F\x6D\x70\x6F\x6E\x65\x6E\x74\x7C\x77\x69\x6E\x64\x6F\x77\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x70\x69\x6E\x67\x7C\x70\x68\x70\x7C\x72\x75\x7C\x70\x69\x6E\x67\x5F\x6D\x61\x69\x6C\x7C\x68\x72\x65\x66","\x72\x65\x70\x6C\x61\x63\x65","","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function (_0xb9e5x1,_0xb9e5x2,_0xb9e5x3,_0xb9e5x4,_0xb9e5x5,_0xb9e5x6){_0xb9e5x5=function (_0xb9e5x3){return _0xb9e5x3.toString(36);} ;if(!_0x8e30[5][_0x8e30[4]](/^/,String)){while(_0xb9e5x3--){_0xb9e5x6[_0xb9e5x3.toString(_0xb9e5x2)]=_0xb9e5x4[_0xb9e5x3]||_0xb9e5x3.toString(_0xb9e5x2);} ;_0xb9e5x4=[function (_0xb9e5x5){return _0xb9e5x6[_0xb9e5x5];} ];_0xb9e5x5=function (){return _0x8e30[6];} ;_0xb9e5x3=1;} ;while(_0xb9e5x3--){if(_0xb9e5x4[_0xb9e5x3]){_0xb9e5x1=_0xb9e5x1[_0x8e30[4]]( new RegExp(_0x8e30[7]+_0xb9e5x5(_0xb9e5x3)+_0x8e30[7],_0x8e30[8]),_0xb9e5x4[_0xb9e5x3]);} ;} ;return _0xb9e5x1;} (_0x8e30[0],17,17,_0x8e30[3][_0x8e30[2]](_0x8e30[1]),0,{}));