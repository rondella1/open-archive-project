import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";

//Component that retrieves details of a logged in institution's given record by its record ID

const RecordPageLoggedIn = () => {
    const { institutionName, recordId } = useParams();
    const [record, setRecord] = useState(null);
    const [image, setImage] = useState(null);
    const isLoggedIn = localStorage.getItem('institutionName');
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    useEffect(() => {
        fetch(`http://localhost:3000/${institutionName}/records/${recordId}`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error ("Record not found.");
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
    }, [institutionName, recordId]);

    const deleteRecord = (recordId) => {
        fetch(`http://localhost:3000/${institutionName}/records/${recordId}`, {
            method: "DELETE", 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: recordId})
        })
        .then (() => {
            setRecord(null);
            navigate(`/${institutionName}/records`)
        })
        .catch((error) => console.error(error));   
    };

    return (
        <>
        <LogOutAndSearchContainer>
            <InstitutionSearchBar/>
            {isLoggedIn && (
            <StyledLink to="/" onClick={handleLogOut}>
                Log Out
            </StyledLink>
            )}
        </LogOutAndSearchContainer>
        <RecordWrapper>
            {record && image ? (
                <>
                <ImageBox>
                    <Image src={record.imageURL} alt="record image"/>
                    <DeleteButton onClick={() => deleteRecord(record._id)}>Delete</DeleteButton>
                </ImageBox>
                <RecordDetails>
                    <FileTitle>File [{record._id}]<FileSpan>{record.title}</FileSpan></FileTitle>
                    <h3>File ID:</h3>
                    <p>{record._id}</p>
                    <Fonds>Fonds:</Fonds>
                    <FondsLink to={`/${record.repository}/fonds/${record.fondsName}`}> Fonds {record.fondsId} - {record.fondsName}</FondsLink>
                    <Repo>Repository:</Repo>
                    <p><RepoLink to={`/${record.repository}`}>{record.repository}</RepoLink></p>
                    <Date>Date of creation:</Date>
                    <p>{record.date}</p>
                    <Format>Format: </Format>
                    <p>{record.format}</p>
                    <Notes>Notes: </Notes>
                    <p>{record.notes}</p>
                    <Access>Access points:</Access>
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
`

const RepoLink = styled(Link)`
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`;

const LogOutAndSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  margin-left: auto;
  padding-right: 20px;
  margin-top: 2px;
  color: darkslategray;
    text-decoration: none;
        &:hover {
            color: slategray
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

const DeleteButton = styled.button`
    margin-right: auto;
    margin-top: 20px;
    color: slategray;
    text-decoration: none;
        &:hover {
            color: darkslategray
        }
`;

export default RecordPageLoggedIn;