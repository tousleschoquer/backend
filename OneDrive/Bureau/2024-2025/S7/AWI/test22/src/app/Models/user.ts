interface TUser {
    id?: number | null;
    firstname: string;
    name: string;
    role: string;
    email: string | null;
    tel: string;
}

export class User implements TUser {
    public id: number | null;
    firstname: string;
    name: string;
    role: string;
    email: string | null;
    tel: string;

    constructor(
        name: string, 
        firstname: string, 
        role: string, 
        email: string | null, 
        tel: string = "000-000-0000", // Default value for tel
        id: number | null = null // Default value for id is null
    ) {
        this.firstname = firstname;
        this.name = name;
        this.role = role;
        this.tel = tel;
        this.id = id;

        // Validate email before assigning it
        if (email === null || this.validateEmail(email)) {
            this.email = email;
        } else {
            throw new Error("Invalid email format.");
        }
    }

    // Email validation method
    private validateEmail(email: string): boolean { 
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
}
