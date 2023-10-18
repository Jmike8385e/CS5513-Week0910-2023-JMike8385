import React from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { kMaxLength } from "buffer";

// define the jsx component to show just one single to dooooo

const TodoItem = ({itemData}) => {
    // enforce user login
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    // if our code continues execution to here, a user is logged in
    // finally return the jsx command
    return (
        <Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                { itemData.title}
            </Heading>
            <Text>
                { itemData.description }
            </Text>
            <Text>
                { itemData.status }
            </Text>
            <Text>
                { itemData.createdAt }
            </Text>
        </Box>
    )
};

// define the required getServerSideProps() function that Next.js will call
// when it gets dynamically-routed URL; /todo/whatever <- here the id will = whatever

export async function getServerSideProps(context) {
    // our function will receive all it needs from Next.js in content variable
    // if we want to get the url parameter that next.js set for id because [id].js
    // content.params.id has it
    let itemData = null;
    // get a doc from firestore collection
    const docRef = doc( db, 'todo', context.params.id )
    const docSnap = await getDoc(docRef);
    if ( docSnap.exists() ) {
         itemData = docSnap.data();
    }

    return {
        props: {
             itemData
        }
    }
}

// export the component
export default TodoItem;