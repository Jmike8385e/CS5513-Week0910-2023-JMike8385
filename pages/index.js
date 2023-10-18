// note from Ethan: import '@/' not working properly in replit workspaces

import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import BdayList from "../components/BdayList";

export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<TodoList />
<BdayList />
</Container>
);
}