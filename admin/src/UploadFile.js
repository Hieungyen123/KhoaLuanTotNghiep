import React, { useState } from 'react';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        console.log('File:', file);
        console.log('Name:', name);

        fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadFile;