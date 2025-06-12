import React, { useState } from 'react';

const ImageUploader = () => {
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mostra anteprima
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.imageUrl);
      console.log('Image URL:', data.imageUrl);
    } catch (error) {
      console.error('Errore upload:', error);
    }
  };

  return (
    <div>
      <h3>Carica un'immagine</h3>
      <input type="file" onChange={handleUpload} accept="image/*" />
      
      {preview && <div><p>Anteprima:</p><img src={preview} alt="Preview" width={200} /></div>}
      {imageUrl && <div><p>Immagine caricata su:</p><a href={imageUrl} target="_blank" rel="noreferrer">{imageUrl}</a></div>}
    </div>
  );
};

export default ImageUploader;

