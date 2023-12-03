import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";

const AllRecordsLoggedIn = () => {
    const { institutionName } = useParams();
    const [allRecords, setAllRecords] = useState([]);
    const isLoggedIn = localStorage.getItem('institutionName');

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    useEffect(() => {
        fetch(`http://localhost:3000/${institutionName}/records`)
        .then(response => response.json())
        .then(recordsData => setAllRecords(recordsData.data))
        .catch(error => console.error(error))
    }, [])

    const deleteRecord = (recordId) => {
        fetch(`http://localhost:3000/${institutionName}/records`, {
            method: "DELETE", 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: recordId})
        })
        .then (() => {
            setAllRecords((prevRecords) => prevRecords.filter((record) => record._id !== recordId));
        })
        .catch((error) => console.error(error));   
    };

    if (!allRecords) {
        return ("No records Found.")
    }

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
        <HeaderTitle> {institutionName} Records</HeaderTitle>
        {isLoggedIn && (
        <AddRecordLink to={`/${institutionName}/upload-record`}>Add a record</AddRecordLink>
        )}
            <RecordWrapper>
                {allRecords.map((record) => (
                    <RecordBox key={record._id}>
                        <ImageLink to={`/${record.repository}/records/${record._id}`}>
                            <RecordImage src={record.imageURL} alt={record.title} />
                        </ImageLink>
                        <DetailsBox>
                            <p>File [{record._id}] <Title>{record.title}</Title></p>
                            <Fonds><FondsLink to={`/${record.repository}/fonds/${record.fondsName}`}>Fonds {record.fondsId} - {record.fondsName}</FondsLink></Fonds>
                            <Repo><RepoLink to={`/${record.repository}`}>{record.repository}</RepoLink></Repo>
                        </DetailsBox>
                        <DeleteButton onClick={() => deleteRecord(record._id)}>Delete</DeleteButton>
                    </RecordBox>
                ))}
            </RecordWrapper>
        </>
    );
};

const FondsLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`

const RepoLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
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
  text-decoration: none;
  color: darkslategray;

    &:hover{
    color: slategray
  }
`;

const HeaderTitle = styled.h2`
    padding-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
`

const AddRecordLink = styled(Link)`
    padding-left: 30px;
    text-align: right;
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

const RecordWrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const RecordBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
    padding: 10px;
    padding-bottom: 30px;
`;

const ImageLink = styled(Link)`
    width: 100px;
`;

const RecordImage = styled.img`
    max-height: 200px;
    max-width: 150px;
    border: 1px solid grey;
    padding: 3px;
`;

const DetailsBox = styled.div`
    flex-grow: 1;
    margin-left: 200px;
`;

const Title = styled.span`
    font-style: italic;
`;

const Fonds = styled.p`
    margin-top: 5px;
`

const Repo = styled.p`
    margin-top: 5px;
`

const DeleteButton = styled.button`
    margin-top: auto;
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

export default AllRecordsLoggedIn;