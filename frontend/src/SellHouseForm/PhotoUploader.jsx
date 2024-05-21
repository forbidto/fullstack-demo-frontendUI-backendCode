import { Button, Card, Text } from '@aws-amplify/ui-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const PhotoUploader = ({ onFilesAdded, photos }) => {
    const onDrop = useCallback(acceptedFiles => {

        acceptedFiles.forEach(file=>{
            resizeImage(file,1200, 800, (resizedBlob)=>{
                const preview = URL.createObjectURL(resizedBlob);
                const resizedFile = new File([resizedBlob],file.name,{type:file.type});
                onFilesAdded([{ file: resizedFile, preview }]);
            });
        });

      // Create a preview for each file
   /*    const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      onFilesAdded(filesWithPreview); */
    }, [onFilesAdded]);
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 15 });

    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(callback);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
 
    return (
        <Card variation='elevated'>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} type="file" accept="image/jpeg, image/png" />
        <Text className="photo-upload-text">拖拉上傳</Text>
        <Button className='photo-browse-button'>Browse File</Button>
      </div>
      <div className="photo-preview-gp">
        {photos.map(photo => (
          <div key={photo.name} className="preview">
            <img src={photo.preview} alt="Preview" style={{width:"100px", heigh:"100px"}} />
            {/* Additional photo info like name, size, etc. can be added here */}
          </div>
        ))}
      </div>
      </Card>
    );
  };
  
  export default PhotoUploader;