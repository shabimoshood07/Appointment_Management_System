"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const AppointmentHoverCard = ({
  appointmentId,
  userId,
}: {
  appointmentId: string;
  userId: string;
}) => {
  return (
    <HoverCard
      openDelay={0}
      defaultOpen={false}
      onOpenChange={() => userId === appointmentId}
    >
      <HoverCardTrigger
        className={`${userId !== appointmentId &&
          "cursor-default disabled:pointer-events-none"
          } ${userId === appointmentId ? "bg-green-300" : "bg-red-500"
          } w-full flex justify-center text-[12px] text-green-950 rounded-sm h-full items-center`}
      >
        <i>Booked!</i>
      </HoverCardTrigger>
      {userId === appointmentId ? (
        <HoverCardContent className="!w-fit">
          Icons
        </HoverCardContent>
      ) : (
        <></>
      )}
    </HoverCard>
  );
};

export default AppointmentHoverCard;
