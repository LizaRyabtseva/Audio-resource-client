import React, {useRef, useState, useEffect} from 'react';

import Button from "./Button";
import button from './Button.module.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);
    const [pickFile, setPickFile] = useState();
    const filePicker = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
    }, [file])

    let pickedFile;
    const pickedHandler = event => {

        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setPickFile(pickedFile.name);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePicker.current.click();
    };

    return (
        <div>
            <input className={'form-control '}
                   id={props.id}
                   ref={filePicker}
                   type='file'
                   style={{display: 'none'}}
                   accept={props.fileTypes}
                   onChange={pickedHandler}
                   name={props.fileTypes === '.mp3' ? 'audio' : 'image'}
            />
            <div className={'d-flex justify-content-end'}>
                <Button className={button.Button} type="button" onClick={pickImageHandler}>
                    {props.fileTypes === '.mp3' ? 'Аудио' : 'Изображение'}
                </Button>
            </div>
            {/*{!isValid && (<p>{props.errorText}</p>)}*/}
        </div>
    )
};

export default ImageUpload;