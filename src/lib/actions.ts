"use server"

export const getAllAppointments = async () => {
    const res = await fetch(process.env.URL + "/api/appointment/");
    const { appointments } = await res.json();
    return appointments;
};
export const getUserAppointments = async (id: string) => {
    const res = await fetch(process.env.URL + "/api/appointment/" + `${id}`);
    const { userAppointments } = await res.json();
    return userAppointments;
};

