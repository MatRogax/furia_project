import * as bcrypt from 'bcrypt';

export class Utils {
    
    static matchPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}