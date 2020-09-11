//config
let slidepage = new SlidePage();
let homepage = new HomePage(slidepage.getImgPath());




//the function of owlcarousel2 is same to this plugin
$(function(){

    //keyboard slide
    $(document).keydown(function(event){
        //left
        if(event.keyCode === 37){
            if(homepage.getStatus() ===  GRADE_STATUS){
                if(slidepage.getAnimateQueryNum() === 0){
                    slidepage.leftSlide();
                }
            }
            else if(homepage.getStatus() ===  PREVIEW_STATUS){
                homepage.previousPreviewPage();
            }


        }
        //right
        if(event.keyCode === 39){
            if(homepage.getStatus() ===  GRADE_STATUS){
                if(slidepage.getAnimateQueryNum() === 0){
                    slidepage.rightSlide();
                }
            }
            else if(homepage.getStatus() === PREVIEW_STATUS){
                homepage.nextPreviewPage();
            }

        }

    })


    //screen scroll;
    $('div.slide').on('mouseenter', function(){
        $('div.slide').on("mousewheel", function() {
            return false;});
    })

    $('div.slide').on('mouseleave', function(){
        $('div.slide').off("mousewheel", function() {
            return false;});
    })


    //mouse page slide
    $('div.slide').on('mousewheel', function(event) {
        if(event.deltaY === 1){
            if(slidepage.getAnimateQueryNum() === 0){
                slidepage.leftSlide();
            }
        }

        else{

            if(slidepage.getAnimateQueryNum() === 0){
                slidepage.rightSlide();
            }
        }
    });

    $('div.PreviewAreaRow').on('click', 'div', function(){
        let background_url = $(this).css('backgroundImage').split('(')[1].split(')')[0];
        let img_name = background_url.split('/').slice(-1)[0];
        let index = parseInt(img_name.replace('.jpg"',''));

        homepage.modifyStatus(GRADE_STATUS);
        $('main').css('display', 'flex');
        $('footer').css('display', 'block');
        $('#PreviewArea').css('display', 'none');

        slidepage.LeftPreViewImgIndex = index;
        slidepage.addLeftPreViewImgIndex(-3);

        slidepage.RightPreViewImgIndex = index;
        slidepage.addRightPreViewImgIndex(3);


        slidepage.setPageImg();

        console.log('index ' +  index);
        console.log('slidepage.LeftPreViewImgIndex ' + slidepage.LeftPreViewImgIndex);
        console.log('slidepage.RightPreViewImgIndex ' + slidepage.RightPreViewImgIndex);




    })

    //mouse preview
    $('div#PreviewArea').on('mousewheel', function(event){
        if(event.deltaY === 1){
            if(homepage.getStatus() ===  PREVIEW_STATUS){
                homepage.previousPreviewPage();
            }
        }

        else{

            if(homepage.getStatus() ===  PREVIEW_STATUS){
                homepage.nextPreviewPage();
            }

        }
    })


    //Preview button
    $('div.PreviewIcon').on('click', function(){
        //enter preview pattern
        if(homepage.getStatus() === GRADE_STATUS){
            homepage.modifyStatus(PREVIEW_STATUS)

            $('main').css('display', 'none');
            $('footer').css('display', 'none');
            $('#PreviewArea').css('display', 'flex');

            homepage.setPreviewPage(0, slidepage.getImgPath());


        }

        //leave preview pattern
        else{
            homepage.modifyStatus(GRADE_STATUS);

            $('main').css('display', 'flex');
            $('footer').css('display', 'block');
            $('#PreviewArea').css('display', 'none');
        }




    });

    //grade button
    $('div.btnArea').on('click', 'button', function(){
        if(slidepage.getAnimateQueryNum() === 0){
            slidepage.rightSlide();
        }
    });

    //upload button
    $('#upload').on('click', function(){
        $('#uploadInput').click();
    });

    //download button
    $('#download').on('click', function(){

        let ImgPath = slidepage.getPreViewImgPath();
        $('#downloadlink').attr('href', ImgPath);
        $('#downloadlink')[0].click();
    });

    //upload event
    $("#uploadInput").on('change', function(){
        let formData = new FormData();
        for(let i=0; i<this.files.length; i++) {
            let file = this.files[i];
            formData.append(file['name'], file);
        }

        $.ajax({
            url: '../php/Uploader.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            success: function(data) {
                console.log(data);
            }
        })

        slidepage.getImgPath();
    });



});
