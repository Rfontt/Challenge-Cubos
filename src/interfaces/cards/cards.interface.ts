import { TypeEnum } from '../../enums/card.enum';
import { MessagePattern } from '../general/message-pattern.interface'
 
type CardType = {
    type: TypeEnum;
    number: string;
    cvv: number;
}

interface CardsI {
    create(card: CardType, account_id: number): Promise<MessagePattern>;
}

export { CardType, CardsI };