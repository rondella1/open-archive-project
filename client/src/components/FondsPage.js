import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ToastContainer, toast } from "react-toastify";

const FondsPage = () => {
    const { fondsName } = useParams();
    const [fonds, setFonds] = useState(null);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/fonds/${fondsName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error ("Fonds not found");
            }
            return response.json();
        })
        .then ((fondsData) => {
            setFonds(fondsData.data);
        })
        .catch((error) => {
            console.error("There was an error retrieving this fonds", error);
            return("Fonds not found")
            
        })
    }, [fondsName])

    const addToSavedItems = async () => {
        setSaved([...saved, fonds]);
    
        let itemData = {_id: fonds._id, name: fonds.name, type: "fonds"};
    
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
        <Wrapper>
            {fonds ? (
                <FondsDetails>
                <FondsTitle>Fonds {fonds._id} - {fonds.name}</FondsTitle>
                <h3>Fonds ID:</h3>
                <ID>{fonds._id}</ID>
                <h3>Repository:</h3>
                <RepoLink to={`/institutions/${fonds.repository}`}>{fonds.repository}</RepoLink>
                <Des>Description:</Des>
                <Description>{fonds.description}</Description>
                <h3>Biographical Sketch:</h3>
                <BioSketch>{fonds.biosketch}</BioSketch>
                <h3>Contents:</h3>
                <Contents>{fonds.contents}</Contents>
                <h3>Languages:</h3>
                <Lang>{fonds.language.join(", ")}</Lang>
                <h3>Access Points:</h3>
                <Access>{fonds.tags.join(", ")}</Access>
                <RelatedAndSaveBox>
                    <RelatedLink to={`/related-records/${fonds._id}`}>
                        <SeeRelatedRecords>Related records</SeeRelatedRecords>
                    </RelatedLink>
                    <SaveContainer onClick={addToSavedItems}>
                        <SaveButton>Bookmark</SaveButton>
                    </SaveContainer>
                </RelatedAndSaveBox>
                </FondsDetails>
            ) : (
                <p>Loading...</p>
            )}
        </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const FondsDetails = styled.div`
    margin-bottom: 20px;
`;

const FondsTitle = styled.h2`
    margin-bottom: 10px;
`

const ID = styled.p`
    margin-bottom: 10px;
`
const RepoLink = styled(Link)`
    color: slategray;
    text-decoration: none;
     &:hover{
        color:darkslategray;
     }
`;

const Des = styled.h3`
    margin-top: 10px;
`;

const Description = styled.p`
    margin-bottom: 10px;
`

const BioSketch = styled.p`
    margin-bottom: 10px;
`

const Contents = styled.p`
    margin-bottom: 10px;
`

const Lang = styled.p`
    margin-bottom: 10px;
`

const Access = styled.p`
    margin-bottom: 10px;
`

const RelatedAndSaveBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

const RelatedLink = styled(Link)`
    margin-right: 20px;
    color: slategray;
    text-decoration: none;
     &:hover{
        color:darkslategray;
     }
`;

const SeeRelatedRecords = styled.div`
`;

const SaveContainer = styled.div`
`;

const SaveButton = styled.button`
    color: slategray;
    text-decoration: none;
     &:hover{
        color:darkslategray;
     }
`;

export default FondsPage;