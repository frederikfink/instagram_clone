import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };


    const handleUpload = () => {

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            // Visual logic:
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            //error handling
            (error) => {
                console.log(error);
                alert(error.message);
            },
            //on upload succes handling
            () => {
                storage.ref("images").child(image.name).getDownloadURL()
                    .then(url => {
                        //post image in db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        //when done, reset states.
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        )
    }

    return (
        <div className="imageupload">
            <input type="text" placeholder="enter a caption..." onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
            <progress className="imageupload__progress" value={progress} max="100" />
        </div>
    )
}

export default ImageUpload
