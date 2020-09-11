




const GRADE_STATUS = 0;
const PREVIEW_STATUS = 1;


class HomePage{

    #status = GRADE_STATUS;
    #preview_page_index = 0;
    #PREVIEW_PAGE_IMG_NUM = 20
    #img_path;

    constructor(imgPath) {

        this.#img_path = imgPath;

    }

    modifyStatus(newStatus){
        this.#status = newStatus;
    }

    getStatus(){
        return this.#status;
    }

    getPreviewPageIndex(){
        return this.#preview_page_index;
    }

    nextPreviewPage(){

        let MaxNum = Math.ceil(this.#img_path.length/this.#PREVIEW_PAGE_IMG_NUM)

        this.#preview_page_index ++;
        if(this.#preview_page_index >= MaxNum - 2){
            this.#preview_page_index = MaxNum - 2;
        }
        this.setPreviewPage(this.#preview_page_index);
    }

    previousPreviewPage(){
        this.#preview_page_index --;
        if(this.#preview_page_index <= 0){
            this.#preview_page_index = 0;
        }
        this.setPreviewPage(this.#preview_page_index);
    }

    setPreviewPage(page_index){

        let temp_index = page_index * this.#PREVIEW_PAGE_IMG_NUM;

        for(let i=0; i<$('div.PreviewAreaRow').length; i++){
            for(let j=0; j<$('div.PreviewAreaRow').eq(i).children().length; j++){
                $('div.PreviewAreaRow').eq(i).children().eq(j).css({
                    'box-sizing': 'content-box',
                    'background': `url(${this.#img_path[temp_index]})`,
                    'background-size': 'cover'
                });
                temp_index++;
            }
        }
    }


}



