import { Injectable, GoneException } from "@nestjs/common";
import { Connection } from 'typeorm';

@Injectable()
export class AppService {

    constructor(
        private connection: Connection
    ) { }

    ping(): string {
        return "pong"
    }

    async aliveness() {
        try {
            await this.connection.query('select now()');
        } catch (error) {
            throw new GoneException({ message: 'database is not in ready state', code:'100' });
        }
    }
}