export default class PageManager {
    constructor(pages) {
        if (!Array.isArray(pages) || pages.length < 3) {
            throw new Error('The length of pages must be 3');
        }
        this.pages = pages;
        this.currentIndex = 0;
        this.handleOtherIndex();
    }

    isLast() {
        return this.currentIndex === this.pages.length - 1;
    }

    isFirst() {
        return this.currentIndex === 0;
    }

    go(index) {
        if (index < 0 || index >= this.pages.length) {
            return false;
        }
        this.currentIndex = index;
        this.handleOtherIndex();
    }

    handleOtherIndex() {
        this.prevIndex = this.currentIndex - 1;
        this.nextIndex = this.currentIndex + 1;
        if (this.isFirst()) {
            this.prevIndex = this.pages.length - 1;
        } else if (this.isLast()) {
            this.nextIndex = 0;
        }
    }

    getDirection(index) {
        if (index < this.currentIndex) {
            return 'left';
        }
        if (index > this.currentIndex) {
            return 'right';
        }
        return 'stay';
    }

    getPage(index) {
        return this.pages[index];
    }

    getCurrentPage() {
        return this.pages[this.currentIndex];
    }
}