// import what we need for home
import { Container, Box, Link, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from '../components/ContactList';
import AddTodo from "../components/AddTodo";
import AddEvent from "../components/AddEvent";
import AddContact from "../components/AddContact";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <Tabs>
        <TabList>
          <Tab>To Do List</Tab>
          <Tab>Events</Tab>
          <Tab>Contacts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TodoList />
                <Box>
                    <Link href="/add-todo">Add To Doooo</Link>
                </Box>
          </TabPanel>
          <TabPanel>
            <EventList />
                <Box>
                    <Link href="/add-event">Add Event</Link>
                </Box>
          </TabPanel>
          <TabPanel>
            <p>Contact list</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <TodoList />
      <AddTodo />
      <EventList />
      <ContactList />
    </Container>
  )
};
