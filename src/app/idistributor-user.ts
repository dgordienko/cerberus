export interface IDistributorUser {
    LoginName: string;
    LogoffTime: string;
    LogonTime: string;
    PasswordKey: string;
    PersonId: number;
    UserKey: string;
}

export class DistributorUser implements IDistributorUser {
    public LoginName: string;
    public LogoffTime: string;
    public LogonTime: string;
    public PasswordKey: string;
    public PersonId: number;
    public UserKey: string;
}
