import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const SavedItems = () => {
    const [items, setItems] = useState([]);
    const [noItems, setNoItems] = useState("You have no items bookmarked.");

    useEffect(() => {
        fetchSavedItems();
        window.addEventListener('beforeunload', clearSavedItemsOnUnload);
        return () => {
            window.removeEventListener('beforeunload', clearSavedItemsOnUnload);
        };
    }, []);

    const fetchSavedItems = () => {
        fetch("http://localhost:3000/saved-items", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setItems(data.data);
        setNoItems(data.data.length === 0 ? "You have no items bookmarked." : "")
      })
      .catch(error => console.error(error))
    };

    const removeFromSavedItems = (itemId) => {
        fetch('http://localhost:3000/saved-items', {
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: itemId })
        })
        .then(() => {
            setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        })
        .catch((error) => console.error(error));
    };

    const clearSavedItemsOnUnload = () => {
        fetch('http://localhost:3000/saved-items', {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clearAll: true}),
        })
        .then(() => {
            setItems([])
        })
        .catch((error) => console.error(error));
    };

    return (
        <>
        <SearchBar/>
        <Title>Bookmarked Items</Title>
        <Wrapper>
        {items.length === 0 && (
          <NoItems>{noItems}</NoItems>
        )}
        {items.map((item) => (
          <ItemBox key={item._id}>
            {item.type === "record" && (
              <>
                <RecordBox>
                  <ImageLink to={`/records/${item._id}`}>
                    <Image src={item.imageURL} alt="Record Image" />
                  </ImageLink>
                  <DetailsContainer>
                    <p>File [{item._id}]<RecordTitle> {item.title}</RecordTitle></p>
                    <RemoveButton onClick={() => removeFromSavedItems(item._id)}>Remove</RemoveButton>
                  </DetailsContainer>
                </RecordBox>
              </>
            )}
            {item.type === "fonds" && (
                <>
                <FondsLink to={`/fonds/${item.name}`}>Fonds {item._id} - {item.name}</FondsLink>
                <RemoveButton onClick={() => removeFromSavedItems(item._id)}>Remove</RemoveButton>
                </>
            )}
          </ItemBox>
        ))}
          <ContinueBrowsing to="/">Continue browsing</ContinueBrowsing>
      </Wrapper>
      </>
      );
}

const NoItems = styled.div`
  padding-bottom: 20px;
`

const FondsLink = styled(Link)`
  color:slategray;
  text-decoration: none;
      &:hover {
        color: darkslategrey
      }
`;

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const Title = styled.h2`
  margin: 20px;
  padding: 10px;
`;

const ItemBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid grey;
    padding: 10px;
`;

const RecordBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecordTitle = styled.span`
  font-style: italic;
`

const ImageLink = styled(Link)`
  width: 100px;
`;

const Image = styled.img`
    max-height: 200px;
    max-width: 150px;
    border: 1px solid grey;
    padding: 3px;
`;

const DetailsContainer = styled.div`
    flex-grow: 1;
    margin-left: 100px;
`;

const RemoveButton = styled.button`
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: left;
    color:slategray;
      &:hover {
        color: darkslategrey
      }
`;

const ContinueBrowsing = styled(Link)`
    text-decoration: none;
    text-align: left;
    color:slategray;
      &:hover {
        color: darkslategrey
      }
`
export default SavedItems;