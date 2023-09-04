import CalendarComp from "@/components/Calendar";

const page = async () => {
    
  return (
    <div className="w-[98%] max-w-6xl mx-auto">
      <h1 className="text-center w-full text-slate-300 my-4 text-[25px] md:text-[35px] lg:text-[40px] ">
        Book Appointment
      </h1>

      <div>
        <CalendarComp />
      </div>
    </div>
  );
};

export default page;
