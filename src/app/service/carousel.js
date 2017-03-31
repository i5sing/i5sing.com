/**
 * Created by feng on 2017/2/17.
 */
export default class Carousel {
    constructor(opts) {
        this.wrap = opts.wrap || $('body');
        this.carousel = null;
        this.imgItems = null;
        this.switchItems = null;
        this.listSize = 0;
        this.mainImgItem = null;
        this.prevImgItem = null;
        this.nextImgItem = null;
        this.leftImgItem = null;
        this.rightImgItem = null;
        this.mainSwitchItem = null;
        this.init(opts.data);

        this.index = 0;
    }

    init(data) {
        this.carousel = $('<div class="carousel"><div class="img-list"></div><ul class="switch-list"></ul></div>');
        this.wrap.append(this.carousel);
        this.imgList = $('.img-list');
        this.switchList = $('.switch-list');
        let imgListTpl = '',
            switchListTpl = '';
        for (let i = 0; i < data.length; i++) {
            imgListTpl += '<a data-index=' + i + ' data-url="' + data[i].url + '" class="img-item"><img src="' + data[i].img + '"><div class="img-modal"></div></a>';
            switchListTpl += '<li data-index=' + i + ' class="switch-item"></li>';
        }
        this.imgList.append($(imgListTpl));
        this.switchList.append($(switchListTpl));
        this.listSize = $('.img-item').length;
        this.mainImgItem = $('.img-item[data-index=' + 0 + ']');
        this.prevImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
        this.nextImgItem = $('.img-item[data-index=' + 1 + ']');
        this.leftImgItem = $('.img-item[data-index=' + (this.listSize - 2) + ']');
        this.rightImgItem = $('.img-item[data-index=' + 2 + ']');
        this.mainSwitchItem = $('.switch-item[data-index=' + 0 + ']');
        this.addStyle();
        this.bindEvent();
    }

    bindEvent() {
        let self = this;
        $('.img-item').click(function (e) {
            e.stopPropagation();
            let isMainImgItem = $(e.target).parent().hasClass('main-img-item');
            if (isMainImgItem) {
                window.location = $(e.target).parent().attr('data-url')
            } else {
                self.index = $(e.target).parent().attr('data-index');
                self.switchItem(self.index);
            }
        });
        $('.switch-item').hover(function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.index = $(e.target).attr('data-index');
            self.switchItem(self.index);
        });

        this.startLoop();

        $('.img-item').mouseenter(function (e) {
            clearInterval(self.intervalId);
        });

        $('.img-item').mouseleave(function (e) {
            clearInterval(self.intervalId);
            self.startLoop();
        });
    }

    startLoop() {
        this.intervalId = setInterval(() => {
            if (this.index < this.listSize - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
            this.switchItem(this.index);
        }, 5000);
    }

    clearStyle() {
        this.mainImgItem.removeClass('main-img-item');
        this.prevImgItem.removeClass('prev-img-item');
        this.nextImgItem.removeClass('next-img-item');
        this.leftImgItem.removeClass('left-img-item');
        this.rightImgItem.removeClass('right-img-item');
        this.mainSwitchItem.removeClass('switch-item-active');
    }

    addStyle() {
        this.mainImgItem.addClass('main-img-item');
        this.prevImgItem.addClass('prev-img-item');
        this.nextImgItem.addClass('next-img-item');
        this.leftImgItem.addClass('left-img-item');
        this.rightImgItem.addClass('right-img-item');
        this.mainSwitchItem.addClass('switch-item-active');
    }

    switchItem(index) {
        this.index = index = parseInt(index);
        this.clearStyle();
        this.mainImgItem = $('.img-item[data-index=' + index + ']');
        this.mainSwitchItem = $('.switch-item[data-index=' + index + ']');

        if (index === 0) {
            this.prevImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
            this.leftImgItem = $('.img-item[data-index=' + (this.listSize - 2) + ']');
        } else if (index === 1) {
            this.prevImgItem = $('.img-item[data-index=' + (index - 1) + ']');
            this.leftImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
        } else if (index > 1) {
            this.prevImgItem = $('.img-item[data-index=' + (index - 1) + ']');
            this.leftImgItem = $('.img-item[data-index=' + (index - 2) + ']');
        }

        if (index === (this.listSize - 1)) {
            this.nextImgItem = $('.img-item[data-index=' + 0 + ']');
            this.rightImgItem = $('.img-item[data-index=' + 1 + ']');
        } else if (index === (this.listSize - 2)) {
            this.nextImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
            this.rightImgItem = $('.img-item[data-index=' + 0 + ']');
        } else if (index < (this.listSize - 2)) {
            this.nextImgItem = $('.img-item[data-index=' + (index + 1) + ']');
            this.rightImgItem = $('.img-item[data-index=' + (index + 2) + ']');
        }
        this.addStyle();
    }

    getCurrentIndex() {
        return this.index;
    }
}