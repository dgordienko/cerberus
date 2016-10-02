export interface IDistributorUser {
    LoginName: string;
    LogoffTime: Date;
    LogonTime: Date;
    PasswordKey: string;
    PersonId: number;
    UserKey: string;
}

export class DistributorUser implements IDistributorUser {
    public LoginName: string;
    public LogoffTime: Date;
    public LogonTime: Date;
    public PasswordKey: string;
    public PersonId: number;
    public UserKey: string;
}
