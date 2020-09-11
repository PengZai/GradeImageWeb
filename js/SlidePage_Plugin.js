

class SlidePage {

    #startIndex = 0;
    #leftIndex = 0;
    #interfaceIndex = 0;
    #rightIndex = 0;
    #endIndex = 0;


    #SLIDE_SPEED = 500;
    #NUM_SLIDE = 5;

    constructor() {


        this.LeftPreViewImgIndex = 2;
        this.RightPreViewImgIndex = 8;


        this.getImgPath();
        this.#slidePageImgInit();



    }

    getNum_AfterAdd(orignal_num,num){
        let max_num = this.background_path.length-1;
        let min_num = 0;
        let temp_add = orignal_num + num;
        let abs_num = Math.abs(num);
        let temp_diff = Math.abs(orignal_num - abs_num);



        if(num>0){
            orignal_num+=abs_num;
            if(orignal_num > max_num){
                orignal_num = temp_add - max_num - 1;
            }
        }

        else if (num<0){
            orignal_num-=abs_num;
            if(orignal_num < min_num){
                orignal_num = max_num - temp_diff + 1;
            }
        }

        return  orignal_num;

    }

    addLeftPreViewImgIndex(num){
        this.LeftPreViewImgIndex = this.getNum_AfterAdd(this.LeftPreViewImgIndex, num);

    }



    addRightPreViewImgIndex(num){

        this.RightPreViewImgIndex = this.getNum_AfterAdd(this.RightPreViewImgIndex, num);
    }

    #slidePageImgInit = () => {
       for(let i=0; i<this.#NUM_SLIDE; i++){
            $('div.slideDiv').eq(i).css({
                'background': `url(${this.background_path[this.LeftPreViewImgIndex + this.#NUM_SLIDE - i]})`,
                'background-size': '100% 100%',
                'background-repeat': 'no-repeat'
            })
        }
    }

    setPageImg() {

        let div_width = parseInt($('div.slide').css('width'));
        let div_width_float = 5;


        let url_background = this.background_path[this.LeftPreViewImgIndex]

        for(let i=0; i<this.#NUM_SLIDE; i++){

            let $left = parseInt($(`div.slideDiv`).eq(i).css('left'));
            if($left >= -2*div_width-div_width_float && $left <= -2*div_width+div_width_float){
                this.#startIndex = i;
            }
            if($left >= -1*div_width-div_width_float && $left <= -1*div_width+div_width_float){
                this.#leftIndex = i;
            }
            if($left >= -div_width_float && $left <= div_width_float){
                this.#interfaceIndex = i;
            }
            if($left >= div_width-div_width_float && $left <= div_width+div_width_float){
                this.#rightIndex = i;
            }
            if($left >= 2*div_width-div_width_float && $left <= 2*div_width+div_width_float){
                this.#endIndex = i;
            }

        }

        let temp_index = 0;
        let base_index = this.getNum_AfterAdd(this.LeftPreViewImgIndex, this.#NUM_SLIDE);
        temp_index = this.getNum_AfterAdd(base_index, 0);

        $(`div.slideDiv:eq(${this.#startIndex})`).css({
                'background': `url(${this.background_path[temp_index]})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
        });


        temp_index = this.getNum_AfterAdd(base_index, -1);

        $(`div.slideDiv:eq(${this.#leftIndex})`).css({
            'background': `url(${this.background_path[temp_index]})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        });

        temp_index = this.getNum_AfterAdd(base_index, -2);

        $(`div.slideDiv:eq(${this.#interfaceIndex})`).css({
            'background': `url(${this.background_path[temp_index]})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        });

        temp_index = this.getNum_AfterAdd(base_index, -3);

        $(`div.slideDiv:eq(${this.#rightIndex})`).css({
            'background': `url(${this.background_path[temp_index]})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        });

        temp_index = this.getNum_AfterAdd(base_index, -4);

        $(`div.slideDiv:eq(${this.#endIndex})`).css({
            'background': `url(${this.background_path[temp_index]})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        });



    }


    getPreViewImgPath(){
        let interfaceImgIndex = this.RightPreViewImgIndex-3;
        if(interfaceImgIndex < 0){
            interfaceImgIndex = this.background_path.length - Math.abs(interfaceImgIndex);
        }

        return this.background_path[interfaceImgIndex];
    }

    //get animateQuery num to avoid animate delay
    getAnimateQueryNum() {

        let sum = 0;
        sum+=$(`div.slideDiv:eq(${this.#startIndex})`).queue().length;
        sum+=$(`div.slideDiv:eq(${this.#leftIndex})`).queue().length;
        sum+=$(`div.slideDiv:eq(${this.#interfaceIndex})`).queue().length;
        sum+=$(`div.slideDiv:eq(${this.#rightIndex})`).queue().length;
        sum+=$(`div.slideDiv:eq(${this.#endIndex})`).queue().length;
        return sum;

    }

    leftSlide() {

        let SLIDE_SPEED = this.#SLIDE_SPEED;
        let div_width = parseInt($('div.slide').css('width'));
        let div_width_float = 5;


        let url_background = this.background_path[this.LeftPreViewImgIndex]

        for(let i=0; i<this.#NUM_SLIDE; i++){

            let $left = parseInt($(`div.slideDiv`).eq(i).css('left'));
            if($left >= -2*div_width-div_width_float && $left <= -2*div_width+div_width_float){
                this.#startIndex = i;
            }
            if($left >= -1*div_width-div_width_float && $left <= -1*div_width+div_width_float){
                this.#leftIndex = i;
            }
            if($left >= -div_width_float && $left <= div_width_float){
                this.#interfaceIndex = i;
            }
            if($left >= div_width-div_width_float && $left <= div_width+div_width_float){
                this.#rightIndex = i;
            }
            if($left >= 2*div_width-div_width_float && $left <= 2*div_width+div_width_float){
                this.#endIndex = i;
            }

        }



        $(`div.slideDiv:eq(${this.#startIndex})`).animate({
            left: "-300%"
        }, SLIDE_SPEED, 'swing', function(){
            $(this).css({
                'left':'200%',
                'background': `url(${url_background})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
        });


        $(`div.slideDiv:eq(${this.#leftIndex})`).animate({
            left: "-200%"
        }, SLIDE_SPEED, 'swing', );

        $(`div.slideDiv:eq(${this.#interfaceIndex})`).animate({
            left: "-100%"
        }, SLIDE_SPEED, 'swing',);

        $(`div.slideDiv:eq(${this.#rightIndex})`).animate({
            left: "0"
        }, SLIDE_SPEED, 'swing',);

        $(`div.slideDiv:eq(${this.#endIndex})`).animate({
            left: "100%"
        }, SLIDE_SPEED, 'swing');



        this.addLeftPreViewImgIndex(-1);
        this.addRightPreViewImgIndex(-1);
        // console.log('Leftindex:' + this.LeftPreViewImgIndex);
        // console.log('Righttindex:' + this.RightPreViewImgIndex);


    }

    rightSlide() {


        let SLIDE_SPEED = this.#SLIDE_SPEED;
        let div_width = parseInt($('div.slide').css('width'));
        let div_width_float = 5;



        let url_background = this.background_path[this.RightPreViewImgIndex]

        for(let i=0; i<this.#NUM_SLIDE; i++){

            let $left = parseInt($(`div.slideDiv`).eq(i).css('left'));
            if($left >= -2*div_width-div_width_float && $left <= -2*div_width+div_width_float){
                this.#startIndex = i;
            }
            if($left >= -1*div_width-div_width_float && $left <= -1*div_width+div_width_float){
                this.#leftIndex = i;
            }
            if($left >= -div_width_float && $left <= div_width_float){
                this.#interfaceIndex = i;
            }
            if($left >= div_width-div_width_float && $left <= div_width+div_width_float){
                this.#rightIndex = i;
            }
            if($left >= 2*div_width-div_width_float && $left <= 2*div_width+div_width_float){
                this.#endIndex = i;
            }

        }



        $(`div.slideDiv:eq(${this.#startIndex})`).animate({
            left: "-100%"
        }, SLIDE_SPEED, 'swing');

        $(`div.slideDiv:eq(${this.#leftIndex})`).animate({
            left: "0"
        }, SLIDE_SPEED, 'swing',);

        $(`div.slideDiv:eq(${this.#interfaceIndex})`).animate({
            left: "100%"
        }, SLIDE_SPEED, 'swing',);

        $(`div.slideDiv:eq(${this.#rightIndex})`).animate({
            left: "200%"
        }, SLIDE_SPEED, 'swing',);

        $(`div.slideDiv:eq(${this.#endIndex})`).animate({
            left: "300%"
        }, SLIDE_SPEED, 'swing', function () {
            $(this).css({
                'left': '-200%',
                'background': `url(${url_background})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });

        });


        this.addLeftPreViewImgIndex(1);
        this.addRightPreViewImgIndex(1);

        // console.log('Leftindex:' + this.LeftPreViewImgIndex);
        // console.log('Righttindex:' + this.RightPreViewImgIndex);

    }


    getImgPath() {

        let temp;


        $.ajax({
            type: "get",
            url: "../php/backgroundPathRead.php",
            async: false,
            success: function(response) {
                temp = response;
            }
        });


        let img_path = temp.split(',').slice(0, -1);
        this.background_path = img_path;

        return img_path
    }


}



















