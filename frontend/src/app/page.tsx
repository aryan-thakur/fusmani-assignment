"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Highlight,
  Text,
  Stack,
  Badge,
  Flex,
  Button,
  HStack,
  Card,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  VStack,
} from "@chakra-ui/react";
import { CreateIssueModal } from "@/components/CreateIssueModal";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { base } from "framer-motion/client";

/* Contract between the backend and frontend */
interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  createdDate: Date;
  updatedDate: Date;
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  /* Function to fetch the current issue list */
  const fetchIssues = async () => {
    try {
      const response = await fetch(baseUrl + "/getAll");
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  };

  /* Function to delete a single issue by id */
  const deleteIssue = async (id: string) => {
    try {
      const response = await fetch(baseUrl + "", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchIssues();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  /* Function to update issue by id */
  const updateIssue = async (id: string) => {
    const issueData = { id, title, description, priority, status };
    try {
      const response = await fetch(baseUrl + "", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });
      const data = await response.json();
      console.log("Issue updated:", data);
      fetchIssues();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  /* On mount*/
  useEffect(() => {
    fetchIssues();
  }, []); // Empty dependency array means this only runs once on component mount

  return (
    <Box>
      <Flex alignItems="center" justifyContent="center">
        <Box>
          <Heading size="5xl" color="#64748B">
            <Highlight query="List" styles={{ color: "teal.600" }}>
              IssueList
            </Highlight>
          </Heading>
        </Box>
      </Flex>
      <Box p={6} margin="20px" border="4px solid #64748B" borderRadius="10px">
        <Stack gap={6} p={6}>
          {issues.map((issue) => (
            <DialogRoot
              key={issue.id}
              size="cover"
              role="alertdialog"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <Card.Root
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                p={4}
                m={2}
                bg={issue.status === "Resolved" ? "gray.700" : "black"} // Conditional background color
              >
                <Card.Header p={2}>
                  <Heading as="h2" size="md" mb={2} color="white">
                    {issue.title}
                  </Heading>
                </Card.Header>

                <Card.Body p={2}>
                  <Text mb={4} color="gray">
                    {issue.description}
                  </Text>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="left"
                    mb={4}
                  >
                    <Badge colorPalette="green" px={2} py={1} mr={4}>
                      {issue.priority}
                    </Badge>
                    <Badge colorPalette="blue" px={2} py={1} ml={2}>
                      {issue.status}
                    </Badge>
                  </Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Created: {new Date(issue.createdDate).toLocaleDateString()}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Last Updated:{" "}
                    {new Date(issue.updatedDate).toLocaleDateString()}
                  </Text>
                </Card.Body>

                <Card.Footer p={2} mt={4}>
                  {" "}
                  {/* Padding and margin top for spacing */}
                  <HStack gap={4}>
                    <Button
                      width={100}
                      colorPalette="red"
                      variant="outline"
                      onClick={() => deleteIssue(issue.id)}
                    >
                      Delete
                    </Button>
                    <DialogTrigger asChild>
                      <Button width={100} colorPalette="blue" variant="solid">
                        Update
                      </Button>
                    </DialogTrigger>
                  </HStack>
                </Card.Footer>
              </Card.Root>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle px="15px" py="15px">
                    Update issue
                  </DialogTitle>
                </DialogHeader>
                <DialogBody padding="25px">
                  <VStack align="start">
                    <p>Title</p>
                    <Input
                      placeholder={issue.title}
                      padding="5px"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                    <p>Description</p>
                    <Input
                      padding="5px"
                      placeholder={issue.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Input>
                    <p>Priority</p>
                    <SegmentedControl
                      value={priority}
                      onValueChange={(e) => setPriority(e.value)}
                      size="lg"
                      defaultValue={issue.priority}
                      items={["High", "Medium", "Low"]}
                      justifyContent="space-around"
                      width="40%"
                    ></SegmentedControl>
                    <p>Status</p>
                    <SegmentedControl
                      value={status}
                      onValueChange={(e) => setStatus(e.value)}
                      size="lg"
                      defaultValue={issue.status}
                      items={["Open", "In Progress", "Resolved"]}
                      justifyContent="space-around"
                      width="40%"
                    ></SegmentedControl>
                  </VStack>
                </DialogBody>
                <DialogFooter px="15px" py="15px">
                  <DialogActionTrigger asChild>
                    <Button variant="outline" padding="10px">
                      Cancel
                    </Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button
                      onClick={() => {
                        updateIssue(issue.id);
                      }}
                      padding="10px"
                      colorPalette="green"
                    >
                      Submit
                    </Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          ))}
        </Stack>
      </Box>
      <CreateIssueModal refreshFunction={fetchIssues}></CreateIssueModal>
    </Box>
  );
}
