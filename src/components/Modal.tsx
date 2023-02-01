import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { ThemeConsumer } from 'styled-components'
import { setModal } from '../redux/slices/modalSlice'
import { TTheme } from '../utils/Theme'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase/firebase'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { TPayload, TVideos } from '../pages/HomePage'


//#region : styled-components
const ModalContainer = styled.div`
border-radius: 20px;
        height: 600px;
        width: 500px;
        color: ${({ theme }) => theme.text};
        padding: 1em 2em;
        background-color: ${({ theme }) => theme.bgLighter};
        display: flex;
        flex-direction: column;
        gap: 10px;
    `

const InputGroup = styled.div`
    display: flex;
    gap: 10px;
    color: ${({ theme }) => theme.textSoft};
    align-items: center;
    margin-bottom: 20px;
    `

const InputGroupStart = styled.div`
    display: flex;
    gap: 10px;
    color: ${({ theme }) => theme.textSoft};
    align-items: start;
    margin-bottom: 20px;
`

const Input = styled.input`
width: 100%;
background: transparent;
border: 0.01px solid ${({ theme }) => theme.textSoft};
padding: 0.7em;
color: ${({ theme }) => theme.text};
&::placeholder{
    
}
&:focus{
    outline: none;
}
`

const FileInput = styled.input`
    
`

const Label = styled.label`
font-weight: 500;
min-width: max-content;
`

const Title = styled.div`
text-align: center;
font-size: 26px;
margin-bottom: 0.8em;
font-weight: 900;
`
const Desc = styled.textarea`
background-color: inherit;
color: ${({ theme }) => theme.text};
width: 100%;
padding: 0.5em;
&:focus{
    outline: none;
}
resize: none;
`

const Button = styled.button`
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
padding: 1em 0;
cursor: pointer;
font-weight: 500;
font-size: 1.1em;
border: none;
`

const CloseButton = styled.button`
border: none;
color: ${({ theme }) => theme.text};
background-color: transparent;
font-size: 1.5em;
font-weight: 900;
text-align: end;
border-radius: 50%;
padding: 0.3em;
cursor: pointer;
`

//#endregion

type Props = {}

const Modal = (props: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //#endregion

    //#region : custom-declarations
    const [inputs, setInputs] = useState<{ title: string, desc: string, imgUrl: string, videoUrl: string }>({ title: "", desc: "", imgUrl: "", videoUrl: "" })
    const [video, setVideo] = useState<File>()
    const [image, setImage] = useState<File>()
    const [videoPer, setVideoPer] = useState(0)
    const [imagePer, setImagePer] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    //#endregion


    //#region : functions

    const handleChange = (e: any) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleTags = (e: any) => {
        setTags(e.target.value.split(","))
    }

    const uploadFile = async (file: File, urlType: string) => {
        const storage = getStorage(app);
        const fileName = new Date().getDate() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImagePer(progress) : setVideoPer(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );
    }

    const handleUpload = async () => {
        const res = await api.post<TPayload<TVideos>>("/videos/create", { ...inputs, tags: tags })
        console.log(res);

        if (res.statusText === "Created") {
            dispatch(setModal())
            navigate(`/video/${res.data.payload._id}`)
        }
    }

    //#endregion

    //#region : side-effects
    // to upload video 
    useEffect(() => {
        video && uploadFile(video, "videoUrl")
        return () => {
            setVideo(undefined)
        }
    }, [video])


    // to upload image
    useEffect(() => {
        image && uploadFile(image, "imgUrl")
        return () => {
            setImage(undefined)
        }
    }, [image])

    //#endregion


    //jsx rendering
    return (
        <ModalContainer>
            <CloseButton onClick={() => dispatch(setModal())}>X</CloseButton>
            <Title>
                Upload Video
            </Title>
            <InputGroup>
                <Label>Video: </Label>
                {
                    videoPer > 0 ? (
                        <>
                            Uploading {Math.round(videoPer)} %
                        </>
                    ) : (
                        <FileInput type="file" accept='video/*' onChange={(e) => { setVideo(e.target.files![0]) }} />
                    )
                }
            </InputGroup>
            <InputGroup>
                <Input placeholder='Title' name="title" onChange={handleChange} />
            </InputGroup>
            <InputGroupStart>
                <Desc rows={6} placeholder='Description' name="desc" onChange={handleChange} />
            </InputGroupStart>
            <InputGroup>
                <Label>Thumbnail: </Label>
                {
                    imagePer > 0 ? (`Uploading ${Math.round(imagePer)} %`) : (
                        <FileInput type="file" accept='image/*' onChange={(e) => { setImage(e.target.files![0]) }} />
                    )
                }
            </InputGroup>
            <InputGroup>
                <Input type="text" onChange={handleTags} placeholder='seperate tags using "," (comma)' />
            </InputGroup>
            <Button onClick={handleUpload}>Upload</Button>
        </ModalContainer>
    )
}

export default Modal