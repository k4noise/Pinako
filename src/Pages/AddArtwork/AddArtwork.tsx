import React, {useState} from 'react';
import { Form, ScrollRestoration } from 'react-router-dom';
import UploadFile from '../../Actions/UploadFile';
import UploadArtwork from '../../Actions/UploadArtwork';
import './AddArtwork.css';

const AddArtwork = (): JSX.Element => {
  const [picture, setPicture] = useState();

  const IsValidForm = (form: HTMLFormElement): boolean => {
    const artworkName: string = form?.artworkName?.value as string;
    const description: string = form?.description?.value as string;
    let isValid = true;

    if (artworkName.length === 0) {
      NotificationManager.warning('Укажите заголовок');
      isValid = false;
    } else if (artworkName.length > 50) {
      NotificationManager.warning('Заголовок не может быть больше 50 символов');
      isValid = false;
    }

    if (description.length < 300) {
      NotificationManager.warning('Описание не может быть больше 300 символов');
      isValid = false;
    }
    return isValid;
  };

  return (
    <form action="/upload" method="post" className="AddArtworkForm" onSubmit={async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData();
      formData.set('file', picture);
      const postImageUrl = await UploadFile(formData);

      const body = {
        title: form.artworkName.value,
        description: form.description.value,
        imageUrl: postImageUrl,
        tags: TagSplitter(form.tags.value)
      }
      await UploadArtwork(body);
    }}>
      <h3 className="FormTitle">Добавление работы</h3>
      <input
        type="text"
        placeholder="Название работы"
        className="FormInput"
        name="artworkName"
      ></input>

      <textarea
        placeholder="Описание"
        className="FormInput FormLargeInput"
        name='description'
      ></textarea>
      <label className="HasAddButton">
        <input
          type="text"
          placeholder="Тег | Формат #тег1 #тег2..."
          className="FormInput FormCroppedInput"
          name="tags"
        />
      </label>
      <label className="HasAddButton">
        <input
          type="text"
          placeholder="Загрузить работу"
          className="FormInput FormCroppedInput"
          name="artwork"
          onClick={(event) => {
            const fileInput = document.body.querySelector('#UploadArtwork');
            fileInput.click();
          }}
          readOnly
        />
        <input
          type="file"
          accept="image/*"
          id="UploadArtwork"
          name="artworkFile"
          onChange={async (event) => {
            const form = document.querySelector('.AddArtworkForm');
            form.artwork.value = form.artworkFile.value.split('\\').pop();
            setPicture(event.target.files[0]);
          }}
        />
      </label>
      <button type="submit" className="FormButton">
        Опубликовать
      </button>
      <ScrollRestoration />
    </form>
  );
};

const TagSplitter = (tags: string): string[] =>
  tags.split(' ').filter(tag => tag.startsWith('#')).map(tag => tag.slice(1));


export default AddArtwork;
