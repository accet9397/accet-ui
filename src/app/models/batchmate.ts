/* Defines the batchmate entity */
export interface IBatchmate {
    id: string;
    firstName: string;
    lastName: string;
    dept: string;
    deptName: string;
    phone: string;
    email: string;
}

export enum Department {
    All = 0,
    Civil = 1,
    Mech = 2,
    EEE = 3,
    ECE = 4
}
