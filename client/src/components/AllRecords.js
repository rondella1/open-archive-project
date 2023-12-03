import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

//This component retrieves all the fonds registered in the database

const AllRecords = () => {
    const [allRecords, setAllRecords] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/records")
        .then(response => response.json())
        .then(recordsData => setAllRecords(recordsData.data))
        .catch(error => console.error(error))
    }, [])

    return (
        <>
            <SearchBar/>
            <PageTitle>Records</PageTitle>
            <Wrapper>
                {allRecords.map((record) => (
                    <RecordBox key={record._id}>
                        <ImageLink to={`/records/${record._id}`}>
                            <FondsImage src={record.imageURL} alt={record.title}/>
                        </ImageLink>
                        <DetailsBox>
                        <p>File [{record._id}] <RecordTitle>{record.title}</RecordTitle></p>
                        <Fonds><FondsLink to={`/fonds/${record.fondsName}`}>Fonds {record.fondsId} - {record.fondsName}</FondsLink></Fonds>
                        <Repo><RepoLink to={`/institutions/${record.repository}`}>{record.repository}</RepoLink></Repo>
                        </DetailsBox>
                    </RecordBox>
                ))}
            </Wrapper>
        </>
    );
}

const RepoLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

const FondsLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`
const PageTitle = styled.h2`
    padding-left: 30px;
    margin-top: 20px;
`

const Wrapper = styled.div`
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
`;

const ImageLink = styled(Link)`
    width: 50px;
`;

const FondsImage = styled.img`
    max-height: 200px;
    max-width: 150px;
    border: 1px solid grey;
    padding: 3px;
`;

const RecordTitle = styled.span`
    font-style: italic;
`;

const DetailsBox = styled.div`
    flex-grow: 1;
    margin-left: 200px;
`;

const Fonds = styled.p`
    margin-top: 5px;
`

const Repo = styled.p`
  margin-top: 5px;
`

export default AllRecords;