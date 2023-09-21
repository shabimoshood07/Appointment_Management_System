"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2Icon } from "lucide-react";
import EditForm from "./EditForm";

const AlertDialogComp = ({
  action,
  promptMessage,
  type,
  heading,
}: {
  action: () => Promise<void>;
  promptMessage?: string;
  type: "delete" | "edit";
  heading?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {type === "delete" && <Trash2Icon className="text-red-500" />}
        {type === "edit" && <Edit2 className="text-red-500" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-950">
            {heading}
          </AlertDialogTitle>
          <AlertDialogDescription>{promptMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => action()}>
            {type === "delete" ? "Continue" : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComp;
