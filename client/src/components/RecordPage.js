import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ToastContainer, toast } from "react-toastify";

//Component that retrieves details of a given record by its ID

const RecordPage = () => {
    const { recordId } = useParams();
    const [record, setRecord] = useState(null);
    const [image, setImage] = useState(null);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/records/${recordId}`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error ('Record not found.');
            }

            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                setRecord(result.record);
                setImage(result.image);
            }
        })
        .catch ((error) => {
            console.error ("There was an error retireiving this record", error);
        });
    }, [recordId]);

    //function that adds record to user's Bookmarked Items list
    const addToSavedItems = async () => {
        setSaved([...saved, record]);
    
        let itemData = {_id: record._id, title: record.title, date: record.date, format: record.format, type: "record",imageURL: record.imageURL};
    
        fetch("http://localhost:3000/saved-items", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        })
        .then(response => response.json())
        .then(data => {
            toast.success("Item bookmarked")
        })
        .catch(error => {
            toast.error("Error bookmarking item")
            console.error(error)
        })
    };

    return (
        <>
            <SearchBar/>
            <RecordWrapper>
            {record && image ? (
                <>
                <ImageBox>
                    <Image src={record.imageURL} alt="record image"/>
                    <SaveWrapper onClick={addToSavedItems}>
                        <SaveButton >Bookmark</SaveButton>
                    </SaveWrapper>
                </ImageBox>
                <RecordDetails>
                    <FileTitle>File [{record._id}]<FileSpan>{record.title}</FileSpan></FileTitle>
                    <h3>File ID:</h3>
                    <p>{record._id}</p>
                    <Fonds>Fonds:</Fonds>
                    <FondsLink to={`/fonds/${record.fondsName}`}> Fonds {record.fondsId} - {record.fondsName}</FondsLink>
                    <Repo>Repository</Repo>
                    <RepoLink to={`/institutions/${record.repository}`}>{record.repository}</RepoLink>
                    <Date>Date of creation</Date>
                    <p>{record.date}</p>
                    <Format>Format:</Format>
                    <p>{record.format}</p>
                    <Notes>Notes:</Notes>
                    <p>{record.notes}</p>
                    <Access>Access points:</Access>
                    <p>{record.tags.join(", ")}</p>
                </RecordDetails>
                </>
            ) : (
                <>
                <p>Loading...</p>
                </>
            )}
            </RecordWrapper>
        </>
    )
};

const ImageBox = styled.div`
    display: flex;
    flex-direction: column;
`

const FondsLink = styled(Link)`
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`

const RepoLink = styled(Link)`
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`;

const RecordWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const RecordDetails = styled.div`
    margin-left: 20px;
`;

const FileTitle = styled.h2`
    margin-bottom: 20px;
`

const FileSpan = styled.span`
    font-style: italic
`

const Fonds = styled.h3`
        margin-top: 10px;
`

const Repo = styled.h3`
        margin-top: 10px;
`

const Date = styled.h3`
        margin-top: 10px;
` 

const Format = styled.h3`
        margin-top: 10px;
`

const Notes = styled.h3`
        margin-top: 10px;
`

const Access = styled.h3`
        margin-top: 10px;
`

const Image = styled.img`
    border: 1px solid grey;
    padding: 3px;
`;

const SaveWrapper = styled.div`
`;

const SaveButton = styled.button`
    margin-top: 20px;
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`;

export default RecordPage;
