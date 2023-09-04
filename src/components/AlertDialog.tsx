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

const AlertDialogComp = ({
  action,
  promptMessage,
  type,
}: {
  action: () => Promise<void>;
  promptMessage: string;
  type: "delete" | "edit";
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {type === "delete" && <Trash2Icon className="text-red-500" />}
        {type === "edit" && <Edit2 className="text-red-500" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{promptMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => action()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComp;