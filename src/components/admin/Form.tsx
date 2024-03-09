import React, { useState } from "react";
import useStorage from "../../hooks/useStorage";
import useCollection from "../../hooks/useCollection";
import { useSongContext } from "../../hooks/useSongContext";
import { Timestamp } from "firebase/firestore";

export default function Form() {
  const { dispatch } = useSongContext();

  const { addDocument, getDocuments } = useCollection("playlists");
  const { loading, upLoadFile } = useStorage();

  const [title, setTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<string | null>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgFileSelected = e.target.files![0];

    // Allowed files types
    const typesImg = ["image/png", "image/jpeg", "image/jpg"];

    if (imgFileSelected && typesImg.includes(imgFileSelected.type)) {
      setImgFile(imgFileSelected);
      setErrorFile(null);
    } else {
      setImgFile(null);
      setErrorFile("Please select an image (jpg, jpeg, png format) only");
    }
  };

  const onChangeMp3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let mp3FileSelected = e.target.files![0];

    // Allowed files types
    const typesMp3 = ["audio/mpeg"];

    if (mp3FileSelected && typesMp3.includes(mp3FileSelected.type)) {
      setSongFile(mp3FileSelected);
      setErrorFile(null);
    } else {
      setSongFile(null);
      setErrorFile("Please select a song (mp3 format) only");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !singer) {
      setErrorFile("All Fields Required");
      return;
    }

    if (imgFile && songFile) {
      const imgUploaded = await upLoadFile(imgFile, "covers");
      const songUploaded = await upLoadFile(songFile, "songs");

      if (imgUploaded && songUploaded) {
        const song = await addDocument({
          title: title,
          singer: singer,
          coverUrl: imgUploaded.fileUrl,
          songUrl: songUploaded.fileUrl,
          imgFilePath: imgUploaded.filePath,
          songFilePath: songUploaded.filePath,
          songs: [],
          createdAt: Timestamp.fromDate(new Date()),
        });

        if (song) {
          setTitle("");
          setSinger("");
          setImgFile(null);
          setSongFile(null);
          setErrorFile(null);

          getDocuments()
            .then((dts) => {
              dispatch({ type: "GET_SONGS", payload: dts });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Singer"
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
      />
      <hr />
      <div>
        <input
          className="input__file"
          type="file"
          id="imageFile"
          onChange={onChangeImage}
        />
        <label htmlFor="imageFile">Image File (jpg, jpeg, png) only</label>
        <br />
        <span>{imgFile && imgFile.name}</span>
      </div>
      <div>
        <input
          className="input__file"
          type="file"
          id="songFile"
          onChange={onChangeMp3}
        />
        <label htmlFor="songFile">Song File (mp3) only</label>
        <br />
        <span>{songFile && songFile.name}</span>
      </div>

      <button type="submit">{loading ? "Processing..." : "Submit"}</button>

      <span className="error">{errorFile && errorFile}</span>
    </form>
  );
}
