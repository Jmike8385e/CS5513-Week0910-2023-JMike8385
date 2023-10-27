import React, { useState } from 'react';
import {
  Heading,
  Flex,
  InputGroup,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";

// define the jsx component to show just one single to do in our ui
const contactItem = ({ itemData }) => {
  const [inputName, setInputName] = useState(itemData.name);
  const [inputPhone, setInputPhone] = useState(itemData.phone);
  const [inputEmail, setInputEmail] = useState(itemData.email);
  const [inputAddress, setInputAddress] = useState(itemData.address);
  const [inputCity, setInputCity] = useState(itemData.city);
  const [inputState, setInputState] = useState(itemData.state);
  const [inputZip, setInputZip] = useState(itemData.zip);
  // enforce user login
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }
  // handle update of firestore document
  const sendData = async () => {
    console.log("sending! ", itemData);
    const docRef = doc(db, 'contact', itemData.id);
    updateDoc(
      docRef, 
      {
        name: inputName,
        phone: inputPhone,
        email: inputEmail,
        address:  inputAddress,
        city: inputCity,
        state: inputState,
        zip: inputZip
      }
    ).then(
      docRef => {
        setStatusMsg("Updated!");
      }
    ).catch(
      error => {
        console.log(error);
        setStatusMsg("Error!");
      }
    );
  }
  // if our code continues execution to here, a user is logged in
  // finally return the jsx component
  return (
    <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
      <InputGroup>
        <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" />
        <Input type="text" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="Phone" />
        <Input type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" />
        <Input type="text" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} placeholder="Address" />
        <Input type="text" value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="City" />
        <Input type="text" value={inputState} onChange={(e) => setInputState(e.target.value)} placeholder="State" />
        <Input type="text" value={inputZip} onChange={(e) => setInputZip(e.target.value)} placeholder="Zip" />
        <Button
          ml={2}
          onClick={() => sendData()}
        >
          Update
        </Button>
      </InputGroup>
      <Text>
        {itemData.status}
      </Text>
      <Text>
        {new Date(itemData.createdAt).toLocaleDateString('en-US')}
      </Text>
      <Text>
        {statusMsg}
      </Text>
    </Flex>
  );
};

// define the REQUIRED getServerSideProps() function that Next.js will call
// when it gets a dynamically-routed URL: /contact/blah <- here the id will = blah
export async function getServerSideProps(context) {
  // our function will receive all it needs from Next.js in context variable
  // if we want to get the url parameter that next.js set for id 'cause [id].js
  // context.params.id has it!
  let itemData = null;
  // get a doc from firestore collection
  const docRef = doc(db, 'contact', context.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    itemData = {
      id: docSnap.id,
      ...docSnap.data()
    };
  }

  return {
    props: {
      itemData
    }
  };
}

// export the component
export default contactItem;
