// src/components/IssueModal.tsx
import { useState } from "react";
import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SegmentedControl } from "./ui/segmented-control";
interface CreateIssueModalProps {
  refreshFunction: () => void;
}
export function CreateIssueModal({ refreshFunction }: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low"); // Default priority
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  /* Function to create a new issue */
  const handleSubmit = async () => {
    const issueData = { title, description, priority };

    try {
      const response = await fetch(baseUrl + "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });
      const data = await response.json();
      console.log("Issue created:", data);
      refreshFunction();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <DialogRoot
      role="alertdialog"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Flex justifyContent="right" paddingRight="25px">
          <Button size="xl" px="20px" variant="solid" colorPalette="teal">
            Create
          </Button>
        </Flex>
      </DialogTrigger>
      <Flex justifyContent="center" margin="20px">
        <DialogContent>
          <DialogHeader>
            <DialogTitle px="15px" py="15px">
              Create a new issue
            </DialogTitle>
          </DialogHeader>
          <DialogBody padding="25px">
            <VStack align="start">
              <p>Title</p>
              <Input
                padding="5px"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>Description</p>
              <Input
                padding="5px"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p>Priority</p>
              <SegmentedControl
                value={priority}
                onValueChange={(e) => setPriority(e.value)}
                size="lg"
                defaultValue="Low"
                items={["High", "Medium", "Low"]}
                justifyContent="space-around"
                width="70%"
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
                onClick={handleSubmit}
                padding="10px"
                colorPalette="green"
              >
                Submit
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </Flex>
    </DialogRoot>
  );
}
