import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, ImportFileContainer, Footer } from './styles';

import { MainContext } from '@/App';
import Api from '@/services/api';
import { useToast } from '@/hooks/useToast';

import FileList from '@/components/Import/filelist';
import Dropzone from '@/components/Import/dropzone';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/Navbar';

export default () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const history = useHistory();
    const {addToast} = useToast();
    const { setCurrentPosition } = useContext(MainContext);

    useEffect(() => {
        setCurrentPosition('Import users');
    }, []);

    async function handleUpload(){
        const data = new FormData();

        if (!uploadedFiles.length) return;

        try {
            data.append('file', uploadedFiles[0].file);

            Api.post('/api/import', data).then(() => {
                history.push('/dashboard');
            }).then(() => {
                addToast({
                    type: 'success',
                    title: 'Success!',
                    description: 'Users imported successfuly!',
                });
            });
        } catch (err) {
            addToast({
                type: 'error',
                title: 'File upload error!',
                description: 'It was not possible to upload your file!',
            });
        }
    }

    function submitFile(files) {
        const uploadFiles = files.map(file => ({
            file,
            name: file.name,
        }));

        setUploadedFiles(uploadFiles);
    }

    return (
        <>
            <Container>
                <TopBar />
                <SideBar />

                <ImportFileContainer>
                    <Dropzone onUpload={submitFile} />
                    {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

                    <Footer>
                        <p>
                            Only csv files are allowed
                        </p>
                        <button onClick={handleUpload} type="button">
                            Import
                        </button>
                    </Footer>
                </ImportFileContainer>
            </Container>
        </>
    );
};
