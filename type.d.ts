type Appointment = {
    createdAt: Date
    updatedAt: Date
    end: Date
    start: Date
    id: string
    userId: string
    title: string
    status: string
    date: string
};

declare module 'cronofy-elements';