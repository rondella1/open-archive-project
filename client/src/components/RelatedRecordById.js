import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

//component that retrieves record details based on its fonds ID and record ID

const RelatedRecordById = () => {
    const { fondsId, recordId } = useParams();
    const [record, setRecord] = useState(null);
    const [image, setImage] = useState(null);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/related-records/${fondsId}/${recordId}`)
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
    }, [fondsId, recordId]);


//function that adds items to the user's Bookmarked Items list
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
        toast.error("Error bookmarking item");
        console.error(error);
    })
}

    return (
        <>
        <SearchBar/>
        <RecordWrapper>
            {record && image ? (
                <>
                <ImageBox>
                    <Image src={record.imageURL} alt="record image"/>
                    <SaveButton onClick={addToSavedItems}>Bookmark</SaveButton>
                </ImageBox>
                <RecordDetails> 
                <TitleHeader>File [{record._id}]<RecordTitle> {record.title}</RecordTitle></TitleHeader>
                <h3>File ID:</h3>
                <ID>{record._id}</ID>
                <h3>Fonds:</h3>
                <FondsLink to={`/fonds/${record.fondsName}`}>Fonds {record.fondsId} - {record.fondsName}</FondsLink>
                <Res>Repository:</Res>
                <RepoLink to={`/institutions/${record.repository}`}>{record.repository}</RepoLink>
                <Date>Date of creation:</Date>
                <p>{record.date}</p>
                <Format>Format:</Format>
                <p>{record.format}</p>
                <Notes>Notes:</Notes>
                <p>{record.notes}</p>
                <Acces>Access points:</Acces> 
                <p>{record.tags.join(", ")}</p>                
                </RecordDetails>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </RecordWrapper>
        </>
    );
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
`;

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

const TitleHeader = styled.h2`
    margin-bottom: 10px;
`

const RecordTitle = styled.span`
    font-style: italic;
`;

const ID = styled.p`
    margin-bottom:10px;
`;

const Image = styled.img`
    border: 1px solid grey;
    padding: 3px;
`;

const Res = styled.h3`
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

const Acces = styled.h3`
    margin-top: 10px;
`

const SaveButton = styled.button`
    text-align: left;
    margin-top: 20px;
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`;

export default RelatedRecordById;