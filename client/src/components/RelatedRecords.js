import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

//Component that retrieves all records associated with a specific fonds by its fonds ID.

const RelatedRecords = () => {
    const { fondsId } = useParams();
    const [relatedRecords, setRelatedRecords] = useState([]);
    const count = relatedRecords.length

    useEffect(() => {
        const fetchRelatedRecords = async () => {
            try {
                const response = await fetch(`http://localhost:3000/related-records/${fondsId}`)
                const data = await response.json();
                setRelatedRecords(data.data);
            } catch (error) {
                console.error("Error fetching related records:", error)
                setRelatedRecords([]);
            }
        };
        fetchRelatedRecords();
    }, [fondsId]);

    return (
        <>
            <SearchBar/>
            <Title> {count} Related Records</Title>
            <Wrapper>
                <>
                    {relatedRecords.map((record) => {
                        return (
                            <RecordsBox key={record._id}>
                                <ImageLink to={`/related-records/${record.fondsId}/${record._id}`}>
                                    <RecordImage src={record.imageURL}/>
                                </ImageLink>
                                <DetailsBox>
                                    <p>File [{record._id}]<RecordTitle> {record.title}</RecordTitle></p>
                                    <FondsLink to={`/fonds/${record.fondsName}`}>Fonds {record._id} - {record.fondsName} {record.fondsId}</FondsLink>
                                    <p>Repository: <RepoLink to={`/institutions/${record.repository}`}>{record.repository}</RepoLink></p>
                                </DetailsBox>
                            </RecordsBox>
                        )
                    })}
                </>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const Title = styled.h2`
    padding: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const RecordsBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
    padding: 10px;
`;

const RecordTitle = styled.span`
    font-style: italic;
`

const ImageLink = styled(Link)`
    width: 50px;
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

const FondsLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

const RepoLink = styled(Link)`
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

export default RelatedRecords;