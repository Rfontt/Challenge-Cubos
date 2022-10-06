import { TypeEnum } from '../../enums/card.enum';
import { MessagePattern, ObjectResponse } from '../general/message-pattern.interface'
 
type CardType = {
    id?: number;
    type_id: TypeEnum;
    number: string;
    cvv: number;
}

interface CardsI {
    create(card: CardType, account_id: number): Promise<MessagePattern>;
    getAllCardsByAccountID(account_id: number): Promise<ObjectResponse>;
}

export { CardType, CardsI };