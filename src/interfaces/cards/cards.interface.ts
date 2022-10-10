import { CardTypeEnum } from '../../enums/card.enum';
import { MessagePattern, ObjectResponse } from '../general/message-pattern.interface'
 
type CardType = {
    id?: number;
    type_id: CardTypeEnum;
    number: string;
    cvv: number;
    created_at?: string;
    updated_at?: string;
}

interface CardsI {
    create(card: CardType, account_id: number): Promise<ObjectResponse>;
    getAllCardsByAccountID(account_id: number): Promise<ObjectResponse>;
}

export { CardType, CardsI };