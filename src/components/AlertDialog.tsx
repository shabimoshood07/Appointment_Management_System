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
  // type,
  heading,
}: {
  action: () => Promise<void>;
  promptMessage?: string;
  // type: "delete" | "edit";
  heading?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {/* {type === "delete" && <Trash2Icon className="text-red-500" />} */}
        {/* {type === "edit" && <Edit2 className="text-red-500" />} */}
        <Trash2Icon className="text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-950">
            {heading}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-green-950">{promptMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green-950 text-slate-300 px-3 py-2 rounded-md hover:bg-green-800 duration-300 hover:text-slate-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500 text-slate-300"
            onClick={() => action()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComp;
