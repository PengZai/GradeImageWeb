<?php

class Uploader{
    protected $dir = '../img/';

    public function uploade():bool
    {
        //create a storage directory in server
        $this->makeDir();

        foreach ($_FILES as $file) {
            if ($file['error'] == UPLOAD_ERR_OK)
            {

                $tmp_name = $file['tmp_name'];
                $file_name = $file['name'];

                $lib_filenames = scandir($this->dir);
                $lib_file_num = count($lib_filenames) - 2;
                $new_name =  "$lib_file_num" . substr($file_name, -4, 4);

//                $suffix = array_slice($tmp_name, -4, 2);
//                echo $suffix;

                if(is_uploaded_file($file['tmp_name']))
                {
                    //upload to server disk
                    move_uploaded_file($tmp_name, $this->dir . $new_name);

                }
                else{
                    //the alerts when file isn't upload file
                    echo "Possible file upload attack";
                    return false;
                }
            }
            else{
                //the alerts when file has some error
                echo "file had \$file['error'] error";
                return false;
            }

        }

        return true;

    }



    private function makeDir(): bool
    {
        $path = $this->dir;
        return is_dir($path) or mkdir($path, 0755, true);
    }



}




$manual_grade_uploader = new Uploader();
$manual_grade_uploader->uploade();

print_r($_FILES);
