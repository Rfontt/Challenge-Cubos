import { TypeEnum } from '../../enums/card.enum';
import { MessagePattern } from '../general/message-pattern.interface'
 
type CardType = {
    id?: number;
    type_id: TypeEnum;
    number: string;
    cvv: number;
}

interface CardsI {
    create(card: CardType, account_id: number): Promise<MessagePattern>;
}

export { CardType, CardsI };