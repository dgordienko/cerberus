export interface IDistributorUser {
    LoginName: string;
    LogoffTime: any;
    LogonTime: any;
    PasswordKey: string;
    PersonId: number;
    UserKey: string;
}

export class DistributorUser implements IDistributorUser {
    public LoginName: string;
    public LogoffTime: any;
    public LogonTime: any;
    public PasswordKey: string;
    public PersonId: number;
    public UserKey: string;
}
