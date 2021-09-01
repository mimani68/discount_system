import { EntityRepository, Repository } from "typeorm";
import { TokenEntity } from '../entities/token.entity';


@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {

    findByUserId(id: string): Promise<TokenEntity> {
        return this.findOne({ userId: id })
    }

    reject(id:string): Promise<any> {
        return this.delete({ userId: id });
    }
}