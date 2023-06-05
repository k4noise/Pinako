import React from 'react';
import './AddArtwork.css';

const AddArtwork = (): JSX.Element => {
  return (
    <form action="/upload" method="post" className="AddArtworkForm">
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
      ></textarea>
      <label className="HasAddButton">
        <input
          type="text"
          placeholder="Тег"
          className="FormInput FormCroppedInput"
          name="artworkName"
        />
      </label>
      <label className="HasAddButton">
        <input
          type="text"
          placeholder="Загрузить работу"
          className="FormInput FormCroppedInput"
          name="artworkFile"
          onClick={(event) => {
            const fileInput = document.body.querySelector('#UploadArtwork');
            fileInput.click();
          }}
          readOnly
        />
        {/* <button
          type="button"
          className="FormButtonAdd"
          onClick={(event) => {
            const fileInput = document.body.querySelector('#UploadArtwork');
            fileInput.click();
          }}
        >
          +
        </button> */}
        <input
          type="file"
          accept="image/*"
          id="UploadArtwork"
          name="artwork"
          onChange={(event) => {
            const form = document.querySelector('.AddArtworkForm');
            form.artworkFile.value = form.artwork.value.split('\\').pop();
          }}
        />
      </label>
      <button type="submit" className="FormButton">
        Опубликовать
      </button>
    </form>
  );
};

export default AddArtwork;
