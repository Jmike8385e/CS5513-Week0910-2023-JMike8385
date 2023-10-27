// import what we need for home
import { Container, Box, Link, Tabs, TabList, TabIndicator, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
//import EventList from "../components/EventList";
//import ContactList from '../components/ContactList';
import AddTodo from "../components/AddTodo";
//import AddEvent from "../components/AddEvent";
//import AddContact from "../components/AddContact";

export default function Home() {
    return (
        <Container maxW="7xl">
            <Auth />
            <Tabs size='md' isFitted variant='enclosed'>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'red.600' }}>To Do List</Tab>
                    <Tab _selected={{ color: 'white', bg: 'green.400' }}>Events</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Contacts</Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="white"
                    borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                        <Box>
                            <AddTodo />
                            <TodoList />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <AddTodo />
                            <TodoList />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <AddTodo />
                            <TodoList />
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
};
