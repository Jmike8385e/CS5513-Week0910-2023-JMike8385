// note from Ethan: import '@/' not working properly in replit workspaces

import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddContact from "../components/AddContact";

export default function AddContact() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddContact/>
        </Container>
    );
}